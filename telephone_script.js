require("dotenv").config();
const io = require("socket.io-client");
const fs = require("fs");
const path = require("path");
const socket = io("https://clownfish-app-4s7tm.ondigitalocean.app");

authFile = fs.readFileSync(path.join(__dirname, "../auth.json"));
const authJson = JSON.parse(authFile);
let email = authJson.email;
let pass = authJson.password;

socket.emit("connection", email);

socket.on("joined", () => {
  console.log("hurray!!");
  const data = fs.readFileSync(path.join(__dirname, '../config.json'));
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  socket.emit("current config", jsonData, email);
});

socket.on("updated config", (json) => {
	console.log("updated!");
	let updatedConfigData = JSON.stringify(json);
	fs.writeFileSync(path.join(__dirname, '../config.json'), updatedConfigData);
});

socket.emit("successful update", email)
