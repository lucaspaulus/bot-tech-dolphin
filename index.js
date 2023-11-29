const { Client, Events, GatewayIntentBits, Collection } = require("discord.js")

/* require("dotenv").config()
const {TOKEN} = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection() */

const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
console.log("command path:", commandsPath)
console.log("command files:", commandFiles)

/* client.once(Events.ClientReady, c => {
	console.log(`Omg!!! Esta funcionando!${c.user.tag}`)
})


client.login(TOKEN) */