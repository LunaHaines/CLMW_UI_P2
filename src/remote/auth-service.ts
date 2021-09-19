import { Credentials } from "../dtos/credentials"
import { teamManagerClient } from "./team-manager-client"

export const coachLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/coach', user);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));

    return resp.data
}

export const recruiterLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/recruiter', user);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    localStorage.setItem('user', JSON.stringify(resp.data));

    return resp.data
} 

export const playerLogin = async (user: Credentials) => {
    let resp = await teamManagerClient.post('/auth/player', user);
    console.log("1");

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }

    localStorage.setItem('api-token', resp.headers['authorization']);
    console.log("2");
    localStorage.setItem('user', JSON.stringify(resp.data));
    console.log("3");

    return resp.data;
} 