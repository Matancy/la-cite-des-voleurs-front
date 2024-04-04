import React, { useState, useEffect } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import Dice from "../widgets/dice/Dice.tsx";
import { useParams } from "react-router-dom";
import { getNode } from "../model/callApi.ts";
import { DiceNode } from "../model/DiceNode.ts";
import { useNavigate } from "react-router-dom";

const StoryLuckPage = () => {
    const params = useParams();
    const id = params.id;
    const [isSuccessActive, setIsSuccessActive] = useState(false);
    const [isFailActive, setIsFailActive] = useState(false);
    const [updatedNode, setUpdatedNode] = useState<DiceNode>();
    const navigate = useNavigate();
    let user: Character = JSON.parse(localStorage.getItem("character"));

    const handleChance = (total: number) => {
        // Comparer le total du dé avec la chance du joueur
        if (total !== 0) {
            if (total <= user.luck) {
                setIsSuccessActive(true); // Activer le bouton de succès
                setIsFailActive(false); // Désactiver le bouton d'échec
            } else {
                setIsSuccessActive(false); // Désactiver le bouton de succès
                setIsFailActive(true); // Activer le bouton d'échec
            }
        }
    };

    let node: DiceNode;

    useEffect(() => {
        async function fetchData() {
            let temp_node = await getNode(id);
            let type = temp_node?.type;

            if (type === "dice") {
                node = temp_node;
            } else {
                navigate("/");
            }

            setUpdatedNode(node);
        }

        fetchData();
    }, [id]);

    console.log(updatedNode);

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto min-h-screen">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                    Cellule {updatedNode?.id}
                </h2>
                <img
                    src={updatedNode?.imageURL}
                    alt="Illustration de la situation"
                    className="w-2/5 mb-3 rounded-3xl"
                />
                <div
                    className="mb-6 w-2/3"
                    dangerouslySetInnerHTML={{ __html: updatedNode?.text }}
                />
                <Dice
                    numberOfDice={2}
                    adjustScore={0}
                    onTotalChange={handleChance}
                    buttonPosition="left"
                    isCharacterCreation={false}
                />
                <div className="flex w-1/3 justify-between">
                    <button
                        className={`bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded h-min ${isSuccessActive
                                ? "hover:bg-gray-400"
                                : "opacity-50 cursor-not-allowed hover:bg-gray-300"
                            }`}
                        disabled={!isSuccessActive}
                    >
                        <p
                            className={`${isSuccessActive ? "" : "cursor-not-allowed"
                                }`}
                        >
                            Aller à {updatedNode?.action.success.id}
                        </p>
                    </button>
                    <button
                        className={`bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded h-min ${
                            isFailActive
                                ? "hover:bg-gray-400"
                                : "opacity-50 cursor-not-allowed hover:bg-gray-300"
                            }`}
                        disabled={!isFailActive}
                    >
                        <p
                            className={`${isFailActive ? "" : "cursor-not-allowed"
                                }`}
                        >
                            Aller à {updatedNode?.action.fail.id}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryLuckPage;
