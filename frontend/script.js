const socket = io();

const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("sendBtn");
const emergencyBtn = document.getElementById("emergencyBtn");
const safeBtn = document.getElementById("safeBtn");
const helpBtn = document.getElementById("helpBtn");
const locationBtn = document.getElementById("locationBtn");
const emptyState = document.getElementById("emptyState");

let currentUser = "";
let isRelay = false;

// 🔐 Deduplication store
const processedMessages = new Set();

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Enable buttons
usernameInput.addEventListener("input", (e) => {
  currentUser = e.target.value.trim();
  const isValid = currentUser.length > 0;

  messageInput.disabled = !isValid;
  sendBtn.disabled = !isValid;
  emergencyBtn.disabled = !isValid;
  safeBtn.disabled = !isValid;
  helpBtn.disabled = !isValid;
  locationBtn.disabled = !isValid;

  messageInput.placeholder = isValid ? "Type a message..." : "Enter your name first...";
});

// 🔁 Relay function (SAFE)
function relayForward(event, data) {
  if (isRelay && !data.relayed) {
    socket.emit(event, {
      ...data,
      relayed: true
    });
  }
}

// 🧠 Universal receive handler (prevents duplicates)
function handleIncoming(event, data, renderFn) {
  if (processedMessages.has(data.id)) return;

  processedMessages.add(data.id);

  if (processedMessages.size > 2000) {
    processedMessages.clear();
  }

  relayForward(event, data);

  renderFn(data);
}

// ---------------- SEND ----------------

function sendMessage() {
  const message = messageInput.value.trim();
  if (!currentUser || !message) return;

  socket.emit("chat message", {
    id: crypto.randomUUID(),
    name: currentUser,
    message,
    timestamp: new Date().toISOString()
  });

  messageInput.value = "";
}

function sendEmergency() {
  if (!currentUser) return;

  socket.emit("emergency alert", {
    id: crypto.randomUUID(),
    name: currentUser,
    timestamp: new Date().toISOString()
  });
}

function setSafe() {
  socket.emit("status update", {
    id: crypto.randomUUID(),
    name: currentUser,
    status: "SAFE",
    timestamp: new Date().toISOString()
  });
}

function needHelp() {
  socket.emit("status update", {
    id: crypto.randomUUID(),
    name: currentUser,
    status: "HELP",
    timestamp: new Date().toISOString()
  });
}

// 📍 LOCATION (fixed)
function shareLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      socket.emit("location update", {
        id: crypto.randomUUID(),
        name: currentUser,
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        timestamp: new Date().toISOString()
      });
    },
    (error) => {
      alert("Location error: " + error.message);
    }
  );
}

// 🔁 Toggle relay
function toggleRelay() {
  isRelay = !isRelay;
  const btn = document.getElementById("relayBtn");

  if (isRelay) {
    btn.textContent = "🔁 Relay Mode ON";
    btn.style.background = "green";
  } else {
    btn.textContent = "🔁 Relay Mode OFF";
    btn.style.background = "";
  }
}

// ---------------- RECEIVE ----------------

// CHAT
socket.on("chat message", (data) => {
  handleIncoming("chat message", data, (data) => {
    emptyState.style.display = "none";

    const li = document.createElement("li");
    li.className = "message";

    if (data.name === currentUser) li.classList.add("mine");

    li.innerHTML = `
      <div class="message-meta">
        <span>${data.name}</span>
        <span>${formatTime(new Date(data.timestamp))}</span>
      </div>
      <div class="message-bubble">${data.message}</div>
    `;

    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
  });
});

// EMERGENCY
socket.on("emergency alert", (data) => {
  handleIncoming("emergency alert", data, (data) => {
    const li = document.createElement("li");
    li.className = "message emergency";

    li.innerHTML = `
      <div class="message-bubble">
        🚨 EMERGENCY ALERT from ${data.name}
      </div>
    `;

    messagesList.appendChild(li);
  });
});

// STATUS
socket.on("status update", (data) => {
  handleIncoming("status update", data, (data) => {
    const li = document.createElement("li");
    li.className = "message";

    li.innerHTML = `
      <div class="message-bubble" style="background:${data.status==="SAFE"?"green":"red"};color:white;">
        ${data.status==="SAFE"?"🟢":"🆘"} ${data.name} ${data.status}
      </div>
    `;

    messagesList.appendChild(li);
  });
});

// LOCATION
socket.on("location update", (data) => {
  handleIncoming("location update", data, (data) => {
    const li = document.createElement("li");

    const link = `https://www.google.com/maps?q=${data.lat},${data.lon}`;

    li.innerHTML = `
      📍 ${data.name} shared location  
      <br>
      <a href="${link}" target="_blank">View Map</a>
    `;

    messagesList.appendChild(li);
  });
});