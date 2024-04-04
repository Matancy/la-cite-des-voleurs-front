import React from "react";
import storyData from "../assets/temp/choix.json";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import { useParams } from "react-router-dom";
import { getNode } from "../model/callApi.ts";
import { DirectLinkNode } from "../model/DirectLinkNode.ts";
import { ChoicesNode } from "../model/ChoicesNode.ts";
import { EndNode } from "../model/EndNode.ts";
import { useNavigate } from "react-router-dom";

const StoryChoicePage = () => {
    const { text, links, imageURL } = storyData;
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const playerMoney = 2; // Exemple de l'argent du joueur, à remplacer avec la valeur réelle récupérée depuis la base de données

    let node: DirectLinkNode | ChoicesNode | EndNode;

    async function callGetNode(id) {
        let temp_node = await getNode(id);

        if (temp_node.type) {
            console.log(node.type);
        } else {
            console.log('node vide');
        }

        let type = temp_node.type;

        if (type === "choice") {
            node = temp_node as ChoicesNode;
        } else if (type === "end") {
            node = temp_node as EndNode;
        } else if (type === "directLink") {
            node = temp_node as DirectLinkNode;
        } else {
            navigate("./");
        }
    }

    callGetNode(id);

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                    Cellule {id}
                </h2>
                <img
                    src={imageURL}
                    alt="Illustration de la situation"
                    className="w-2/5 mb-3 rounded-3xl"
                />
                <div
                    className="mb-6 w-2/3"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <div className="flex w-1/3 justify-between">
                    {links.map((link, index) => (
                        <button
                            key={index}
                            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min ${
                                playerMoney < link.cost &&
                                "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={playerMoney < link.cost}
                        >
                            <p>Aller à {link.nextNode}</p>
                            <p>{link.type}</p>
                            {link.cost > 0 && <p>cout : {link.cost}</p>}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoryChoicePage;
