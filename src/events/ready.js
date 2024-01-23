const {Events} = require("discord.js")

module.exports = {
    name: Events.ClientReady,
    once: true,
    run: (client)=>{
        console.log(`Server Bot: ${client.user.tag.split("#")[0]}, Status: STARTED`)
    }
}