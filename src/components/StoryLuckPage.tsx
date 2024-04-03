import React from "react";
import HeaderStoryPage from "./HeaderStoryPage.tsx";
import StoryData from "../assets/temp/dice.json";
import Dice from "./dice/Dice.tsx";

const StoryLuckPage = () => {
    const { id, text, imageURL, action } = StoryData;
    const { success, fail } = action;
    const isSuccess = true; // TODO: temporaire

    const test = (total: number, totalDice: number, rolling: boolean) => {
        // Mettre à jour l'état
        console.log("toto");
    };

    return (
        <div className="p-4 font-Inter text-xl flex flex-col gradient text-white overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-4">Cellule {id}</h2>
                <img
                    src={imageURL}
                    alt="Illustration de la situation"
                    className="h-1/4 mb-3"
                />
                <div
                    className="mb-6"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <Dice
                    numberOfDice={2}
                    adjustScore={12}
                    onTotalChange={test}
                    buttonPosition="left"
                />
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
