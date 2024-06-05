import React, { useEffect, useState } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import { useParams } from "react-router-dom";
import { getNode } from "../model/callApi.ts";
import { postSave } from "../model/callApi.ts";
import { DirectLinkNode } from "../model/DirectLinkNode.ts";
import { ChoicesNode } from "../model/ChoicesNode.ts";
import { EndNode } from "../model/EndNode.ts";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../model/utils.ts";
import { Character } from "../model/Character.ts";
import { User } from "../model/User.ts";
import SkillsSection from "../widgets/SkillsSection.tsx";
import piece from "../assets/images/gold-piece.png";

const StoryChoicePage = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    let json = localStorage.getItem("character");

    if (json === null) {
        navigate("/");
    }

    let user: Character = Character.fromJson(JSON.parse(json!));
    let node: DirectLinkNode | ChoicesNode | EndNode;

    const [updatedNode, setUpdatedNode] = useState<
        DirectLinkNode | ChoicesNode | EndNode
    >();

    let jsonAccount = localStorage.getItem("user");
    let userAccount: User = JSON.parse(jsonAccount!);
    let username;

    if (jsonAccount) {
        username = userAccount.id;
    }

    const saveUser = (link) => {
        if (username !== undefined) {
            let or = user.gold;

            if (link.cost !== 0 && link.cost !== undefined) {
                or -= link.cost;
            }

            let savePath = user.path;

            savePath.push(link.id);

            let saveData = {
                nom: user.name,
                habileteTotal: user.hability,
                currentHabilete: user.currentHability,
                enduranceTotal: user.stamina,
                currentEndurance: user.currentStamina,
                chanceTotal: user.luck,
                currentChance: user.currentLuck,
                or: or,
                currentNode: link.id,
                path: savePath,
                difficulty: "test",
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

    useEffect(() => {
        async function fetchData() {
            let temp_node = await getNode(Number(id));
            let type = temp_node?.type;

            if (type === "choice") {
                node = temp_node as ChoicesNode;
            } else if (type === "end") {
                node = temp_node as EndNode;
            } else if (type === "directLink") {
                node = temp_node as DirectLinkNode;
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

    const retirerPiece = (quantite) => {
        if (username === undefined) {
            if (user.gold >= quantite) {
                user.setGold(user.gold - quantite);
                localStorage.setItem("character", JSON.stringify(user));
            }
        }
    };

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto min-h-screen">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <div className="flex">
                    <div className="basis-3/12">
                        <img
                            src={imageUrl}
                            alt="Illustration de la situation"
                            className="w-full mb-3 rounded-3xl"
                        />
                        <SkillsSection />
                    </div>
                    <div className="flex flex-col basis-9/12">
                        <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                            Cellule {updatedNode?.id}{" "}
                            {updatedNode?.type === "end" ? " - Fin" : ""}
                        </h2>
                        <div
                            className="w-4/5 m-auto"
                            dangerouslySetInnerHTML={{
                                __html: updatedNode?.text,
                            }}
                        />
                        <div
                            className={`flex justify-${
                                updatedNode?.links &&
                                updatedNode?.links.length === 1
                                    ? "center"
                                    : "between"
                            } w-1/3 mt-10`}
                        ></div>
                        <div className="flex justify-evenly">
                            <button
                            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min ${updatedNode?.type !== "end" &&"invisible"}`}
                            onClick={()=>navigate("/died")}
                            >
                                La fin...
                            </button>
                            {updatedNode?.links &&
                                updatedNode.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            saveUser(link);
                                            if (link.cost > 0) {
                                                retirerPiece(link.cost);
                                            }
                                            switch (link.type) {
                                                case "choice":
                                                case "end":
                                                case "directLink":
                                                    navigate(
                                                        "/story-choice/" +
                                                            link.id
                                                    );
                                                    break;
                                                case "dice":
                                                    navigate(
                                                        "/story-luck/" + link.id
                                                    );
                                                    break;
                                                case "fight":
                                                    navigate(
                                                        "/story-fight/" +
                                                            link.id
                                                    );
                                                    break;
                                                case "riddle":
                                                    navigate(
                                                        "/story-riddle/" +
                                                            link.id
                                                    );
                                                    break;
                                                default:
                                                    navigate("/");
                                                    break;
                                            }
                                        }}
                                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min ${
                                            user.gold < link.cost &&
                                            "opacity-50 cursor-not-allowed"
                                        }`}
                                        disabled={user.gold < link.cost}
                                    >
                                        <p>Aller à {link.id}</p>
                                        {link.cost > 0 && (
                                            <div className="flex justify-center items-center">
                                                <p>Coût : {link.cost}</p>
                                                <img
                                                    src={piece}
                                                    alt="Back"
                                                    className="w-4 h-4 ml-2"
                                                />
                                            </div>
                                        )}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryChoicePage;
