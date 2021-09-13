import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { Principal } from "../dtos/principal";
import { teamManagerClient } from "./team-manager-client";

    export const RegisterNewPlayer = async (newPlayer: RegisterPlayerComponent) => {

        let resp = await teamManagerClient.post('/players', newPlayer);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
    }

    export const AddSkill = async (skill :string) => {

        let resp = await teamManagerClient.put('/player/skills', skill);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
    }

    export const AddSport = async (sport :string) => {

        let resp = await teamManagerClient.put('/player/sportss', sport);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
    }