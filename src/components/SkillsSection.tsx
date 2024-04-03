import React, { useState } from "react";
import ProgressBar from "./progressBar.tsx";
import statsIcon from "../assets/images/stats.png";
import hiddenStatsIcon from "../assets/images/hide_stats.png";

const SkillsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [iconSrc, setIconSrc] = useState(statsIcon);

    const toggleVisibility = () => {
        setIsVisible(prevState => !prevState); // Utilisation de la fonction de mise à jour de l'état
        setIconSrc(prevIconSrc => prevIconSrc === statsIcon ? hiddenStatsIcon : statsIcon);
    };

    return (
        <div className="flex flex-col absolute top-5 right-5">
            <button
                onClick={toggleVisibility}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded h-min  self-end flex items-center justify-center mb-2"
            >
                <img
                    src={iconSrc}
                    alt="Toggle"
                    className="h-6"
                />
            </button>
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
                        completed={30}
                        max={90}
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
                        completed={100}
                        max={100}
                        changeColorBasedOnPercentage={true}
                    />
                </div>
            </div>
            <div className={`flex items-center ${isVisible ? "" : "hidden"}`}>
                <div className="w-32 mr-2">
                    <span className="text-white">Chance :</span>
                </div>
                <div style={{ width: "80%" }}>
                    <ProgressBar
                        key={3}
                        bgcolor={"#DCD304"}
                        completed={50}
                        max={50}
                        changeColorBasedOnPercentage={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default SkillsSection;
