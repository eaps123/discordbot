const Discord = require("discord.js");
const config = require("./config.json");

const Client = new Discord.Client();

Client.on("ready", ()=>{
    console.log("Estou pronto para se usado");
});

Client.login(config.token);

const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'discord'
});
Client.on("message", (m) => {
    if(m.channel.type == "dm")return
    if (m.content && m.content[0] === config.prefix){
        const input = m.content.split(" ");
        const command = input[1];

        if (input[2].indexOf("@aluno.unisociesc.com.br")<0){
            m.channel.send("Seu e-mail não faz parte da instituição");
            return;
        }
        if (command == "chamada") {
            console.log("meu email", input[2]);

            const sql = `SELECT * FROM usuario WHERE email = ${connection.escape(input[2])}`;
            console.log("chegou aqui0", input[2], sql);   
            connection.query(
                sql,
                function(err, results, fields) {
                    console.log(results);
                    if( results.length === 0){
                        m.channel.send("Seu e-mail não está validado");
                    }
                    else{
                        m.channel.send("Seu e-mail está validado");
                    }  
                }                                            
            )
        }
        else if (command == "registro"){
            const sql = `SELECT * FROM usuario WHERE email = ${connection.escape(input[2])}`;
            console.log("chegou aqui0", input[2], sql);   
            connection.query(
                sql,
                function(err, results, fields) {
                    console.log(results);
                    if( results.length === 0){
                        const insertSql = `INSERT INTO usuario (email) VALUES (${connection.escape(input[2])})`;                       
                        connection.query(
                            insertSql,
                            function(err, results, fields) {
                                console.log(results);
                                if (err == null){
                                    m.channel.send("O e-mail foi cadastrado");
                                }
                                else{
                                    m.channel.send("Não foi registrado");
                                }
                            }
                        )
                    }
                    else{
                        m.channel.send("O e-mail já exite");
                    }  
                }                                            
            )            
        }
    }
});