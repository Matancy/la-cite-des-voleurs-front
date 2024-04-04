import React, { useState, useEffect } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import ProgressBar from "../widgets/progressBar.tsx";
import Dice from "../widgets/dice/Dice.tsx";
import { getNode } from "../model/callApi.ts";
import { FightNode } from "../model/FightNode.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Character } from "../model/Character.ts";
import { API_URL } from "../model/utils.ts";

const StoryFightPage = () => {
    const params = useParams();
    const [updatedNode, setUpdatedNode] = useState<FightNode>();
    const navigate = useNavigate();
    let json = localStorage.getItem("character");
    if (json === null) {
        navigate("/");
    }
    let user: Character = JSON.parse(json!);
    const [playerAttack, setPlayerAttack] = useState<number>(0);
    const [monsterAttack, setMonsterAttack] = useState<number>(0);
    const [playerLife, setPlayerLife] = useState<number>(user.stamina);
    const [rollingOne, setRollingOne] = useState(false);
    const [rollingTwo, setRollingTwo] = useState(false);
    const [diceOneRolling, setDiceOneRolling] = useState(false);
    const [diceTwoRolling, setDiceTwoRolling] = useState(false);
    const [diceOneHasRolled, setDiceOneHasRolled] = useState(false);
    const [diceTwoHasRolled, setDiceTwoHasRolled] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    const id = params.id;
    let node: FightNode;

    useEffect(() => {
        checkResetRolling();
        console.log("ok one" + diceOneHasRolled);
    }, [diceOneHasRolled]);

    useEffect(() => {
        checkResetRolling();
        console.log("ok two" + diceTwoHasRolled);
    }, [diceTwoHasRolled]);

    const diceOneRollingFromChild = (rolling: boolean) => {
        setTimeout(() => {
            setDiceOneRolling(rolling);
            setDiceOneHasRolled(true);
        }, 3000);
    };

    const diceTwoRollingFromChild = (rolling: boolean) => {
        setTimeout(() => {
            setDiceTwoRolling(rolling);
            setDiceTwoHasRolled(true);
        }, 3000);
    };

    const checkResetRolling = () => {
        if (diceOneHasRolled && diceTwoHasRolled) {
            console.log("reset");
            setRollingOne(false);
            setRollingTwo(false);
            setDiceOneHasRolled(false);
            setDiceTwoHasRolled(false);
        } else {
            console.log("not reset");
        }
    };

    useEffect(() => {
        async function fetchData() {
            let temp_node = await getNode(Number(id));
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

    useEffect(() => {
        async function getImgUrl() {
            let imageUrl = updatedNode?.imageURL.toString();
            if (imageUrl != undefined) {
                if (imageUrl !== "null") {
                    let url = API_URL + "/images/" + updatedNode?.id;
                    localStorage.setItem("imageUrl", url);
                    setImageUrl(url);
                } else {
                    setImageUrl(localStorage.getItem("imageUrl") as string);
                }
            }
        }
        getImgUrl();
    }, [updatedNode]);

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

    const [monsterLife, setMonsterLife] = useState<number>(
        updatedNode?.foeStamina
    );

    useEffect(() => {
        if (updatedNode?.foeStamina) {
            setMonsterLife(parseInt(updatedNode.foeStamina));
        }
    }, [updatedNode?.foeStamina]);

    useEffect(() => {
        if (playerAttack > 0 && monsterAttack > 0) {
            if (playerAttack > monsterAttack) {
                setMonsterLife(monsterLife - 2);
                setMonsterAttack(0);
                setPlayerAttack(0);
                if (monsterLife > 0) {
                    //dégriser le button dans diceRoll
                }
            } else if (playerAttack < monsterAttack) {
                setPlayerLife(playerLife - 2);
                setMonsterAttack(0);
                setPlayerAttack(0);
                if (playerLife > 0) {
                    //dégriser le button dans diceRoll
                }
            } else {
                setMonsterAttack(0);
                setPlayerAttack(0);
                //dégriser le button dans diceRoll
            }
        }
    }, [playerAttack, monsterAttack]);

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto min-h-screen">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                    Cellule {updatedNode?.id}
                </h2>
                <img
                    src={imageUrl}
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
                                completed={playerLife}
                                max={user.stamina}
                                changeColorBasedOnPercentage={true}
                            />
                        </div>
                        <Dice
                            rolling={rollingOne}
                            onRollingChange={setRollingOne}
                            setDiceRolling={diceOneRollingFromChild}
                            numberOfDice={2}
                            adjustScore={user.hability}
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
                                completed={monsterLife}
                                max={Number(updatedNode?.foeStamina)}
                                changeColorBasedOnPercentage={true}
                            />
                        </div>
                        <Dice
                            rolling={rollingTwo}
                            onRollingChange={setRollingTwo}
                            setDiceRolling={diceTwoRollingFromChild}
                            numberOfDice={2}
                            adjustScore={Number(updatedNode?.foeHability)}
                            onTotalChange={handleMonsterHability}
                            buttonPosition="right"
                            isCharacterCreation={false}
                        />
                    </div>
                </div>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min"
                    onClick={() => {
                        switch (updatedNode?.links.type) {
                            case "choice":
                            case "end":
                            case "directLink":
                                navigate(
                                    "/story-choice/" + updatedNode?.links.id
                                );
                                break;
                            case "dice":
                                navigate(
                                    "/story-luck/" + updatedNode?.links.id
                                );
                                break;
                            case "fight":
                                navigate(
                                    "/story-fight/" + updatedNode?.links.id
                                );
                                break;
                            default:
                                navigate("/");
                                break;
                        }
                    }}
                >
                    <p>Aller à {updatedNode?.links.id}</p>
                </button>
            </div>
        </div>
    );
};

export default StoryFightPage;
