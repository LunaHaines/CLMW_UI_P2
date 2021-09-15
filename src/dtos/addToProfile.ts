export class AddToProfile {
    username: string;
    addedValue: string;

    constructor(username: string, addedValue: string){
        this.username = username;
        this.addedValue = addedValue;
    }
}