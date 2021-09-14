export class PlayerRequest {

    playerName: string;
    teamName: string;
    offers: string;

    constructor(playerName: string, teamName: string, offers: string) {
        this.playerName = playerName;
        this.teamName = teamName;
        this.offers = offers;
    }

}