import { PlayerRequest } from "../dtos/player-request";
import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { Principal } from "../dtos/principal";
import { teamManagerClient } from "./team-manager-client";
import { AddToProfile } from "../dtos/addToProfile";
import { Offer } from "../dtos/offer";

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

    export const rateSkill = async (username: string, skill: string, rating: number) => {

        let resp = await teamManagerClient.put(`/players/skill/rate?username=${username}&skill=${skill}&rating=${rating}`);
        
        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

    }

    export const AddSport = async (addToProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/sport', addToProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

        return resp.data.sports[resp.data.sports.length - 1];
    }

    export const recruitAllPlayers = async () => {
        let resp = await teamManagerClient.get('/players');

        if (resp.status >= 400 && resp.status <= 599) {
            throw resp.data
        }

        return resp.data;
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
