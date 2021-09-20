export class RegisterCoachRequest {

    coachName: string;
    username: string;
    password: string;
    sport: string;
    teamName: string;
    pin: string;

    constructor(coachName: string, username: string, password: string, sport: string, teamName: string, pin: string) {
        this.coachName = coachName;
        this.username = username;
        this.password = password;
        this.sport = sport;
        this.teamName = teamName;
        this.pin = pin;
    }
    
}