const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("./config.json");

Client.on("ready", ()=>{
    console.log("Estou pronto para se usado");
});

Client.login(config.token);