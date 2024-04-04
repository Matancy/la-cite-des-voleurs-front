import { DiceField } from "./DiceField";
import { NextNode } from "./NextNode";

export class ActionDice {
    field: DiceField;
    success: NextNode; // next node if success
    fail: NextNode; // next node if fail
}