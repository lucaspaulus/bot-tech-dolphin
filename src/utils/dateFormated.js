const date = new Date()
 
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
 
const dateFormated = date.toLocaleDateString("pt-BR", options)
const timeFormated = date.toLocaleTimeString("pt-BR")
const dateTimeFormated = dateFormated + " as " + timeFormated
module.exports = dateFormated