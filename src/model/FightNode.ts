import { NextNode } from "./NextNode";
import {Node} from "./Node";

export class FightNode extends Node {
    nextNode: NextNode;
    foeHability: number;
    foeStamina: number;
}