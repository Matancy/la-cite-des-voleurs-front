import React, { useEffect, useState } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import { useParams } from "react-router-dom";
import { getNode } from "../model/callApi.ts";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../model/utils.ts";
import { Character } from "../model/Character.ts";
import SkillsSection from "../widgets/SkillsSection.tsx";
import piece from "../assets/images/gold-piece.png";
import { RiddleNode } from "../model/RiddleNode.ts";

const WARNING_REMAINING_TRIES = "Mauvaise réponse, %s essais restant"
const WARNING_VALID_ANSWER = "Bonne réponse"

// @here2 Louan
const RiddlePage = () => {

    const [tries, setTries] = useState<number>(3)
    const [imageUrl, setImageUrl] = useState<string>("");
    const [disableNextNodeButton, setdisableNextNodeButton] = useState<boolean>(true)
    const [resultWarning, setResultWarning] = useState<string>("")
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();


    let [riddleAnswer, setriddleAnswer] = useState<string>("")

    let json = localStorage.getItem("character");

    if (json === null) {
        navigate("/");
    }

    let user: Character = Character.fromJson(JSON.parse(json!));
    let node: RiddleNode;

    const [updatedNode, setUpdatedNode] = useState<RiddleNode>();

    const retirerPiece = (quantite) => {
        if (user.gold >= quantite) {
            user.setGold(user.gold - quantite);
            localStorage.setItem("character", JSON.stringify(user));
        }
    };

    useEffect(()=>{
        setResultWarning(resultWarning)
    }, [resultWarning])

    useEffect(()=>{
        setTries(tries)
    }, [tries])

    useEffect(() => {
        async function fetchData() {
            let temp_node = await getNode(Number(id));
            let type = temp_node?.type;

            if (type === "riddle") {
                setUpdatedNode(temp_node);
            } else {
                navigate("/");
            }
        }

        fetchData();
    }, [id, navigate]);

    useEffect(()=>{
        setdisableNextNodeButton(disableNextNodeButton)
    }, [disableNextNodeButton])

    useEffect(()=>{
        setriddleAnswer(riddleAnswer)
    }, [riddleAnswer])

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


    const checkAnswer = (answer: string)=>{
        if(answer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== updatedNode?.riddleAnswer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")){
            setTries(tries-1)
            setResultWarning(WARNING_REMAINING_TRIES.replace("%s", tries.toString()))
        }else{
            setdisableNextNodeButton(false)
            setResultWarning(WARNING_VALID_ANSWER)
        }

        if(tries <= 0){
            navigate("/died")
        }
    }

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
                        <div className="flex flex-col items-center">
                            <label>Réponse: </label>
                            <input 
                            // className="w-2/3 m-5"
                            className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 text-lg w-4/5"

                                type="text"
                                placeholder="Votre réponse"
                                onInput={(e: React.ChangeEvent<HTMLInputElement>)=>{
                                    riddleAnswer = e.target.value
                                }}
                            />
                            <span className={`${disableNextNodeButton?"text-red-600":"text-lime-500	"}`} >{resultWarning}</span>
                            <button
                            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min`}
                            onClick={()=>{
                                checkAnswer(riddleAnswer)
                            }}
                            >Vérifier</button>
                        </div>
                       
                        <div
                            className={`flex justify-${
                                updatedNode?.links &&
                                updatedNode?.links.length === 1
                                    ? "center"
                                    : "between"
                            } w-1/3 mt-10`}
                        ></div>
                        <div className="flex justify-evenly">
                            {updatedNode?.links &&
                                updatedNode.links.map((link, index) => (
                                    <button
                                        disabled={disableNextNodeButton}
                                        key={index}
                                        onClick={() => {
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
                                                    navigate("/story-riddle/" + link.id);
                                                    break;
                                                default:
                                                    navigate("/");
                                                    break;
                                            }
                                        }}
                                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min ${
                                            disableNextNodeButton && "opacity-50 cursor-not-allowed"
                                        }`}
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

export default RiddlePage;
