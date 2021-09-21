import { exerciseDbClient } from "./exercisedb-client";

//Retrieve all exercises from external API
export const getAllExercises = async () => {
    let resp = await exerciseDbClient.get('/exercises');

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}

//Retrieve specific exercise from external API
export const getExerciseByTarget = async (target: string) => {
    let resp = await exerciseDbClient.get(`/exercises/target/${target}`);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}