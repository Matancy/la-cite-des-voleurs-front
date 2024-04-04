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

    constructor(name: string, hability: number, stamina: number, luck: number, gold: number) {
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

    decrementLuck(): void {
        this.currentLuck--;
    }

    // Getter et Setter pour currentHability
    get getCurrentHability(): number {
        return this.currentHability;
    }

    set setCurrentHability(value: number) {
        this.currentHability = value;
    }

    // Getter et Setter pour currentStamina
    get getCurrentStamina(): number {
        return this.currentStamina;
    }

    set setCurrentStamina(value: number) {
        this.currentStamina = value;
    }

    // Getter et Setter pour currentLuck
    get getCurrentLuck(): number {
        return this.currentLuck;
    }

    set setCurrentLuck(value: number) {
        this.currentLuck = value;
    }

    // Getter et Setter pour currentGold
    get getCurrentGold(): number {
        return this.currentGold;
    }

    set setCurrentGold(value: number) {
        this.currentGold = value;
    }
}