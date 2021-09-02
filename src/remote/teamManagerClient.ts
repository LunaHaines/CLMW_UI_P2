import axios from 'axios';

export const teamManagerClient = axios.create({
    // replace this with the deployed URL as needed
    baseURL: 'http://localhost:8080/TeamManager',
    headers: {
        'Content-Type': 'application/json',
        // store the api-token in local storage, so that it's accessible here
        'Authorization': localStorage.getItem('api-token')
    }
});