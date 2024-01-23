const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js")

const modalCreate = async (interaction) => {
    const modal = new ModalBuilder()
        .setCustomId('Agenda')
        .setTitle('Agendar lista de jobs: ');

    const channelId = new TextInputBuilder()
        .setCustomId('iddocanal')
        .setLabel("Qual o id do canal que será postado a lista?")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(19);

    const hours = new TextInputBuilder()
        .setCustomId('horadopost')
        .setLabel("Informe a hora: ")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(2);

    const minutes = new TextInputBuilder()
        .setCustomId('minutosdopost')
        .setLabel("Informe os minutos")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(2);

    const firstActionRow = new ActionRowBuilder().addComponents(channelId)
    const secondActionRow = new ActionRowBuilder().addComponents(hours)
    const thirdActionRow = new ActionRowBuilder().addComponents(minutes)

    modal.addComponents(firstActionRow, secondActionRow, thirdActionRow)

    await interaction.showModal(modal)
}

module.exports = modalCreate