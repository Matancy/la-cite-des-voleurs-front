import { NextNode } from "./NextNode";
import {Node} from "./Node";

export class DirectLinkNode extends Node {
    nextNode: NextNode;
}