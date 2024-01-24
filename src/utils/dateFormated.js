module.exports = function(){
    const date = new Date()
 
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return date.toLocaleDateString("pt-BR", options)
}