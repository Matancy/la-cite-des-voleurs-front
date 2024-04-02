import React from "react";
import HeaderStoryPage from "./HeaderStoryPage.tsx";
import StoryData from "../assets/temp/dice.json";

const StoryLuckPage = () => {
    const { id, text, imageURL, action } = StoryData;
    const { success, fail } = action;
    const isSuccess = true; // TODO: temporaire

    return (
        <div className="p-4 font-Inter text-xl flex flex-col gradient text-white overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-4">Cellule {id}</h2>
                <img src={imageURL} alt="Illustration de la situation" className="h-1/4 mb-3" />
                <div className="mb-6" dangerouslySetInnerHTML={{ __html: text }} />
                <div className="w-1/3 flex justify-between items-center mb-6">
                    <button className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                        <p>Lancer dés</p>
                    </button>
                    <div className="flex justify-between w-1/2">
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-24"
                        />
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-24"
                        />
                    </div>
                </div>
                {isSuccess ? (
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                        <p>Aller à {success}</p>
                    </button>
                ) : (
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                        <p>Aller à {fail}</p>
                    </button>
                )}
            </div>
        </div>
    );
};

export default StoryLuckPage;
