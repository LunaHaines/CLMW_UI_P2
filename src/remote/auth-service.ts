import { Credentials } from "../dtos/credentials"
import { teamManagerClient } from "./team-manager-client"

export const coachLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/coach', user);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));
    teamManagerClient.defaults.headers.common['Authorization'] = resp.headers['authorization'];

    return resp.data
}

export const recruiterLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/recruiter', user);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));
    teamManagerClient.defaults.headers.common['Authorization'] = resp.headers['authorization'];

    return resp.data
} 

export const playerLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/player', user);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));
    teamManagerClient.defaults.headers.common['Authorization'] = resp.headers['authorization'];

    return resp.data;
} 