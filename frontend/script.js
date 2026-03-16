const socket = io();

// UI Elements
const messagesList = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");
const sendBtn = document.getElementById("sendBtn");
const emergencyBtn = document.getElementById("emergencyBtn");
const emptyState = document.getElementById("emptyState");

let currentUser = "";

// Helper to format time
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Initial state updates
usernameInput.addEventListener("input", (e) => {
  currentUser = e.target.value.trim();
  const isValid = currentUser.length > 0;
  
  messageInput.disabled = !isValid;
  sendBtn.disabled = !isValid;
  emergencyBtn.disabled = !isValid;
  
  if (isValid) {
    messageInput.placeholder = "Type a message...";
  } else {
    messageInput.placeholder = "Enter your name first...";
  }
});

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function scrollToBottom() {
  messagesList.scrollTop = messagesList.scrollHeight;
}

function hideEmptyState() {
  if (emptyState && emptyState.style.display !== "none") {
    emptyState.style.display = "none";
  }
}

// Send Chat Message
function sendMessage() {
  const message = messageInput.value.trim();

  if (currentUser === "" || message === "") {
    return;
  }

  socket.emit("chat message", {
    name: currentUser,
    message: message,
    timestamp: new Date().toISOString()
  });

  messageInput.value = "";
  messageInput.focus();
}

// Send Emergency Alert
function sendEmergency() {
  if (currentUser === "") {
    alert("Please enter your name first before sending an alert.");
    return;
  }

  // Visual feedback on the button
  emergencyBtn.innerHTML = "Sending...";
  emergencyBtn.classList.add("sending");
  
  setTimeout(() => {
    socket.emit("emergency alert", {
      name: currentUser,
      timestamp: new Date().toISOString()
    });
    emergencyBtn.innerHTML = "🚨 Emergency Alert";
    emergencyBtn.classList.remove("sending");
  }, 400); // slight delay for user feedback
}

// Receive Chat Message
socket.on("chat message", function(data) {
  hideEmptyState();
  
  const li = document.createElement("li");
  li.className = "message";
  
  if (data.name === currentUser) {
    li.classList.add("mine");
  }

  const timeStr = data.timestamp ? formatTime(new Date(data.timestamp)) : formatTime(new Date());

  li.innerHTML = `
    <div class="message-meta">
      <span class="message-sender">${data.name}</span>
      <span class="message-time">${timeStr}</span>
    </div>
    <div class="message-bubble">${data.message}</div>
  `;

  messagesList.appendChild(li);
  scrollToBottom();
});

// Receive Emergency Alert
socket.on("emergency alert", function(data) {
  hideEmptyState();

  const li = document.createElement("li");
  li.className = "message emergency";

  const timeStr = data.timestamp ? formatTime(new Date(data.timestamp)) : formatTime(new Date());

  li.innerHTML = `
    <div class="message-bubble">
      <div class="emergency-icon">🚨</div>
      <div class="emergency-text">
        <strong>EMERGENCY ALERT</strong>
        <span>Triggered by ${data.name} at ${timeStr}</span>
      </div>
    </div>
  `;

  messagesList.appendChild(li);
  scrollToBottom();
});

// Focus name input on load
window.addEventListener('DOMContentLoaded', () => {
  usernameInput.focus();
  
  // Set initial disabled state
  messageInput.disabled = true;
  sendBtn.disabled = true;
  emergencyBtn.disabled = true;
});
