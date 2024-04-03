import { API_URL, Character, ChoicesNode, DiceNode, DirectLinkNode, EndNode, FightNode, Node, NodeType } from './utils.ts';

export async function getNode(index: number) : Promise<ChoicesNode | DiceNode | DirectLinkNode | EndNode | FightNode | undefined>{
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
        default:{
            console.warn("could not get node type")
        }
    }
}

export async function postCharacter(character: Character){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character)
    };

    fetch((API_URL + `/character`), requestOptions).then(response => console.log(response));
}