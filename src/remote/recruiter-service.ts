import RegisterRecruiterRequest from "../dtos/register-recruiter-request";
import { teamManagerClient } from "./team-manager-client";

export const registerNewRecruiter = async (newRecruiter: RegisterRecruiterRequest) => {

    let resp = await teamManagerClient.post('/recruiter', newRecruiter);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }
}