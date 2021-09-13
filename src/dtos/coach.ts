export class Coach {

    coachName: string;
    username: string;
    teamName: string;
    sport: string;
    players: string[][];

    constructor(coachName: string, username: string, teamName: string, sport: string, players: string[][]) {
        this.coachName = coachName;
        this.username = username;
        this.teamName = teamName;
        this.sport = sport;
        this.players = players;
    }
    
}