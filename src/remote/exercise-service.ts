import { exerciseDbClient } from "./exercisedb-client";

export const getAllExercises = async () => {
    let resp = await exerciseDbClient.get('/exercises');

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}

export const getExerciseByTarget = async (target: string) => {
    let resp = await exerciseDbClient.get(`/exercises/target/${target}`);

    if (resp.status >= 400 && resp.status <= 599) {
        throw resp.data;
    }

    return resp.data;
}