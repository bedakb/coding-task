import axios from 'axios'

const API_URL = 'http://localhost:8081/'

export default {

    get() {
        return axios.get(`${API_URL}customers`)
    },

    create(data) {
        return axios.post(`${API_URL}customers`, data)
    },

    update(id, data) {
        return axios.post(`${API_URL}customer/${id}`, data)
    },

    remove(id) {
        return axios.delete(`${API_URL}customer/${id}`)
    },

    getSingle(id) {
        return axios.get(`${API_URL}customer/${id}`)
    }
    
}