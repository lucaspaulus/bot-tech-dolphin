const {SlashCommandBuilder} = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("jobs")
    .setDescription("Lista vagas de empregos do linkedin"),

    run: async (interaction)=>{
        await interaction.reply("jobs")
    }
}