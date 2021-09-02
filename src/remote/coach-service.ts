import { RegisterCoachRequest } from "../dtos/register-coach-request";
import { teamManagerClient } from "./team-manager-client"

export const registerNewCoach = async (newCoach: RegisterCoachRequest) => {

    let resp = await teamManagerClient.post('/coach', newCoach);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

}