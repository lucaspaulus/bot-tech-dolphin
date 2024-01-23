const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema({
    guildId:{
        type: String,
        required: true
    },

    channelId:{
        type: String,
        required: true
    },

    scheduled: {
        hours: {
            type: String,
            required: true
        },

        minutes:{
            type: String,
            required: true
        }
    }

})


const JobModel = mongoose.model("Job", jobSchema)

module.exports = JobModel