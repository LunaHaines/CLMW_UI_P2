import { PlayerRequest } from "../dtos/player-request";
import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { teamManagerClient } from "./team-manager-client";
import { Offer } from "../dtos/offer"

export const RegisterNewPlayer = async (newPlayer: RegisterPlayerComponent) => {

    let resp = await teamManagerClient.post('/players', newPlayer);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }

}

export const getAllPlayers = async (sport: String) => {

    let resp = await teamManagerClient.get('/players/' + sport);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    
    return resp.data;
}

export const getAuthorizedPlayer = async (authUsername: string) => {
    let resp = await teamManagerClient.get(`/players/user/${authUsername}`);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }

    return resp.data;
}

export const modifyOffer = async (coachUsername: String, playerUsername: String, type: String) => {

    let resp = await teamManagerClient.put('/players/' + type, {coachUsername, playerUsername});

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
}