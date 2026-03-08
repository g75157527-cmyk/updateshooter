const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer, WebSocket } = require('ws');

const PORT = Number(process.env.PORT || 10000);
const USERS_FILE = path.join(__dirname, 'users.json');

const rooms = new Map();
const socketMeta = new WeakMap();
const socketAuth = new WeakMap();

function makeId() {
  return 'u_' + Math.random().toString(36).slice(2, 10);
}

function roomName(raw) {
  const name = String(raw || '').trim().toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  return name || null;
}

function normalizeUsername(raw) {
  return String(raw || '').trim().slice(0, 24);
}

function ensureUsersFile() {
  if (fs.existsSync(USERS_FILE)) return;
  fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2), 'utf8');
}

function readUsers() {
  ensureUsersFile();
  try {
    const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    if (!data || !Array.isArray(data.users)) return { users: [] };
    return data;
  } catch (_e) {
    return { users: [] };
  }
}

function writeUsers(data) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function findUser(usersData, username) {
  const key = String(username || '').toLowerCase();
  return usersData.users.find((u) => String(u.username || '').toLowerCase() === key) || null;
}

function authOf(ws) {
  return socketAuth.get(ws) || null;
}

function send(ws, payload) {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  ws.send(JSON.stringify(payload));
}

function getRoom(room) {
  let entry = rooms.get(room);
  if (!entry) {
    entry = {
      peers: new Map(),
      state: {
        hostId: null,
        botMode: 'without_bots',
        teams: new Map(),
        ready: new Map()
      }
    };
    rooms.set(room, entry);
  }
  return entry;
}

function roomPlayersPayload(entry) {
  const out = [];
  for (const [id, ws] of entry.peers.entries()) {
    const auth = authOf(ws);
    out.push({
      id,
      nick: auth ? auth.username : id,
      team: entry.state.teams.get(id) || null,
      ready: Boolean(entry.state.ready.get(id)),
      isHost: entry.state.hostId === id
    });
  }
  return out;
}

function sendRoomState(room) {
  const entry = rooms.get(room);
  if (!entry) return;
  const players = roomPlayersPayload(entry);
  const payload = {
    type: 'room_state',
    room,
    hostId: entry.state.hostId,
    botMode: entry.state.botMode,
    peerCount: entry.peers.size,
    players
  };
  for (const ws of entry.peers.values()) send(ws, payload);
}

function broadcastRoom(room, payload, exceptId = null) {
  const entry = rooms.get(room);
  if (!entry) return;
  for (const [id, peer] of entry.peers.entries()) {
    if (exceptId && id === exceptId) continue;
    send(peer, payload);
  }
}

function selectNextHost(entry) {
  for (const id of entry.peers.keys()) return id;
  return null;
}

function detachSocket(ws) {
  const meta = socketMeta.get(ws);
  if (!meta) return;
  socketMeta.delete(ws);

  const entry = rooms.get(meta.room);
  if (!entry) return;

  entry.peers.delete(meta.id);
  entry.state.teams.delete(meta.id);
  entry.state.ready.delete(meta.id);

  if (entry.state.hostId === meta.id) {
    entry.state.hostId = selectNextHost(entry);
  }

  if (entry.peers.size <= 0) {
    rooms.delete(meta.room);
    return;
  }

  broadcastRoom(meta.room, {
    type: 'peer_leave',
    id: meta.id,
    peerCount: entry.peers.size,
    hostId: entry.state.hostId
  }, meta.id);
  sendRoomState(meta.room);
}

function canStartMatch(entry) {
  if (!entry) return { ok: false, reason: 'no_room' };
  if (entry.peers.size !== 2) return { ok: false, reason: 'need_two_players' };

  const ids = Array.from(entry.peers.keys());
  const t1 = entry.state.teams.get(ids[0]);
  const t2 = entry.state.teams.get(ids[1]);
  if (!t1 || !t2) return { ok: false, reason: 'teams_required' };
  if (t1 === t2) return { ok: false, reason: 'teams_must_differ' };

  if (!entry.state.ready.get(ids[0]) || !entry.state.ready.get(ids[1])) {
    return { ok: false, reason: 'both_ready_required' };
  }

  return { ok: true };
}

