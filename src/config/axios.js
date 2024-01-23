const axios = require("axios")

const service  = axios.create({
    baseURL: process.env.API_ENDPOINT,
    delayed: true
})

service.interceptors.request.use((config) => {
  if (config.delayed) {
    return new Promise(resolve => setTimeout(() => resolve(config), 600));
  }
  return config;
});

module.exports = service