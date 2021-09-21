import { Offer } from "../dtos/offer";
import { PositionRequest } from "../dtos/position-request";
import { RegisterCoachRequest } from "../dtos/register-coach-request";
import { teamManagerClient } from "./team-manager-client"

//Creates a new coach that is able to log in
export const registerNewCoach = async (newCoach: RegisterCoachRequest) => {

    let resp = await teamManagerClient.post(`/coach/${newCoach.pin}`, newCoach);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

//Adds an exercise to the exercise array of a coach and all players on their team
export const assignExercise = async (exerciseName: string, coach: String | undefined) => {
    let resp = await teamManagerClient.patch(`/coach/assign/${coach}`, exerciseName);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}

//Remove a player from a coach's team
export const removePlayer = async (removeOffer: Offer) => {
    let resp = await teamManagerClient.patch(`/coach/team/remove`, removeOffer);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;

}

//Adds a player to a coach's team
export const acceptOffer = async (acceptedOffer: Offer) => {

    let resp = await teamManagerClient.put('/coach/team', acceptedOffer);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;

}

//Retrieve a coach object
export const getAuthorizedCoach = async (coachUsername: string) => {

    let resp = await teamManagerClient.get(`/coach/${coachUsername}`);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}

//Assign a player to a position on a coach's team
export const assignPlayerPosition = async (assignment: PositionRequest) => {

    let resp = await teamManagerClient.put('/coach/positions', assignment);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }
    
}

//Retrieve's a coach by using a team member's username
export const getPlayerTeam = async (playerUsername: string) => {

    let resp = await teamManagerClient.get(`/coach/player/${playerUsername}`);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
    
}