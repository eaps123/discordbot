const Discord = require("discord.js");
const Client = new Discord.Client();
const config = require("./config.json");

const mysql = require("mysql2/promise");

function connect(){
    const connection = mysql.createConnection("mysql://root@localhost:3306/discord").then(console.log("Logando bot"));
    return connection;
};

Client.on("ready", () => {
    const conn = connect();
    const sql = "SELECT email FROM 'emails' where email like (%variavel%)";

    const sql = "INSERT INTO 'emails' (email) values (Variavel)"
    const [i] = conn.query(sql);
    console.log(i);

    console.log("The bot is online");
});

//Client.on("menssage", (menssage)=>{
// Fetch a channel by its id
//client.channels.fetch('855586572866027551')
//.then(channel => console.log(channel.name))
//.catch(console.error);

//novo  Discord . Mensagem (cliente, dados, canal);
//return Mensagem (dados);

//});



Client.login(config.token).then("The bot is logged");