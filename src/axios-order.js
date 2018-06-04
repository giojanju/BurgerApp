import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-65b87.firebaseio.com/'
});

export default instance;