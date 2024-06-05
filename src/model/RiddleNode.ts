import { NextNode } from "./NextNode";
import {Node} from "./Node";

export class RiddleNode extends Node{
    readonly riddleAnswer: string;
    readonly links : NextNode;
}