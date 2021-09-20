export default class RegisterRecruiterRequest {

    name: string;
    username: string;
    password: string;
    pin: string;

    constructor(name: string, username: string, password: string, pin: string){
        this.name = name;
        this.username = username;
        this.password = password;
        this.pin = pin;
    }
}