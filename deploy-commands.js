const {REST, Routes} = require("discord.js")
require("dotenv").config()

const {APP_TOKEN, APP_ID} = process.env
const fs = require("node:fs")
const path = require("node:path")

const commandsDir = path.join(__dirname,"commands")
const commandsFolders = fs.readdirSync(commandsDir)

const commands = []

for(const folder of commandsFolders){
    const commandsPath = path.join(commandsDir,folder)
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

    for(const file of commandsFiles){
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)

        if("data" in command && "run" in command){
            commands.push(command.data.toJSON())
        }else{
            console.log(`[WARNING] O comando em ${filePath} esta faltando a propriedade data ou run.`)
        }
    }
}
console.log(commands)
const rest = new REST().setToken(APP_TOKEN);
 
(async ()=>{
    try {
        console.log(`A aplicação tem ${commands.length} comandos para registrar`)

        const data = await rest.put(
            Routes.applicationCommands(APP_ID),
            {body: commands},
        )

        console.log(`Aplicação registrou os seguintes comandos: ${data.length}`)
    } catch (error) {
        console.error(error)
    }
})()