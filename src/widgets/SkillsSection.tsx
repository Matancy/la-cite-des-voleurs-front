import React, { useState } from "react";
import ProgressBar from "./progressBar.tsx";
import piece from "../assets/images/gold-piece.png";
import { useNavigate } from "react-router-dom";
import { Character } from "../model/Character.ts";
import { User } from "../model/User.ts";
import { Save } from "../model/Save.ts";

const SkillsSection = () => {
    let user: Character | null = JSON.parse(localStorage.getItem("character")!);
    const navigate = useNavigate();
    let jsonAccount = localStorage.getItem("user");

    let jsonSave = localStorage.getItem("save");
    let save: Save = JSON.parse(jsonSave!);

    if (jsonAccount) {
        user = {
            name: save.save.nom,
            hability: save.save.habileteTotal,
            currentHability: save.save.currentHabilete,
            stamina: save.save.enduranceTotal,
            currentStamina: save.save.currentEndurance,
            luck: save.save.chanceTotal,
            currentLuck: save.save.currentChance,
            gold: save.save.or,
            path: save.save.path,
            currentNode: save.save.currentNode,
            currentNodeType: save.save.currentNodeType
        };
    }

    if (!user) {
        navigate("/character-creation");
    }

    return (
        <div className={`bg-black/[.7] rounded-2xl p-2 flex flex-col`}>
            <div className="text-white flex justify-between">
                <p>{user.name}</p>
                <div className="self-end mr-2 mb-2 flex items-center">
                    <p>Pièce(s) d'or : {user.gold}</p>
                    <img src={piece} alt="Back" className="w-4 h-4 ml-2" />
                </div>
            </div>
            <div className={`mb-2 flex items-center`}>
                <div className="w-32 mr-2">
                    <span className="text-white">Habileté :</span>
                </div>
                <div style={{ width: "80%" }}>
                    <ProgressBar
                        key={1}
                        bgcolor={"#50C0FF"}
                        completed={user.currentHability}
                        max={user.hability}
                        changeColorBasedOnPercentage={false}
                    />
                </div>
            </div>
            <div className={`mb-2 flex items-center`}>
                <div className="w-32 mr-2">
                    <span className="text-white">Endurance :</span>
                </div>
                <div style={{ width: "80%" }}>
                    <ProgressBar
                        key={2}
                        bgcolor={"#67BF48"}
                        completed={user.currentStamina}
                        max={user.stamina}
                        changeColorBasedOnPercentage={true}
                    />
                </div>
            </div>
            <div className={`flex items-center`}>
                <div className="w-32 mr-2">
                    <span className="text-white">Chance :</span>
                </div>
                <div style={{ width: "80%" }}>
                    <ProgressBar
                        key={3}
                        bgcolor={"#DCD304"}
                        completed={user.currentLuck}
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
