import React from "react";

const Title = () => (
    <div className="flex flex-col h-screen background-main-page font-Inter text-xl">
        <div className="m-auto">
            <h1 className="text-center mb-8 font-GrenzeGotisch text-8xl border-solid text-white text-stroke-2px">
                La Cité des Voleurs
            </h1>
            <div className="bg-light-gray/[.4] rounded-3xl flex flex-col items-center justify-between p-8">
                <div className="flex flex-col items-center mb-10">
                    <h2 className="mb-2 text-5xl text-white text-stroke-1px">
                        Nouvelle partie
                    </h2>
                    <p className="text-white text-stroke-1px">Jean-Michel</p>
                </div>
                <button className="bg-light-gray/[.6] hover:bg-light-gray rounded-lg px-3 py-1">
                    <p>Changer joueur</p>
                </button>
            </div>
            <button className="bg-light-gray/[.6] hover:bg-light-gray rounded-lg mt-3 py-1 w-full">
                <p>Règles</p>
            </button>
        </div>
    </div>
);

export default Title;
