import axios from "axios"

const BASE_API_URL = 'http://localhost:3003'

axios.defaults.baseURL = BASE_API_URL

const axiosResponse = response => response.data

const requests = {
    // url will get appended to axios.defaults.baseURL
    get: url => axios.get(url).then(axiosResponse),
    post: (url, data) => axios.post(url, data).then(axiosResponse),
    patch: (url, data) => axios.patch(url, data).then(axiosResponse),
    delete: url => axios.delete(url).then(axiosResponse),
}

const ApiRecipes = {
    getAll: () => requests.get('/recipes'),
    saveOne: (data) => requests.post('/recipes', data),
    updateOne: (id, data) => requests.patch(`/recipes/${id}`, data),
    removeOne: id => requests.delete(`/recipes/${id}`),
}

const axiosAgent = {
    ApiRecipes
}

export default axiosAgent