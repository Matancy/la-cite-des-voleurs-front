export class Character {
    name: string;
    hability: number;
    currentHability: number;
    stamina: number;
    currentStamina: number;
    luck: number;
    currentLuck: number;
    gold: number;
    path: string[];
    currentNode: number;
    currentNodeType: string;
    difficulty: string;

    constructor(
        name: string,
        hability: number,
        currentHability: number,
        stamina: number,
        currentStamina: number,
        luck: number,
        currentLuck: number,
        gold: number,
        path: string[],
        currentNode: number,
        currentNodeType: string,
        difficulty: string
    ) {
        this.name = name;
        this.hability = hability;
        this.currentHability = hability;
        this.stamina = stamina;
        this.currentStamina = stamina;
        this.luck = luck;
        this.currentLuck = luck;
        this.gold = gold;
        this.path = path;
        this.currentNode = currentNode;
        this.currentNodeType = currentNodeType;
        this.difficulty = difficulty;
    }

    static fromJson(json: any): Character {
        return new Character(
            json.name,
            json.hability,
            json.currentHability,
            json.stamina,
            json.currentStamina,
            json.luck,
            json.currentLuck,
            json.gold,
            json.path,
            json.currentNode,
            json.currentNodeType,
            json.difficulty
        );
    }

    setGold(value: number): void {
        this.gold = value;
    }

    setCurrentLuck(value: number): void {
        this.currentLuck = value;
    }

    setCurrentStamina(value: number): void {
        this.currentStamina = value;
    }
}