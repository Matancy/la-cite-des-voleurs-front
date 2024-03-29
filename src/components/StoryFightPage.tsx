import React from "react";
import HeaderStoryPage from "./HeaderStoryPage.tsx";
import ProgressBar from "./progressBar.tsx";

const StoryFightPage = () => {
    return (
        <div className="p-4 font-Inter text-xl flex flex-col gradient text-white">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-4">Cellule 12</h2>
                <p className="mb-6 w-2/3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    nesciunt rem expedita qui! Corrupti reiciendis, non autem,
                    odit excepturi beatae nobis saepe accusantium sapiente, sunt
                    adipisci nemo aliquam itaque. Impedit. Lorem ipsum dolor sit
                    amet consectetur adipisicing elit. Veniam corrupti placeat
                    asperiores sapiente quo eius tenetur blanditiis nihil. Magni
                    dolorum harum, tenetur vel fuga hic dignissimos sint iure
                    quas. Dignissimos.
                </p>
                <div className="w-2/3 flex justify-between items-center mb-6">
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Habileté joueur :</h2>
                        <ProgressBar
                            key={1}
                            bgcolor={"#50C0FF"}
                            completed={30}
                            max={90}
                        />
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min mt-2 w-1/2 self-center">
                            <p>Lancer dés</p>
                        </button>
                    </div>
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Habileté monstre :</h2>
                        <ProgressBar
                            key={1}
                            bgcolor={"#50C0FF"}
                            completed={30}
                            max={90}
                        />
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min mt-2 w-1/2 self-center">
                            <p>Lancer dés</p>
                        </button>
                    </div>
                </div>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                    <p>Aller à 14</p>
                </button>
            </div>
        </div>
    );
};

export default StoryFightPage;
