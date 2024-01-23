const {EmbedBuilder} = require("discord.js")
const jobs_data = require("../../server/jobs_data.js")
const service = require("../../config/axios.js")

const post = async () => {

    const jobsData = await jobs_data(service)

    const embedPost = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(`Lista de vagas atualizadas em: ${jobsData.createdAt}`)
        .addFields({ name: "obs:", value: "Somente candidaturas simplificadas, que podem ser feitas diretamente pelo linkedin." })
        .addFields(
            jobsData.jobs.flatMap((items) => {
                const values = [{ name: items.name, value: `Para ver esta vaga: [CLIQUE AQUI 🚀](${items.link})` }, { name: '\u200B', value: ' ' }]
                return values
            }))

    return embedPost
}

module.exports = post