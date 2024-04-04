import React, { useState, useEffect } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import ProgressBar from "../widgets/progressBar.tsx";
import Dice from "../widgets/dice/Dice.tsx";
import { getNode } from "../model/callApi.ts";
import { useParams } from "react-router-dom";
import { FightNode } from "../model/FightNode.ts";
import { useNavigate } from "react-router-dom";

const StoryFightPage = () => {
    let user: Character = JSON.parse(localStorage.getItem("character"));
    const [updatedNode, setUpdatedNode] = useState<FightNode>();
    const navigate = useNavigate();
    const [playerAttack, setPlayerAttack] = useState<number>(0);
    const [monsterAttack, setMonsterAttack] = useState<number>(0);
    const [playerLife, setPlayerLife] = useState<number>(user.stamina);
    const [monsterLife, setMonsterLife] = useState<number>(
        parseInt(updatedNode?.foeStamina)
    );

    const params = useParams();
    const id = params.id;

    const handlePlayerHability = (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        setPlayerAttack(total);
    };

    const handleMonsterHability = (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        setMonsterAttack(total);
    };

    useEffect(() => {
        if (playerAttack > 0 && monsterAttack > 0) {
            if (playerAttack > monsterAttack) {
                setMonsterLife(monsterLife - 2);
                setMonsterAttack(0);
                setPlayerAttack(0);
                console.log(monsterAttack, playerAttack);
                if (monsterLife > 0) {
                    //dégriser le button dans diceRoll
                }
            } else if (playerAttack < monsterAttack) {
                setPlayerLife(playerLife - 2);
                setMonsterAttack(0);
                setPlayerAttack(0);
                console.log(monsterAttack, playerAttack);
                if (playerLife > 0) {
                    //dégriser le button dans diceRoll
                }
            } else {
                setMonsterAttack(0);
                setPlayerAttack(0);
                console.log(monsterAttack, playerAttack);
                //dégriser le button dans diceRoll
            }
        }
    }, [playerAttack, monsterAttack]);

    let node: FightNode;

    useEffect(() => {
        async function fetchData() {
            let temp_node = await getNode(id);
            let type = temp_node?.type;

            if (type === "fight") {
                node = temp_node;
            } else {
                navigate("/");
            }

            setUpdatedNode(node);
        }

        fetchData();
    }, [id]);

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
                <div className="w-2/3 flex justify-between items-center mb-6">
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Endurance joueur :</h2>
                        <div className="mb-4">
                            <ProgressBar
                                key={1}
                                bgcolor={"#67BF48"}
                                completed={user.stamina}
                                max={user.stamina}
                                changeColorBasedOnPercentage={true}
                            />
                        </div>
                        <Dice
                            numberOfDice={2}
                            adjustScore={6}
                            onTotalChange={handlePlayerHability}
                            buttonPosition="left"
                            isCharacterCreation={false}
                        />
                    </div>
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Endurance monstre :</h2>
                        <div className="mb-4">
                            <ProgressBar
                                key={1}
                                bgcolor={"#67BF48"}
                                completed={updatedNode?.foeStamina}
                                max={Number(updatedNode?.foeStamina)}
                                changeColorBasedOnPercentage={true}
                            />
                        </div>
                        <Dice
                            numberOfDice={2}
                            adjustScore={6}
                            onTotalChange={handleMonsterHability}
                            buttonPosition="right"
                            isCharacterCreation={false}
                        />
                    </div>
                </div>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                    <p>Aller à {updatedNode?.nextNode.id}</p>
                </button>
            </div>
        </div>
    );
};

export default StoryFightPage;
