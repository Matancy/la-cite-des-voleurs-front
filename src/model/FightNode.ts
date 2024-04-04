import { NextNode } from "./NextNode";

export class FightNode extends Node {
    nextNode: NextNode;
    foeHability: number;
    foeStamina: number;
}