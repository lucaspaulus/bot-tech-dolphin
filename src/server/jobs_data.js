
const cheerio = require("cheerio")
const dateFormated = require("../utils/dateFormated.js")
const keywords = ["Desenvolvedor front end", "ux ui design", "Desenvolvedor back end"]

const jobs_data = async (axios)=>{
    const date = dateFormated()

    const jobsList = {
        total: 0,
        jobs: [],
        createdAt: date
    }

    for(const keyword of keywords){
        const endpoint = `search?keywords=${keyword}&f_AL=true&location=Brazil&f_TPR=r86400&pageNum=0`
            
           try {
                const {data} = await axios.get(endpoint)

                const dataLoaded = cheerio.load(data)
                const list = dataLoaded("div .base-card__full-link")
                
                list.each((i, tag)=>{
                    if(i < 3){
                        const name = dataLoaded(tag).text().trim()
                        const link = dataLoaded(tag).attr("href")
                        jobsList.jobs.push({name, link})
                    }

                    if(i === 3){
                        return false
                    }
                })
           } catch (error) {
                console.log("Este erro será resolvido em breve...")
           }
     
        
    }

    jobsList.total = jobsList.jobs.length
    return jobsList
}

module.exports = jobs_data
