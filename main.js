const { Client, Events, GatewayIntentBits, Collection } = require("discord.js")

require("dotenv").config()
const {APP_TOKEN} = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection()

const fs = require("node:fs")
const path = require("node:path")

const commandsDir = path.join(__dirname, "commands")
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
 
client.once(Events.ClientReady, c => { 
	console.log(`Server Bot: ${c.user.tag.split("#")[0]}, Status: STARTED`)
})

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)
    
    if(!command){
        return console.error(`nenhum comando com esse nome ${interaction.commandName}`)
    }

    try {
        await command.run(interaction)

    } catch (error) {
        console.error(error)

        if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
		}

    }
})

client.login(APP_TOKEN) 