import axios from 'axios'

const API_URL = 'http://localhost:8081/'

export default {

    get() {
        return axios.get(`${API_URL}customers`)
    },

    create(data) {
        return axios.post(`${API_URL}customers`, data)
    }
    
}