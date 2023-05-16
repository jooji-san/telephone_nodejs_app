require("dotenv").config();
const io = require("socket.io-client");
const fs = require("fs");
const socket = io("ws://127.0.0.1:5000");

const EMAIL = process.env.EMAIL;
console.log(EMAIL);

socket.emit("connection", EMAIL);
console.log("hello");

socket.on("joined", () => {
  console.log("hurray!!");
  const data = fs.readFileSync("config.json");
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  socket.emit("current config", jsonData, EMAIL);
});

socket.on("updated config", (json) => {
	console.log("updated!");
	let updatedConfigData = JSON.stringify(json);
	fs.writeFileSync('config.json', updatedConfigData);
});

socket.emit("successful update", EMAIL)
