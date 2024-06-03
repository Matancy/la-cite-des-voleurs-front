import React, { useState, useEffect } from "react";
import Dice from "../widgets/dice/Dice.tsx";
import backArrowIcon from "../assets/images/back_arrow.png";
import { useNavigate } from "react-router-dom";
import { postCharacter } from "../model/callApi.ts";
import { postSave } from "../model/callApi.ts";
import { Character } from "../model/Character.ts";
import { Save } from "../model/Save.ts";
import { User } from "../model/User.ts";

const INITIAL_GOLD_AMOUNT = 30;

const CharacterCreation = () => {
    const [enduranceTotal, setEnduranceTotal] = useState<number>(0);
    const [enduranceTotalDice, setEnduranceTotalDice] = useState<number>(0);
    const [enduranceNumberDice, setEnduranceNumberDice] = useState<number>(2);
    const [enduranceAdjustScore, setEnduranceAdjustScore] = useState<number>(12);
    const [rollingEndurance, setRollingEndurance] = useState<boolean>(false);

    const [habileteTotal, setHabileteTotal] = useState<number>(0);
    const [habileteTotalDice, setHabileteTotalDice] = useState<number>(0); // Initialisé à 1 par défaut
    const [habileteNumberDice, setHabileteNumberDice] = useState<number>(1);
    const [habileteAdjustScore, setHabileteAdjustScore] = useState<number>(6); // Initialisé à 6 par défaut
    const [rollingHabilete, setRollingHabilete] = useState<boolean>(false);

    const [chanceTotal, setChanceTotal] = useState<number>(0);
    const [chanceTotalDice, setChanceTotalDice] = useState<number>(0); // Initialisé à 1 par défaut
    const [chanceNumberDice, setChanceNumberDice] = useState<number>(1);
    const [chanceAdjustScore, setChanceAdjustScore] = useState<number>(6);
    const [rollingChance, setRollingChance] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const [rollingOne, setRollingOne] = useState(false);
    const [rollingTwo, setRollingTwo] = useState(false);
    const [rollingThree, setRollingThree] = useState(false);

    const [allRolling, setAllRolling] = useState<boolean>(true);
    const [difficulty, setDifficulty] = useState<string>("normal");

    const handleEnduranceTotalChange = async (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        setEnduranceTotal(total);
        setEnduranceTotalDice(totalDice);
        setRollingEndurance(rolling);
    };

    const handleHabileteTotalChange = (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        setHabileteTotal(total);
        setHabileteTotalDice(totalDice);
        setRollingHabilete(rolling);
    };

    const handleChanceTotalChange = (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        setChanceTotal(total);
        setChanceTotalDice(totalDice);
        setRollingChance(rolling);
    };

    const handleNameChange = () => {
        let name = document.getElementById("name") as HTMLInputElement;
        setName(name.value);
    };

    const resetDice = () => {
        setRollingOne(false);
        setRollingTwo(false);
        setRollingThree(false);
        setChanceTotalDice(0);
        setEnduranceTotalDice(0);
        setHabileteTotalDice(0);
        setChanceTotal(0);
        setEnduranceTotal(0);
        setHabileteTotal(0);
    };
    

    const handleDifficultyChange = (newDifficulty: string) => {
        resetDice(); // Réinitialiser les dés
        setDifficulty(newDifficulty);
        // Mise à jour du nombre de dés et du score d'ajustement en fonction de la difficulté
        switch (newDifficulty) {
            case "easy":
                setHabileteNumberDice(3); // Changer le nombre de dés
                setHabileteAdjustScore(6); // Changer le score d'ajustement
    
                setEnduranceNumberDice(2)
                setEnduranceAdjustScore(12);
    
                setChanceNumberDice(2);
                setChanceAdjustScore(6);
                break;
            case "normal":
                setHabileteNumberDice(1);
                setHabileteAdjustScore(6);
    
                setEnduranceNumberDice(2)
                setEnduranceAdjustScore(12);
    
                setChanceNumberDice(1);
                setChanceAdjustScore(6);
                break;
            case "hard":
                setHabileteNumberDice(1);
                setHabileteAdjustScore(6);
    
                setEnduranceNumberDice(1)
                setEnduranceAdjustScore(6);
    
                setChanceNumberDice(1);
                setChanceAdjustScore(0);
                break;
            case "eco":
                setHabileteNumberDice(1);
                setHabileteAdjustScore(0);
    
                setEnduranceNumberDice(1)
                setEnduranceAdjustScore(0);
        
                setChanceNumberDice(1);
                setChanceAdjustScore(0);
                break;
            default:
                break;
        }
    };
    
    

    useEffect(() => {
        if (
            rollingChance &&
            rollingEndurance &&
            rollingHabilete &&
            name.length !== 0
        ) {
            setAllRolling(false);
        }
    }, [rollingChance, rollingEndurance, rollingHabilete, name]);

    const navigate = useNavigate();

    const navigateToMainPage = () => {
        navigate("/");
    };

    let json = localStorage.getItem("user");
    let userAccount: User | null = null;
    if (json === null) {
        userAccount = null;
    } else {
        userAccount = JSON.parse(json!);
    }

    

    const createCharacter = () => {
        let character: Character = new Character(
            { name }.name,
            { habileteTotal }.habileteTotal,
            { habileteTotal }.habileteTotal,
            { enduranceTotal }.enduranceTotal,
            { enduranceTotal }.enduranceTotal,
            { chanceTotal }.chanceTotal,
            INITIAL_GOLD_AMOUNT,
            difficulty
        );
        localStorage.setItem("character", JSON.stringify(character));
        postCharacter(character);
        navigate("/story-choice/1");

        if (userAccount !== null) {
            createSave();
        }
    };

    const createSave = () => {
        if (userAccount !== null) {
            let saveData = {
                nom: { name }.name,
                habileteTotal: { habileteTotal }.habileteTotal,
                currentHabilete: { habileteTotal }.habileteTotal,
                enduranceTotal: { enduranceTotal }.enduranceTotal,
                currentEndurance: { enduranceTotal }.enduranceTotal,
                chanceTotal: { chanceTotal }.chanceTotal,
                currentChance: { chanceTotal }.chanceTotal,
                or: INITIAL_GOLD_AMOUNT,
                currentNode: 0,
                path: []
            };
    
            let save = {
                id: userAccount.id,
                data: saveData
            };

            console.log(save);
    
            localStorage.setItem("save", JSON.stringify(save));
            postSave(save);
        }
    };

    return (
        <div className="flex justify-center background-character-creation font-Inter text-xl p-2 min-h-screen">
            <div className="flex flex-col items-center justify-between w-3/5 h-auto">
                <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-6xl">
                    Création personnage
                </h1>
                <div className="bg-light-gray/[.8] rounded-2xl flex justify-between items-center py-2 px-3 my-3">
                    <label
                        htmlFor=""
                        className="text-white text-stroke-1px text-2xl mr-1"
                    >
                        Votre nom :
                    </label>
                    <input
                        type="text"
                        className="rounded-3xl px-2"
                        onChange={handleNameChange}
                        id="name"
                    />
                </div>
                 {/* Interface pour modifier la difficulté */}
                 <div className="bg-light-gray/[.8] rounded-3xl w-full h-min flex flex-col items-center py-2 mb-3">
                    <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl text-center mb-2">
                        Difficulté
                    </h1>
                    <div className="flex justify-center">
                        <button
                            className={`rounded-3xl px-4 py-2 mx-2 ${
                                difficulty === "easy"
                                    ? "bg-green-500 text-white"
                                    : "bg-light-gray text-gray-800"
                            }`}
                            onClick={() => handleDifficultyChange("easy")}
                        >
                            Facile
                        </button>
                        <button
                            className={`rounded-3xl px-4 py-2 mx-2 ${
                                difficulty === "normal"
                                    ? "bg-blue-500 text-white"
                                    : "bg-light-gray text-gray-800"
                            }`}
                            onClick={() => handleDifficultyChange("normal")}
                        >
                            Normal
                        </button>
                        <button
                            className={`rounded-3xl px-4 py-2 mx-2 ${
                                difficulty === "hard"
                                    ? "bg-red-500 text-white"
                                    : "bg-light-gray text-gray-800"
                            }`}
                            onClick={() => handleDifficultyChange("hard")}
                        >
                            Difficile
                        </button>
                        { name === "Genaivre" && (
                            <button
                            className={`rounded-3xl px-4 py-2 mx-2 ${
                                difficulty === "eco"
                                    ? "bg-black text-white"
                                    : "bg-light-gray text-gray-800"
                            }`}
                            onClick={() => handleDifficultyChange("eco")}
                        >
                            Eco (Ultra Hardcore)
                        </button>
                        )}

                    </div>
                </div>
                <div className="bg-light-gray/[.8] rounded-3xl w-full h-min flex justify-between items-center py-2 mb-3">
                    <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                        Endurance
                    </h1>
                    <div className="flex flex-col items-center justify-between h-full w-1/3">
                        <Dice
                            rolling={rollingOne}
                            onRollingChange={setRollingOne}
                            numberOfDice={enduranceNumberDice}
                            adjustScore={enduranceAdjustScore}
                            onTotalChange={handleEnduranceTotalChange}
                            buttonPosition="bottom"
                            isCharacterCreation={true}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-between h-full">
                        <p className="text-white text-stroke-1px text-2xl">
                            Score :
                        </p>
                        <p className="text-2xl text-white text-stroke-1px">
                            {enduranceTotalDice} + {enduranceAdjustScore}
                        </p>
                        <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                            Total : {enduranceTotal}
                        </p>
                    </div>
                </div>
                <div className="bg-light-gray/[.8] rounded-3xl w-full h-min flex justify-between items-center py-2 mb-3">
                    <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                        Habileté
                    </h1>
                    <div className="flex flex-col items-center justify-between h-full w-1/3">
                        <Dice
                            rolling={rollingTwo}
                            onRollingChange={setRollingTwo}
                            numberOfDice={habileteNumberDice} // Utiliser le nombre de dés dynamique
                            adjustScore={habileteAdjustScore} // Utiliser le score d'ajustement dynamique
                            onTotalChange={handleHabileteTotalChange}
                            buttonPosition="bottom"
                            isCharacterCreation={true}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-between h-full">
                        <p className="text-white text-stroke-1px text-2xl">
                            Score :
                        </p>
                        <p className="text-2xl text-white text-stroke-1px">
                            {habileteTotalDice} + {habileteAdjustScore}
                        </p>
                        <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                            Total : {habileteTotal}
                        </p>
                    </div>
                </div>
                <div className="bg-light-gray/[.8] rounded-3xl w-full h-min flex justify-between items-center py-2 mb-3">
                    <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                        Chance
                    </h1>
                    <div className="flex flex-col items-center justify-between h-full w-1/3">
                        <Dice
                            rolling={rollingThree}
                            onRollingChange={setRollingThree}
                            numberOfDice={chanceNumberDice} // Utiliser le nombre de dés dynamique
                            adjustScore={chanceAdjustScore}
                            onTotalChange={handleChanceTotalChange}
                            buttonPosition="bottom"
                            isCharacterCreation={true}
                        />
                    </div>
                    <div className="w-1/3 flex flex-col items-center justify-between h-full">
                        <p className="text-white text-stroke-1px text-2xl">
                            Score :
                        </p>
                        <p className="text-2xl text-white text-stroke-1px">
                            {chanceTotalDice} + {chanceAdjustScore}
                        </p>
                        <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                            Total : {chanceTotal}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <button
                        onClick={navigateToMainPage}
                        className="bg-light-gray/[.8] hover:bg-light-gray text-gray-800 font-bold py-2 px-4 rounded-xl h-min flex items-center"
                    >
                        <img
                            src={backArrowIcon}
                            alt="Back"
                            className="w-4 h-4 mr-2"
                        />{" "}
                        Retour au menu
                    </button>
                    <button
                        disabled={allRolling}
                        className={`bg-dark-brown hover:bg-darker-brown rounded-3xl w-1/3 h-16 border-solid border-black border-4 ${
                            allRolling ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={createCharacter}
                    >
                        <h2 className="font-GrenzeGotisch text-white text-stroke-2px text-3xl">
                            Commencer l'aventure
                        </h2>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default CharacterCreation;



