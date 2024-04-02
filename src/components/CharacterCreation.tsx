import React, { useState,useEffect } from 'react';
import Dice from "./dice/Dice.tsx"


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

    const [allRolling,setAllRolling] = useState<boolean>(true);

    
    // Fonction de rappel pour recevoir les valeurs de total et totalDice
    const handleEnduranceTotalChange = (total: number, totalDice: number, rolling: boolean) => {
        // Mettre à jour l'état
        setEnduranceTotal(total);
        setEnduranceTotalDice(totalDice);
        setRollingEndurance(rolling);
    };
    
    const handleHabileteTotalChange = (total: number, totalDice: number, rolling: boolean) => {
        // Mettre à jour l'état
        setHabileteTotal(total);
        setHabileteTotalDice(totalDice);
        setRollinghabilete(rolling)
    };
    
    const handleChanceTotalChange = (total: number, totalDice: number, rolling: boolean) => {
        // Mettre à jour l'état
        setChanceTotal(total);
        setChanceTotalDice(totalDice);
        setRollingChance(rolling);
    };

    useEffect(() => {
        if(rollingChance && rollingEndurance && rollinghabilete){
            setAllRolling(false)
        }
        
    }, [rollingChance,rollingEndurance,rollinghabilete]);


    return (
    <div className="flex justify-center h-screen background-character-creation font-Inter text-xl p-5">
        <div className="flex flex-col items-center justify-between w-2/3 h-full">
            <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl">
                Création personnage
            </h1>
            <div className="bg-light-gray/[.6] rounded-3xl w-full h-1/4 flex justify-between items-center py-4">
                <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                    Endurance
                </h1>
                <div className="flex flex-col items-center justify-between h-full w-1/3">
                    <Dice numberOfDice={2} adjustScore={12} onTotalChange={handleEnduranceTotalChange}/>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-between h-full">
                    <p className="text-white text-stroke-1px text-2xl">Score :</p>
                    <p className="text-2xl text-white text-stroke-1px">
                    {enduranceTotalDice} + 12
                    </p>
                    <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                        Total : {enduranceTotal}
                    </p>
                </div>
            </div>
            <div className="bg-light-gray/[.6] rounded-3xl w-full h-1/4 flex justify-between items-center py-4">
                <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                    Habileté
                </h1>
                <div className="flex flex-col items-center justify-between h-full w-1/3">
                    <Dice numberOfDice={1} adjustScore={6} onTotalChange={handleHabileteTotalChange}/>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-between h-full">
                    <p className="text-white text-stroke-1px text-2xl">Score :</p>
                    <p className="text-2xl text-white text-stroke-1px">
                        {habileteTotalDice} + 6
                    </p>
                    <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                        Total : {habileteTotal}
                    </p>
                </div>
            </div>
            <div className="bg-light-gray/[.6] rounded-3xl w-full h-1/4 flex justify-between items-center py-4">
                <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                    Chance
                </h1>
                <div className="flex flex-col items-center justify-between h-full w-1/3">
                   <Dice numberOfDice={1} adjustScore={6} onTotalChange={handleChanceTotalChange}/>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-between h-full">
                    <p className="text-white text-stroke-1px text-2xl">Score :</p>
                    <p className="text-2xl text-white text-stroke-1px">
                        {chanceTotalDice} + 6
                    </p>
                    <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                        Total : {chanceTotal}
                    </p>
                </div>
            </div>
            <button disabled={allRolling} className={`bg-dark-brown hover:bg-darker-brown rounded-3xl w-1/3 h-20 self-end border-solid border-black border-4 ${allRolling ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <h2 className="font-GrenzeGotisch text-white text-stroke-2px text-3xl">
                    Commencer l'aventure
                </h2>
            </button>
        </div>
    </div>
);
    }
export default CharacterCreation;
