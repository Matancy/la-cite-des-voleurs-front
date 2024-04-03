import React from "react";
import storyData from "../assets/temp/choix.json";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import { useParams } from "react-router-dom";

const StoryChoicePage = () => {
    const { text, links, imageURL } = storyData;
    const params = useParams();
    const id = params.id;

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-4">Cellule {id}</h2>
                <img
                    src={imageURL}
                    alt="Illustration de la situation"
                    className="w-2/5 mb-3"
                />
                <div
                    className="mb-6 w-2/3"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <div className="flex w-1/3 justify-between">
                    {links.map((link, index) => (
                        <button
                            key={index}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min"
                        >
                            <p>Aller à {link.nextNode}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoryChoicePage;
