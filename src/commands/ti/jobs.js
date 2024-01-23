const { SlashCommandBuilder } = require("discord.js")

const modalCreate = require("../../components/jobs/modalCreate.js")
const schedule = require("../../components/jobs/schedule.js")
const post =  require("../../components/jobs/post.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("jobs")
        .setDescription("Lista vagas de empregos do linkedin")
        .addStringOption(option =>
            option
                .setName('agendar')
                .setDescription('Agenda um horário para postar a lista de jobs.')
                .setRequired(true)
                .addChoices(
                    { name: 'Sim', value: "Yes" },
                    { name: 'Não', value: "No" }
                )
        ),

    run: async (interaction) => {
        const agendar = await interaction.options.getString("agendar")
        console.log("agendar", agendar)

        if(agendar === "Yes"){
            await modalCreate(interaction)
            
        }else{
            await interaction.deferReply()
            const embedPost = await post()
            await interaction.followUp({ embeds: [embedPost] })
        }
    }
}
