import React, { useState } from "react";
import ProgressBar from "./progressBar.tsx";
import statsIcon from "../assets/images/stats.png";
import hiddenStatsIcon from "../assets/images/hide_stats.png";
import piece from "../assets/images/gold-piece.png";
import { useNavigate } from "react-router-dom";

const SkillsSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [iconSrc, setIconSrc] = useState(statsIcon);
    let user: Character | null = JSON.parse(localStorage.getItem("character"));
    const navigate = useNavigate();

    if (!user) {
        navigate("/character-creation");
    }

    const toggleVisibility = () => {
        setIsVisible((prevState) => !prevState); // Utilisation de la fonction de mise à jour de l'état
        setIconSrc((prevIconSrc) =>
            prevIconSrc === statsIcon ? hiddenStatsIcon : statsIcon
        );
    };

    return (
        <div
            className={`bg-black/[.7] rounded-2xl p-2 flex flex-col`}
        >
            <div className="text-white flex justify-between">
                <p>{user.name}</p>
                <div className="self-end mr-2 mb-2 flex items-center">
                    <p>Pièce(s) d'or : {user.gold}</p>
                    <img src={piece} alt="Back" className="w-4 h-4 ml-2" />
                </div>
            </div>
            <div
                className={`mb-2 flex items-center`}
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
                className={`mb-2 flex items-center`}
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
                className={`flex items-center`}
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
        // </div>
    );
};

export default SkillsSection;
