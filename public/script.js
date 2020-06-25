const socket = io("http://localhost:3000");

const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");

if (messageForm != null) {
  const name = prompt("Who are you?");
  appendMsg("You joined");
  socket.emit("new-user", roomName, name);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMsg(`You: ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}

socket.on("chat-message", (data) => {
  appendMsg(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendMsg(`${name} connected`);
});

socket.on("user-disconnected", (name) => {
  appendMsg(`${name} disconnected`);
});

socket.on("room-created", (room) => {
  const roomElement = document.createElement("div");
  roomElement.innerText = room;
  const roomLink = document.createElement("a");
  roomLink.href = `${room}`;
  roomLink.innerText = "Join";

  roomContainer.append(roomElement);
  roomContainer.append(roomLink);
});

function appendMsg(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
