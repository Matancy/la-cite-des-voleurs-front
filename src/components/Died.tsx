import React from "react";

export default function Died() {
    return (
        <div className="flex flex-col h-screen background-old-page font-Inter text-xl">
            <div className="m-auto">
                <h1 className="text-center mb-8 font-GrenzeGotisch text-8xl border-solid text-white text-stroke-2px">
                    La Cité des Voleurs
                </h1>
                <div className="rounded-3xl flex flex-col items-center justify-between p-8">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="mb-2 text-5xl text-black">
                            Vous êtes mort
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}