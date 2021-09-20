export class PositionRequest {

    coachUsername: string;
    playerUsername: string;
    position: string;

    constructor(coachUsername: string, playerUsername: string, position: string) {
        this.coachUsername = coachUsername;
        this.playerUsername = playerUsername;
        this.position = position;
    }
    
}