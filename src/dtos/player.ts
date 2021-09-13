export class Player {
    
    name: string;
    username: string;
    offers: string[];
    exercises: string[];
    skills: string[][];

    constructor(name: string, username: string, offers: string[], exercises: string[], skills: string[][]) {
        this.name = name;
        this.username = username;
        this.offers = offers;
        this.exercises = exercises;
        this.skills = skills;
    }
}