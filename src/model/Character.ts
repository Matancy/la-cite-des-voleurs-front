export class Character {
    name: string;
    hability: number;
    currentHability: number;
    stamina: number;
    currentStamina: number;
    luck: number;
    currentLuck: number;
    gold: number;
    currentGold: number;

    constructor(
        name: string,
        hability: number,
        stamina: number,
        luck: number,
        gold: number
    ) {
        this.name = name;
        this.hability = hability;
        this.currentHability = hability;
        this.stamina = stamina;
        this.currentStamina = stamina;
        this.luck = luck;
        this.currentLuck = luck;
        this.gold = gold;
        this.currentGold = gold;
    }

    static fromJson(json: any): Character {
        return new Character(
            json.name,
            json.hability,
            json.stamina,
            json.luck,
            json.gold
        );
    }

    setCurrentGold(value: number): void {
        this.gold = value;
    }
}
