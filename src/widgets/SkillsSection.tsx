import React, { useState } from "react";
import ProgressBar from "./progressBar.tsx";
import statsIcon from "../assets/images/stats.png";
import hiddenStatsIcon from "../assets/images/hide_stats.png";
import piece from "../assets/images/gold-piece.png";

const SkillsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [iconSrc, setIconSrc] = useState(statsIcon);
    
    let user: Character = JSON.parse(localStorage.getItem("character")); 

    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState); // Utilisation de la fonction de mise à jour de l'état
        setIconSrc((prevIconSrc) =>
            prevIconSrc === statsIcon ? hiddenStatsIcon : statsIcon
        );
    };

    return (
        <div className="flex flex-col absolute top-5 right-5">
            <button
                onClick={toggleVisibility}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded h-min  self-end flex items-center justify-center mb-2"
            >
                <p className="mr-2">Statistiques personnage</p>
                <img src={iconSrc} alt="Toggle" className="h-6" />
            </button>
            <div
                className={`bg-black/[.7] rounded-2xl p-2 ${
                    isVisible ? "" : "hidden"
                } flex flex-col`}
            >
                <div className="text-white flex justify-between">
                    <p>{user.name}</p>
                    <div className="self-end mr-2 mb-2 flex items-center">
                        <p>Pièce(s) d'or : {user.gold}</p>
                        <img src={piece} alt="Back" className="w-4 h-4 ml-2" />
                    </div>
                </div>
                <div
                    className={`mb-2 flex items-center ${
                        isVisible ? "" : "hidden"
                    }`}
                >
                    <div className="w-32 mr-2">
                        <span className="text-white">Habileté :</span>
                    </div>
                    <div style={{ width: "80%" }}>
                        <ProgressBar
                            key={1}
                            bgcolor={"#50C0FF"}
                            completed={user.hability}
                            max={user.hability}
                            changeColorBasedOnPercentage={false}
                        />
                    </div>
                </div>
                <div
                    className={`mb-2 flex items-center ${
                        isVisible ? "" : "hidden"
                    }`}
                >
                    <div className="w-32 mr-2">
                        <span className="text-white">Endurance :</span>
                    </div>
                    <div style={{ width: "80%" }}>
                        <ProgressBar
                            key={2}
                            bgcolor={"#67BF48"}
                            completed={user.stamina}
                            max={user.stamina}
                            changeColorBasedOnPercentage={true}
                        />
                    </div>
                </div>
                <div
                    className={`flex items-center ${isVisible ? "" : "hidden"}`}
                >
                    <div className="w-32 mr-2">
                        <span className="text-white">Chance :</span>
                    </div>
                    <div style={{ width: "80%" }}>
                        <ProgressBar
                            key={3}
                            bgcolor={"#DCD304"}
                            completed={user.luck}
                            max={user.luck}
                            changeColorBasedOnPercentage={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsSection;
