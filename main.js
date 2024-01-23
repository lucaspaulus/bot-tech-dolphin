const { Client, Events, GatewayIntentBits, Collection } = require("discord.js")
 
require("dotenv").config()
const mongoose = require("./src/server/database/connection.js")
const fs = require("node:fs")
const path = require("node:path")
const axios = require("./src/config/axios.js")

const {APP_TOKEN} = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

const commandsDir = path.join(__dirname, "src/commands")
const commandsFolders= fs.readdirSync(commandsDir)

for(const folder of commandsFolders){
    const commandsPath = path.join(commandsDir, folder);
	const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

    for(const file of commandsFiles){
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)
        
        if("data" in command && "run" in command){
            client.commands.set(command.data.name, command)
        }else{
            console.log(`[WARNING] O comando em ${filePath} esta faltando a propriedade data ou run.`)
        }
    }
}
 
const eventsPath = path.join(__dirname, 'src/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args));
	} else {
		client.on(event.name, (...args) => event.run(...args));
	}
}

 
client.login(APP_TOKEN) 