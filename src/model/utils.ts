export const API_URL = "http://localhost:3100";

export enum NodeType {
    DICE = "dice",
    CHOICE = "choice",
    FIGHT = "fight",
    DIRECT_LINK = "directLink",
    END = "end"
}

export abstract class Node {
    id: number;
    type: string;
    text: string;
    imageURL: URL;
}


export class EndNode extends Node { }

export class FightNode extends Node {
    idOfNextNode: number;
    foeHability: number;
    foeStamina: number;
}

export class DirectLinkNode extends Node {
    idOfNextNode: number;
}

class ChoiceLink{
    cost: number;
    nextNode: number;
}

export class ChoicesNode extends Node{
    links: Array<ChoiceLink>
}

export enum DiceField {
    LUCK = "luck",
    HABILITY = "hability"
}

class ActionDice{
    field: DiceField;
    success: number; // id of node if success
    fail: number; // id of node if fail
}

export class DiceNode extends Node{
    action: ActionDice;
}

export class Character{
    name: string;
    hability: number;
    stamina: number;
    luck: number;
    gold: number;

    constructor(name: string, hability: number, stamina: number, luck: number, gold:number){
        this.name = name;
        this.hability = hability;
        this.stamina = stamina;
        this.luck = luck;
        this.gold = gold;
    }
}