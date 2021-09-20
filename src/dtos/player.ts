export class Player {
    
    name: string;
    username: string;
    offers: string[];
    exercises: string[];
    completedExercises: string[];
    skills: {skill: string, rating: number}[];

    constructor(name: string, username: string, offers: string[], exercises: string[], completedExercises: string[], skills: {skill: string, rating: number}[]) {
        this.name = name;
        this.username = username;
        this.offers = offers;
        this.exercises = exercises;
        this.completedExercises = completedExercises;
        this.skills = skills;
    }
}