function requireAuth(ws) {
  const auth = authOf(ws);
  if (auth) return auth;
  send(ws, { type: 'auth_error', message: 'auth_required' });
  return null;
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('ok');
    return;
  }

  res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
  res.end('Block Strike Render WebSocket relay is running');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', (raw) => {
    let msg;
    try {
      msg = JSON.parse(String(raw || '{}'));
    } catch (_e) {
      send(ws, { type: 'error', message: 'bad_json' });
      return;
    }

    if (!msg || typeof msg !== 'object') return;

    if (msg.type === 'auth' || msg.type === 'register' || msg.type === 'login') {
      const username = normalizeUsername(msg.username);
      if (username.length < 3) {
        send(ws, { type: 'auth_error', message: 'invalid_username' });
        return;
      }

      const usersData = readUsers();
      let user = findUser(usersData, username);
      if (!user) {
        user = { username, createdAt: Date.now() };
        usersData.users.push(user);
        writeUsers(usersData);
      }

      socketAuth.set(ws, { username: user.username });
      send(ws, { type: 'auth_ok', username: user.username });
      return;
    }

    if (!requireAuth(ws)) return;

    if (msg.type === 'join') {
      const room = roomName(msg.room);
      if (!room) {
        send(ws, { type: 'error', message: 'room_required' });
        return;
      }

      detachSocket(ws);
      const entry = getRoom(room);

      let id = String(msg.id || '').trim() || makeId();
      if (entry.peers.has(id) && entry.peers.get(id) !== ws) id = makeId();

      entry.peers.set(id, ws);
      socketMeta.set(ws, { room, id });

      if (!entry.state.hostId) entry.state.hostId = id;
      entry.state.ready.set(id, false);
      if (msg.team === 'ct' || msg.team === 't') entry.state.teams.set(id, msg.team);

      send(ws, {
        type: 'joined',
        room,
        id,
        peerCount: entry.peers.size,
        hostId: entry.state.hostId,
        botMode: entry.state.botMode
      });

      broadcastRoom(room, { type: 'peer_join', id, peerCount: entry.peers.size, hostId: entry.state.hostId }, id);
      sendRoomState(room);
      return;
    }

    const meta = socketMeta.get(ws);
    if (!meta) {
      send(ws, { type: 'error', message: 'join_first' });
      return;
    }

    const entry = rooms.get(meta.room);
    if (!entry) {
      send(ws, { type: 'error', message: 'room_not_found' });
      return;
    }

    if (msg.type === 'leave') {
      detachSocket(ws);
      return;
    }

    if (msg.type === 'team_select') {
      const team = msg.team === 'ct' ? 'ct' : msg.team === 't' ? 't' : null;
      if (!team) {
        send(ws, { type: 'error', message: 'bad_team' });
        return;
      }
      entry.state.teams.set(meta.id, team);
      entry.state.ready.set(meta.id, false);
      broadcastRoom(meta.room, { type: 'team_state', id: meta.id, team }, null);
      sendRoomState(meta.room);
      return;
    }

    if (msg.type === 'room_config') {
      if (entry.state.hostId !== meta.id) {
        send(ws, { type: 'error', message: 'host_only' });
        return;
      }
      const botMode = msg.botMode === 'with_bots' ? 'with_bots' : 'without_bots';
      entry.state.botMode = botMode;
      sendRoomState(meta.room);
      return;
    }

    if (msg.type === 'ready') {
      entry.state.ready.set(meta.id, Boolean(msg.ready));
      sendRoomState(meta.room);
      return;
    }

    if (msg.type === 'request_start') {
      entry.state.ready.set(meta.id, true);
      const verdict = canStartMatch(entry);
      if (!verdict.ok) {
        sendRoomState(meta.room);
        send(ws, { type: 'error', message: verdict.reason });
        return;
      }

      const teamsObject = Object.fromEntries(entry.state.teams.entries());
      const players = roomPlayersPayload(entry);
      for (const [id, peer] of entry.peers.entries()) {
        send(peer, {
          type: 'start_match',
          config: {
            mode: 'team',
            hostId: entry.state.hostId,
            botMode: entry.state.botMode,
            myTeam: entry.state.teams.get(id),
            teams: teamsObject,
            players
          }
        });
      }

      for (const id of entry.peers.keys()) {
        entry.state.ready.set(id, false);
      }
      sendRoomState(meta.room);
      return;
    }

    if (msg.type === 'bot_event') {
      const hostWs = entry.state.hostId ? entry.peers.get(entry.state.hostId) : null;
      if (!hostWs || hostWs === ws) return;
      send(hostWs, { type: 'relay', from: meta.id, payload: msg.payload || {} });
      return;
    }

    if (msg.type === 'bot_state') {
      if (entry.state.hostId !== meta.id) return;
      broadcastRoom(meta.room, { type: 'relay', from: meta.id, payload: msg.payload || {} }, meta.id);
      return;
    }

    if (msg.type === 'state' || msg.type === 'shoot' || msg.type === 'damage') {
      const payload = msg.payload || {};

      if (msg.type === 'damage') {
        const targetId = String(payload.targetId || '');
        if (!entry.peers.has(targetId)) return;
        const fromTeam = entry.state.teams.get(meta.id);
        const targetTeam = entry.state.teams.get(targetId);
        if (!fromTeam || !targetTeam || fromTeam === targetTeam) return;
      }

      broadcastRoom(meta.room, {
        type: 'relay',
        from: meta.id,
        payload
      }, meta.id);
      return;
    }
  });

  ws.on('close', () => {
    detachSocket(ws);
    socketAuth.delete(ws);
  });

  ws.on('error', () => {
    detachSocket(ws);
    socketAuth.delete(ws);
  });
});

const heartbeat = setInterval(() => {
  for (const ws of wss.clients) {
    if (ws.isAlive === false) {
      try {
        ws.terminate();
      } catch (_e) {}
      continue;
    }

    ws.isAlive = false;
    try {
      ws.ping();
    } catch (_e) {}
  }
}, 30000);

wss.on('close', () => {
  clearInterval(heartbeat);
});

server.listen(PORT, () => {
  console.log('[render-ws] listening on port', PORT);
});

