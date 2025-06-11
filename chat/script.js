let peer;
let conn;

function startPeer() {
  const customId = document.getElementById('custom-id').value.trim();
  if (!customId) {
    alert("Please enter a valid ID.");
    return;
  }

  peer = new Peer(customId);

  peer.on('open', (id) => {
    document.getElementById('peer-id').value = id;
    logMessage(`Your ID is: ${id}`);
  });

  peer.on('connection', (c) => {
    conn = c;
    logMessage(`Connected with ${conn.peer}`);
    setupConnectionHandlers();
  });

  peer.on('error', (err) => {
    alert("Peer error: " + err);
  });
}

function connect() {
  const targetId = document.getElementById('connect-to').value.trim();
  if (!targetId) {
    alert("Enter a valid peer ID to connect.");
    return;
  }

  conn = peer.connect(targetId);

  conn.on('open', () => {
    logMessage(`Connected to ${targetId}`);
    setupConnectionHandlers();
  });

  conn.on('error', (err) => {
    alert("Connection error: " + err);
  });
}

function send() {
  const msg = document.getElementById('message').value.trim();
  if (msg && conn && conn.open) {
    conn.send(msg);
    logMessage("You: " + msg);
    document.getElementById('message').value = "";
  }
}

function logMessage(msg) {
  const div = document.createElement('div');
  div.textContent = msg;
  document.getElementById('chat').appendChild(div);
  document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight;
}

document.getElementById('message').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    send();
  }
});

let pingInterval;
let pongTimeout;

function setupConnectionHandlers() {
  conn.on('data', (msg) => {
    if (msg === 'ping') {
      conn.send('pong');
      return;
    }
    if (msg === 'pong') {
      clearTimeout(pongTimeout);
      return;
    }

    logMessage(`${conn.peer}: ${msg}`);
  });

  conn.on('open', () => {
    startPing();
  });

  conn.on('close', () => {
    logMessage(`${conn.peer} has disconnected.`);
    stopPing();
  });
}

function startPing() {
  pingInterval = setInterval(() => {
    if (conn.open) {
      conn.send('ping');
      pongTimeout = setTimeout(() => {
        logMessage(`${conn.peer} seems disconnected.`);
        conn.close();
        stopPing();
      }, 3000);
    }
  }, 5000);
}

function stopPing() {
  clearInterval(pingInterval);
  clearTimeout(pongTimeout);
}
