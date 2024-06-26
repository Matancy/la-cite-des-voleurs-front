import React, { useState, useEffect } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import Dice from "../widgets/dice/Dice.tsx";
import { useParams, useNavigate } from "react-router-dom";
import { getNode } from "../model/callApi.ts";
import { DiceNode } from "../model/DiceNode.ts";
import { API_URL } from "../model/utils.ts";
import { Character } from "../model/Character.ts";
import LeftStorySection from "../widgets/LeftStorySection.tsx";
import { User } from "../model/User.ts";
import { postSave } from "../model/callApi.ts";

const StoryLuckPage = () => {
    const params = useParams();
    const id = params.id;
    const [isSuccessActive, setIsSuccessActive] = useState(false);
    const [isFailActive, setIsFailActive] = useState(false);
    const [updatedNode, setUpdatedNode] = useState<DiceNode>();
    const [rollingOne, setRollingOne] = useState(false);
    const navigate = useNavigate();
    let json = localStorage.getItem("character");

    if (json === null) {
        navigate("/");
    }

    let user: Character = Character.fromJson(JSON.parse(json!));
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleChance = (total: number) => {
        // Comparer le total du dé avec la chance du joueur
        if (total !== 0) {
            setRollingOne(true);
            if (total <= user.luck) {
                setIsSuccessActive(true); // Activer le bouton de succès
                setIsFailActive(false); // Désactiver le bouton d'échec
            } else {
                setIsSuccessActive(false); // Désactiver le bouton de succès
                setIsFailActive(true); // Activer le bouton d'échec
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsSuccessActive(false);
            setIsFailActive(false);
            setRollingOne(false);
        }, 1000);
    }, [id]);

    const resetIsFailActive = () => {
        setIsFailActive(false);
    };

    useEffect(() => {
        async function fetchData() {
            let temp_node = await getNode(Number(id));
            let type = temp_node?.type;

            if (type === "dice") {
                setUpdatedNode(temp_node);
            } else {
                navigate("/");
            }
        }

        fetchData();
    }, [id, navigate]);

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

    let jsonAccount = localStorage.getItem("user");
    let userAccount: User = JSON.parse(jsonAccount!);
    let username;

    if (jsonAccount) {
        username = userAccount.id;
    }

    const saveUser = (link) => {
        if (username !== undefined) {
            let savePath = user.path;

            savePath.push(link.id);

            let saveData = {
                nom: user.name,
                habileteTotal: user.hability,
                currentHabilete: user.currentHability,
                enduranceTotal: user.stamina,
                currentEndurance: user.currentStamina,
                chanceTotal: user.luck,
                currentChance: user.currentLuck - 1,
                or: user.gold,
                currentNode: link.id,
                path: savePath,
                difficulty: user.difficulty,
                currentNodeType: link.type,
            };

            let save = {
                id: username,
                save: saveData,
            };

            localStorage.setItem("save", JSON.stringify(save));
            postSave(save);

            let character: Character = new Character(
                save.save.nom,
                save.save.habileteTotal,
                save.save.currentHabilete,
                save.save.enduranceTotal,
                save.save.currentEndurance,
                save.save.chanceTotal,
                save.save.currentChance,
                save.save.or,
                save.save.path,
                save.save.currentNode,
                save.save.currentNodeType,
                save.save.difficulty
            );
            localStorage.setItem("character", JSON.stringify(character));
        }
    };

    const retirerLuck = () => {
        if (username === undefined) {
            user.setCurrentLuck(user.currentLuck - 1);
            localStorage.setItem("character", JSON.stringify(user));
        }
    };

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto min-h-screen">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <div className="flex">
                    <LeftStorySection imageUrl={imageUrl} />
                    <div className="flex flex-col basis-9/12">
                        <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                            Cellule {updatedNode?.id}
                        </h2>
                        <div
                            className="w-4/5 m-auto"
                            dangerouslySetInnerHTML={{
                                __html: updatedNode?.text,
                            }}
                        />
                        <Dice
                            rolling={rollingOne}
                            onRollingChange={setRollingOne}
                            numberOfDice={2}
                            adjustScore={0}
                            onTotalChange={handleChance}
                            buttonPosition="left"
                            isCharacterCreation={false}
                            isLuckRoll={true}
                        />
                        <div className="flex justify-evenly">
                            <button
                                className={`bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded h-min ${
                                    isSuccessActive
                                        ? "hover:bg-gray-400"
                                        : "opacity-50 cursor-not-allowed hover:bg-gray-300"
                                }`}
                                disabled={!isSuccessActive}
                                onClick={() => {
                                    saveUser(updatedNode?.action.success);
                                    retirerLuck();
                                    switch (updatedNode?.action.success.type) {
                                        case "choice":
                                        case "end":
                                        case "directLink":
                                            navigate(
                                                "/story-choice/" +
                                                    updatedNode?.action.success
                                                        .id
                                            );
                                            break;
                                        case "dice":
                                            navigate(
                                                "/story-luck/" +
                                                    updatedNode?.action.success
                                                        .id
                                            );
                                            break;
                                        case "fight":
                                            navigate(
                                                "/story-fight/" +
                                                    updatedNode?.action.success
                                                        .id
                                            );
                                            break;
                                        default:
                                            navigate("/");
                                            break;
                                    }
                                }}
                            >
                                <p
                                    className={`${
                                        isSuccessActive
                                            ? ""
                                            : "cursor-not-allowed"
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
                                onClick={() => {
                                    saveUser(updatedNode?.action.fail);
                                    retirerLuck();
                                    switch (updatedNode?.action.fail.type) {
                                        case "choice":
                                        case "end":
                                        case "directLink":
                                            navigate(
                                                "/story-choice/" +
                                                    updatedNode?.action.fail.id
                                            );
                                            break;
                                        case "dice":
                                            navigate(
                                                "/story-luck/" +
                                                    updatedNode?.action.fail.id
                                            );
                                            break;
                                        case "fight":
                                            navigate(
                                                "/story-fight/" +
                                                    updatedNode?.action.fail.id
                                            );
                                            break;
                                        case "riddle":
                                            navigate(
                                                "/story-riddle/" +
                                                    updatedNode?.action.fail.id
                                            );
                                            break;
                                        default:
                                            navigate("/");
                                            break;
                                    }
                                    resetIsFailActive();
                                }}
                            >
                                <p
                                    className={`${
                                        isFailActive ? "" : "cursor-not-allowed"
                                    }`}
                                >
                                    Aller à {updatedNode?.action.fail.id}
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryLuckPage;
