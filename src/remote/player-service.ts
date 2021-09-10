import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { teamManagerClient } from "./team-manager-client";

export const RegisterNewPlayer = async (newPlayer: RegisterPlayerComponent) => {

    let resp = await teamManagerClient.post('/players', newPlayer);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }
}