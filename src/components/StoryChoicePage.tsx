import React, { useEffect, useState } from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import { useParams } from "react-router-dom";
import { getNode } from "../model/callApi.ts";
import { DirectLinkNode } from "../model/DirectLinkNode.ts";
import { ChoicesNode } from "../model/ChoicesNode.ts";
import { EndNode } from "../model/EndNode.ts";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../model/utils.ts";


const StoryChoicePage = () => {
    const [imageUrl, setImageUrl] = useState<string>("");

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();


    let user: Character = JSON.parse(localStorage.getItem("character"));
    let node: DirectLinkNode | ChoicesNode | EndNode;

    const [updatedNode, setUpdatedNode] = useState<
        DirectLinkNode | ChoicesNode | EndNode
    >();

    useEffect(() => {

        async function fetchData() {
            let temp_node = await getNode(id);
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
            console.log("image: "+imageUrl)
            if(imageUrl !== "null"){
                let url = API_URL+"/images/"+id
    
                localStorage.setItem("imageUrl",url)
                setImageUrl(url)
            }else{
                setImageUrl(localStorage.getItem("imageUrl") as string)
            }
        }
        getImgUrl();


    }, [id])




    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto min-h-screen">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                    Cellule {updatedNode?.id} {updatedNode?.type === "end" ? " - Fin" : ""}
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
                <div
                    className={`flex justify-${
                        updatedNode?.links && updatedNode?.links.length === 1
                            ? "center"
                            : "between"
                    } w-1/3`}
                >
                    {updatedNode?.links &&
                        updatedNode.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    switch (link.type) {
                                        case "choice":
                                        case "end":
                                        case "directLink":
                                            navigate(
                                                "/story-choice/" + link.id
                                            );
                                            break;
                                        case "dice":
                                            navigate("/story-luck/" + link.id);
                                            break;
                                        case "fight":
                                            navigate("/story-fight/" + link.id);
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
                                {link.cost > 0 && <p>cout : {link.cost}</p>}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default StoryChoicePage;
