import { ChoicesNode } from './ChoicesNode.ts';
import { DiceNode } from './DiceNode.ts';
import { EndNode } from './EndNode.ts';
import { API_URL } from './utils.ts';
import { Node } from './Node.ts';
import { NodeType } from './NodeType.ts';
import { DirectLinkNode } from './DirectLinkNode.ts';
import { FightNode } from './FightNode.ts';
import { Character } from './Character.ts';
import { User } from './User.ts';
import { Save } from "./Save.ts";

export async function getNode(index: number): Promise<ChoicesNode | DiceNode | DirectLinkNode | EndNode | FightNode | undefined> {
    const response = await fetch(API_URL + `/nodes/${index}`).then(response => response.json());
    const type = (response as Node).type;
    switch (type) {
        case NodeType.CHOICE: {
            return response as ChoicesNode;
        }
        case NodeType.DICE: {
            return response as DiceNode;
        }
        case NodeType.DIRECT_LINK: {
            return response as DirectLinkNode;
        }
        case NodeType.END: {
            return response as EndNode;
        }
        case NodeType.FIGHT: {
            return response as FightNode;
        }
        default: {
            console.warn("could not get node type")
        }
    }
}

export async function postCharacter(character: Character) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character)
    };

    fetch((API_URL + `/character`), requestOptions).then(response => console.log(response));
}

export async function postLogin(user: User) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    fetch((API_URL + `/user`), requestOptions).then(response => console.log(response));
}

export async function postSave(save: {id: string, save: Save}) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(save)
    };

    fetch((API_URL + `/user/update`), requestOptions).then(response => console.log(response));
}