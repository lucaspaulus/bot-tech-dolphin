const mongoose = require("mongoose")

const db_user = process.env.MONGODB_USER
const db_password = process.env.MONGODB_PASSWORD

const connect = () => {
    mongoose.connect(`mongodb+srv://${db_user}:${db_password}@tech-dolphin-db.6nkfm6s.mongodb.net/tech-dolphin-db?retryWrites=true&w=majority`)

    const connection = mongoose.connection

    connection.on("error", () => console.error("Erro ao conectar com o mongodb"))

    connection.on("open", () => console.log("Conectado ao mongodb com sucesso!"))

}

connect()

module.exports = mongoose



