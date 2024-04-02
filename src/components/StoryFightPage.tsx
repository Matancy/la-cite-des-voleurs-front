import React from "react";
import HeaderStoryPage from "./HeaderStoryPage.tsx";
import ProgressBar from "./progressBar.tsx";
import storyData from "../assets/temp/fight.json";

const StoryFightPage = () => {
    const { id, text, imageURL, idOfNextNode, foeStamina } =
        storyData;
    return (
        <div className="p-4 font-Inter text-xl flex flex-col gradient text-white overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-4">Cellule {id}</h2>
                <img src={imageURL} alt="Illustration de la situation" className="h-1/4 mb-3" />
                <div className="mb-6" dangerouslySetInnerHTML={{ __html: text }} />
                <div className="w-2/3 flex justify-between items-center mb-6">
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Endurance joueur :</h2>
                        <ProgressBar
                            key={1}
                            bgcolor={"#67BF48"}
                            completed={100}
                            max={90}
                            changeColorBasedOnPercentage={true}
                        />
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min mt-2 w-1/2 self-center">
                            <p>Lancer dés</p>
                        </button>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Endurance monstre :</h2>
                        <ProgressBar
                            key={1}
                            bgcolor={"#67BF48"}
                            completed={Number(foeStamina)}
                            max={Number(foeStamina)}
                            changeColorBasedOnPercentage={true}
                        />
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min mt-2 w-1/2 self-center">
                            <p>Lancer dés</p>
                        </button>
                    </div>
                </div>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                    <p>Aller à {idOfNextNode}</p>
                </button>
            </div>
        </div>
    );
};

export default StoryFightPage;
