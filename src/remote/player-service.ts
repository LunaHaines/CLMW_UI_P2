import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { Principal } from "../dtos/principal";
import { teamManagerClient } from "./team-manager-client";
import { AddToProfile } from "../dtos/addToProfile";

    export const RegisterNewPlayer = async (newPlayer: RegisterPlayerComponent) => {

        let resp = await teamManagerClient.post('/players', newPlayer);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
    }

    export const AddSkill = async (addToProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/skill', addToProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

        let skillArr = resp.data.skills[resp.data.skills.length - 1];

        return skillArr.skill;
    }

    export const AddSport = async (addToProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/sport', addToProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

        return resp.data.sports[resp.data.sports.length - 1];
    }