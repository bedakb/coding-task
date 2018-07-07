import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8081/api/' : '/api/'

export default {

    get() {
        return axios.get(`${API_URL}customers`)
    },

    create(data) {
        return axios.post(`${API_URL}customers`, data)
    },

    update(id, data) {
        return axios.put(`${API_URL}customer/${id}`, data)
    },

    remove(id) {
        return axios.delete(`${API_URL}customer/${id}`)
    },

    getSingle(id) {
        return axios.get(`${API_URL}customer/${id}`)
    }
    
}