import axios from "axios";

export const exerciseDbClient = axios.create({
    baseURL: 'https://exercisedb.p.rapidapi.com',
    headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': '98de5439c4mshbd4f3b81c3fcc60p110a92jsn8110ef370d21'
    }
})