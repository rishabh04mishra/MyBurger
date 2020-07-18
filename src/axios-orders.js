import axios from 'axios'

let instance = axios.create({
    baseURL: 'https://react-my-burger-4a80d.firebaseio.com/'
})

export default instance;