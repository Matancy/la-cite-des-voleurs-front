import React from "react";
import HeaderStoryPage from "./HeaderStoryPage.tsx";

const StoryLuckPage = () => {
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
                <div className="w-2/5 flex justify-between items-center mb-6">
                    <button className="w-1/3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                        <p>Lancer dés</p>
                    </button>
                    <div className="flex justify-between w-1/2">
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-20"
                        />
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-20"
                        />
                        <img
                            src={require("../assets/images/de_temp.jpg")}
                            alt="Dé 1"
                            className="w-20"
                        />
                    </div>
                </div>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                    <p>Aller à 14</p>
                </button>
            </div>
        </div>
    );
};

export default StoryLuckPage;
