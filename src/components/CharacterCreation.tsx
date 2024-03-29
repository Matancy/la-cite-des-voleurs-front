import React from "react";

// TODO: créer component pour chaque caractéristique du personnage afin d'alléger le code
const CharacterCreation = () => (
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
                    <div className="flex w-2/3 justify-around">
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-1/3"
                        />
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 2"
                            className="w-1/3"
                        />
                    </div>
                    <button className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg py-1 px-3 w-1/2 border-solid border-2 border-black">
                        <p>Lancer dés</p>
                    </button>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-between h-full">
                    <p className="text-white text-stroke-1px text-2xl">Score :</p>
                    <p className="text-2xl text-white text-stroke-1px">
                        X + 12
                    </p>
                    <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                        Total : XX
                    </p>
                </div>
            </div>
            <div className="bg-light-gray/[.6] rounded-3xl w-full h-1/4 flex justify-between items-center py-4">
                <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                    Habileté
                </h1>
                <div className="flex flex-col items-center justify-between h-full w-1/3">
                    <div className="flex w-2/3 justify-around">
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-1/3"
                        />
                    </div>
                    <button className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg py-1 px-3 w-1/2 border-solid border-2 border-black">
                        <p>Lancer dé</p>
                    </button>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-between h-full">
                    <p className="text-white text-stroke-1px text-2xl">Score :</p>
                    <p className="text-2xl text-white text-stroke-1px">
                        X + 6
                    </p>
                    <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                        Total : XX
                    </p>
                </div>
            </div>
            <div className="bg-light-gray/[.6] rounded-3xl w-full h-1/4 flex justify-between items-center py-4">
                <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-4xl w-1/3 text-center">
                    Chance
                </h1>
                <div className="flex flex-col items-center justify-between h-full w-1/3">
                    <div className="flex w-2/3 justify-around">
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-1/3"
                        />
                    </div>
                    <button className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg py-1 px-3 w-1/2 border-solid border-2 border-black">
                        <p>Lancer dé</p>
                    </button>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-between h-full">
                    <p className="text-white text-stroke-1px text-2xl">Score :</p>
                    <p className="text-2xl text-white text-stroke-1px">
                        X + 6
                    </p>
                    <p className="bg-light-gray/[.8] rounded-lg py-1 px-3 border-solid border-2 border-black">
                        Total : XX
                    </p>
                </div>
            </div>
            <button className="bg-dark-brown hover:bg-darker-brown rounded-3xl w-1/3 h-20 self-end border-solid border-black border-4">
                <h2 className="font-GrenzeGotisch text-white text-stroke-2px text-3xl">
                    Commencer l'aventure
                </h2>
            </button>
        </div>
    </div>
);

export default CharacterCreation;
