const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Ajuda sobre os comandos do bot"),

    run: async (interaction)=> {
        await interaction.reply("help")
    }
}