import React, {
    useState,
    useEffect,
    HTMLInputAutoCompleteAttribute,
} from "react";
import Dice from "../widgets/dice/Dice.tsx";
import backArrowIcon from "../assets/images/back_arrow.png";
import { useNavigate } from "react-router-dom";
import { postCharacter } from "../model/callApi.ts";
import { Character } from "../model/Character.ts";

const INITIAL_GOLD_AMOUNT = 30;

const CharacterCreation = () => {
    const [enduranceTotal, setEnduranceTotal] = useState<number>(0);
    const [enduranceTotalDice, setEnduranceTotalDice] = useState<number>(0);
    const [rollingEndurance, setRollingEndurance] = useState<boolean>(false);

    const [habileteTotal, setHabileteTotal] = useState<number>(0);
    const [habileteTotalDice, setHabileteTotalDice] = useState<number>(0);
    const [rollinghabilete, setRollinghabilete] = useState<boolean>(false);

    const [chanceTotal, setChanceTotal] = useState<number>(0);
    const [chanceTotalDice, setChanceTotalDice] = useState<number>(0);
    const [rollingChance, setRollingChance] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const [rollingOne, setRollingOne] = useState(false);
    const [rollingTwo, setRollingTwo] = useState(false);
    const [rollingThree, setRollingThree] = useState(false);

    const [allRolling, setAllRolling] = useState<boolean>(true);

    // Fonction de rappel pour recevoir les valeurs de total et totalDice
    const handleEnduranceTotalChange = async (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        // Mettre à jour l'état
        setEnduranceTotal(total);
        setEnduranceTotalDice(totalDice);
        setRollingEndurance(rolling);
    };

    const handleHabileteTotalChange = (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        // Mettre à jour l'état
        setHabileteTotal(total);
        setHabileteTotalDice(totalDice);
        setRollinghabilete(rolling);
    };

    const handleChanceTotalChange = (
        total: number,
        totalDice: number,
        rolling: boolean
    ) => {
        // Mettre à jour l'état
        setChanceTotal(total);
        setChanceTotalDice(totalDice);
        setRollingChance(rolling);
    };

    const handleNameChange = () => {
        let name = document.getElementById("name") as HTMLInputElement;
        setName(name.value);
    };

    useEffect(() => {
        if (
            rollingChance &&
            rollingEndurance &&
            rollinghabilete &&
            name.length !== 0
        ) {
            setAllRolling(false);
        }
    }, [rollingChance, rollingEndurance, rollinghabilete, name]);

    const navigate = useNavigate();

    const navigateToMainPage = () => {
        navigate("/");
    };

    //@here
    const createCharacter = () => {
        let character: Character = new Character(
            { name }.name,
            { habileteTotal }.habileteTotal,
            { enduranceTotal }.enduranceTotal,
            { chanceTotal }.chanceTotal,
            INITIAL_GOLD_AMOUNT
        );
        localStorage.setItem("character", JSON.stringify(character));
        postCharacter(character);
        navigate("/story-choice/1");
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
                <div className="bg-light-gray/[.8] rounded-3xl w-full flex justify-between items-center py-2 mb-3 h-min">
                    <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                        Endurance
                    </h1>
                    <div className="flex flex-col items-center justify-between h-full w-1/3">
                        {/* @here */}
                        <Dice
                            rolling={rollingOne}
                            onRollingChange={setRollingOne}
                            numberOfDice={2}
                            adjustScore={12}
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
                            {enduranceTotalDice} + 12
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
                            numberOfDice={1}
                            adjustScore={6}
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
                            {habileteTotalDice} + 6
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
                            numberOfDice={1}
                            adjustScore={6}
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
                            {chanceTotalDice} + 6
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
