export class Save {
    identifiant: string;
    name: string;
    hability: number;
    currentHability: number;
    stamina: number;
    currentStamina: number;
    luck: number;
    currentLuck: number;
    gold: number;
    currentNode: number;
    path: number[];
    difficulty: string;
    currentNodeType: string;

    constructor(
        identifiant: string,
        name: string,
        hability: number,
        currentHability: number,
        stamina: number,
        currentStamina: number,
        luck: number,
        currentLuck: number,
        gold: number,
        currentNode: number,
        path: number[],
        difficulty: string,
        currentNodeType: string
    ) {
        this.identifiant = identifiant;
        this.name = name;
        this.hability = hability;
        this.currentHability = currentHability;
        this.stamina = stamina;
        this.currentStamina = currentStamina;
        this.luck = luck;
        this.currentLuck = currentLuck;
        this.gold = gold;
        this.currentNode = currentNode;
        this.path = path;
        this.difficulty = difficulty;
        this.currentNodeType = currentNodeType;
    }
}
