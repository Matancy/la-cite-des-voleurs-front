export const API_URL = "http://localhost:3200";

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

export class NextNode{
    id: number;
    type: NodeType;
}

export class EndNode extends Node { }

export class FightNode extends Node {
    nextNode: NextNode;
    foeHability: number;
    foeStamina: number;
}

export class DirectLinkNode extends Node {
    nextNode: NextNode;
}

class ChoiceLink{
    cost: number;
    id: number;
    type: NodeType
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
    success: NextNode; // next node if success
    fail: NextNode; // next node if fail
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