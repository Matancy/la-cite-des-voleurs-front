export class Character {
    name: string;
    hability: number;
    stamina: number;
    luck: number;
    gold: number;

    constructor(name: string, hability: number, stamina: number, luck: number, gold: number) {
        this.name = name;
        this.hability = hability;
        this.stamina = stamina;
        this.luck = luck;
        this.gold = gold;
    }
}