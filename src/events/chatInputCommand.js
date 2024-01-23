const { Events } = require("discord.js")

module.exports = {
    name: Events.InteractionCreate,

    run: async (interaction) => {

        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
            return console.error(`nenhum comando com esse nome ${interaction.commandName}`)
        }

        try {
            await command.run(interaction)

        }catch (error) {
            console.error(error)

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Ocorreu um erro ao executar este comando!', ephemeral: true });
            }
        }
    }
}