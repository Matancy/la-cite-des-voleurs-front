import React from "react";
import HeaderStoryPage from "./HeaderStoryPage.tsx";
import storyData from "../assets/temp/choix.json";

const StoryChoicePage = () => {
    const { id, text, links } = storyData;

    return (
        <div className="p-4 font-Inter text-xl flex flex-col gradient text-white overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-4">Cellule {id}</h2>
                <div className="mb-6 w-2/3" dangerouslySetInnerHTML={{ __html: text }} />
                <div className="flex w-1/3 justify-between">
                    {links.map((link, index) => (
                        <button key={index} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                            <p>Aller à {link.nextNode}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoryChoicePage;
