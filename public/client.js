// const user = require("./model/user")
// const app = require("express")();
const socket = io("http://localhost:5000")



const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector(".container")

form.addEventListener("submit", e =>{
    e.preventDefault()
    const message = messageInput.value;
    console.log(message);
    append(`you: ${message}`, "right")
    socket.emit("send", message);
    messageInput.value = "";
});
do{
 user = prompt("enter your name to join:")
}while(user == null)
const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}
socket.emit('new_user_joined', user);

socket.on("user_joined", name => {
    append(`${name} joined the chat`, "right")
})


socket.on("recieve", data => {
    append(`${data.name} : ${data.message}`, "left")
})

socket.on("left", data =>{
    console.log("left");
    append(`${data} : left the chat`, "left")
})