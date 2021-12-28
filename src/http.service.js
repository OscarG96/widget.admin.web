import axios from "axios"
const URL = 'http://localhost:3000'

export const createAgent = (user) => {
    axios.post(`${URL}/agent/create`, {
        ...user
    }).then(() => console.log('agent created'), (rejection) => console.warn(rejection))
    .catch(error => console.error(error))
}

