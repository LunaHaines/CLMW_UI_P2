class Skill {
    skill: string;
    rating: number;

    constructor(skill: string, rating: number) {
        this.skill = skill;
        this.rating = rating;
    }
}

export class ExpPlayer {
    
    name: string;
    username: string;
    teamName: string;
    sports: string[];
    offers: string[];
    exercises: string[];
    skills: Skill[];

    constructor(name: string, username: string, teamName: string, sports: string[], offers: string[], exercises: string[], skills: Skill[]) {
        this.name = name;
        this.username = username;
        this.sports = sports;
        this.teamName = teamName;
        this.offers = offers;
        this.exercises = exercises;
        this.skills = skills;
    }
}