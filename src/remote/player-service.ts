import { PlayerRequest } from "../dtos/player-request";
import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { teamManagerClient } from "./team-manager-client";

export const RegisterNewPlayer = async (newPlayer: RegisterPlayerComponent) => {

    let resp = await teamManagerClient.post('/players', newPlayer);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }

export const getAllPlayers = async () => {

    let resp = await teamManagerClient.get('/players');

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}