import { PlayerRequest } from "../dtos/player-request";
import { RegisterPlayerComponent } from "../dtos/register-player-request";
import { Principal } from "../dtos/principal";
import { teamManagerClient } from "./team-manager-client";
import { AddToProfile } from "../dtos/addToProfile";
import { Offer } from "../dtos/offer";

    //Creates a new player that is able to log in
    export const registerNewPlayer = async (newPlayer: RegisterPlayerComponent) => {

        console.log(JSON.stringify(newPlayer));

        let resp = await teamManagerClient.post('/players', JSON.stringify(newPlayer));
        console.log(resp);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
    }

    //Adds a new skill to the player
    export const AddSkill = async (addToProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/skill', addToProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

        let skillArr = resp.data.skills[resp.data.skills.length - 1];

        return skillArr.skill;
    }

    //Adds a rating to a player's skill
    export const rateSkill = async (username: string, skill: string, rating: number) => {

        let resp = await teamManagerClient.put(`/players/skill/rate?username=${username}&skill=${skill}&rating=${rating}`);
        
        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

    }

    //Removes a skill from a player
    export const DeleteSkill = async (deleteFromProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/skill/manage', deleteFromProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
        console.log(resp);

        return resp;
    }

    //Removes a sport from a player
    export const DeleteSport = async (deleteFromProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/sport/manage', deleteFromProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }
        console.log(resp);

        return resp;
    }

    //Adds a sport to a player
    export const AddSport = async (addToProfile: AddToProfile) => {

        let resp = await teamManagerClient.put('/players/sport', addToProfile);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

        return resp.data.sports[resp.data.sports.length - 1];
    }

    //Retrieves all player objects
    export const recruitAllPlayers = async () => {
        let resp = await teamManagerClient.get('/players');

        if (resp.status >= 400 && resp.status <= 599) {
            throw resp.data
        }

        return resp.data;
    }

    //Retrieves all player objects that contain a specific sport
    export const getAllPlayers = async (sport: String) => {

        let resp = await teamManagerClient.get('/players/' + sport);

        if (resp.status >= 400 && resp.status <= 599) {
            throw resp.data;
        }
        
        return resp.data;
    }

    //Retrieves a player object by username
    export const getAuthorizedPlayer = async (authUsername: string) => {
        let resp = await teamManagerClient.get(`/players/user/${authUsername}`);

        if (resp.status >= 400 && resp.status <= 599){
            throw resp.data;
        }

        return resp.data;
    }

    //Either extends or removes an offer to a player from a coach based on type parameter
    export const modifyOffer = async (coachUsername: String, playerUsername: String, type: String) => {

        let resp = await teamManagerClient.put('/players/' + type, {coachUsername, playerUsername});

        if (resp.status >= 400 && resp.status <= 599) {
            throw resp.data;
        }
    }

    //Either completes or marks incomplete an exercise based on type parameter
    export const modifyExercise = async (playerUsername: String, exercise: String, type: String) => {

        let resp = await teamManagerClient.put('/players/exercise/' + type, {playerUsername, exercise});

        if (resp.status >= 400 && resp.status <= 599) {
            throw resp.data;
        }
    }