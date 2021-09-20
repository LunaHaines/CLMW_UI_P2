import RegisterRecruiterRequest from "../dtos/register-recruiter-request";
import { teamManagerClient } from "./team-manager-client";

export const RegisterNewRecruiter = async (newRecruiter: RegisterRecruiterRequest) => {

    let resp = await teamManagerClient.post(`/recruiter/${newRecruiter.pin}`, newRecruiter);

    if (resp.status >= 400 && resp.status <= 599){
        throw resp.data;
    }
}