import axios from 'axios'
// import { HttpsProxyAgent } from 'https-proxy-agent'


const baseAxios = axios.create({
     baseURL: 'https://localhost:5001/api'
})

export default baseAxios