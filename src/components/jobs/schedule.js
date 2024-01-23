const cron = require("node-cron")
const post = require("./post.js")

const schedule = async (hours, minutes, channel) => {
    cron.schedule(`0 ${minutes} ${hours} * * *`, async () => {
        const embedPost = await post()
        channel.send({ embeds: [embedPost] })

    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    })

/*     const schedules = []
    schedules.push(channel.guild.id)

    schedules.forEach((id) => {
        if (channel.guild.id === id) {
        }
    }); */

    return `Post agendado diariamente às ${hours} horas e ${minutes} minutos.`

}

module.exports = schedule