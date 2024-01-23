const { Events } = require("discord.js")
const JobModel = require("../server/models/Jobs_model.js")
const schedule = require("../components/jobs/schedule.js")
const { SlashCommandBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,

    run: async (interaction) => {

        if (!interaction.isModalSubmit()) return

        if (interaction.customId === "Agenda") {
            try {

                await interaction.reply({content: "Fomulário enviado!", ephemeral: true})
                
                const data = {
                    guildId: interaction.guildId,
                    channelId: interaction.fields.getTextInputValue("iddocanal"),
                    scheduled: {
                        hours: interaction.fields.getTextInputValue("horadopost"),
                        minutes: interaction.fields.getTextInputValue("minutosdopost"),
                    }
                }

                const channelFound = await channel(interaction, data)
                
                if (channelFound) {

                    const jobFound = await JobModel.findOne({ guildId: data.guildId })

                    if (!jobFound) {
                        const jobCreate = await JobModel.create(data)
                        
                        const channelCreate = await channel(interaction, jobCreate)
                        const message = await schedule(jobCreate.scheduled.hours, jobCreate.scheduled.minutes, channelCreate)
                        
                        await interaction.editReply({content: message, ephemeral: true})
                    } else {
                        
                        const jobUpdated = await JobModel.findOne({ guildId: data.guildId })
                        const channelUpdated = await channel(interaction, jobUpdated)
                        const message = await schedule(jobUpdated.scheduled.hours, jobUpdated.scheduled.minutes, channelUpdated)
                        
                        await interaction.editReply({content: message, ephemeral: true})
                    }

                } else {

                    await interaction.editReply({ content: "🚨 - Erro: Canal não encontrado. Por esse motivo, não foi possível agendar a postagem.", ephemeral: true })
                }

            } catch (error) {
                console.error(error)

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
                } else {
                    await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
                }
            }
        }
    }
}

const channel = async (interaction, {channelId})=> await interaction.client.channels.cache.get(channelId)
