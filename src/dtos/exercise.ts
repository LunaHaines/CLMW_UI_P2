export class Exercise {

    bodyPart: string;
    equipment: string;
    gifUrl: string;
    id: string;
    name: string;
    target: string;

    constructor(bodyPart: string, equipment: string, gifUrl: string, id: string, name: string, target: string) {
        this.bodyPart = bodyPart;
        this.equipment = equipment;
        this.gifUrl = gifUrl;
        this.id = id;
        this.name = name;
        this.target = target;
    }
}