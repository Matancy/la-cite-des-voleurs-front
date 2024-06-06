import React from "react";
import SkillsSection from "../widgets/SkillsSection.tsx";
import { Character } from "../model/Character.ts";
import { useNavigate } from "react-router-dom";


export default function Died() {
    const navigate = useNavigate();


    let json = localStorage.getItem("character");
    let character: Character = Character.fromJson(JSON.parse(json!));

    let way: string = ""

    console.log(character)

    for(let element of character.path){
        console.log(element)
        way += `${element} > `
    }

    return (
        <div className="flex flex-col h-fullscreen background-old-page font-Inter text-xl">
            <div className="m-auto">
                <h1 className="text-center mb-8 font-GrenzeGotisch text-8xl border-solid text-white text-stroke-2px">
                    La Cité des Voleurs
                </h1>
                <div className="rounded-3xl flex flex-col items-center justify-between p-8">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="mb-2 text-5xl text-black p-6">
                            C'est la fin
                        </h2>
                        <SkillsSection/>
                        <div className={`bg-black/[.7] text-xl rounded-2xl p-2 flex flex-col text-white flex justify-between m-6`}>
                            Chemin parcouru: {way.slice(0, -2)}
                        </div>
                        <div className={`bg-black/[.7] text-xl rounded-2xl p-2 flex flex-col text-white flex justify-between m-6`}>
                            Difficulté: {character.difficulty}
                        </div>
                        <button 
                        className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min`}
                        onClick={()=>{
                                localStorage.removeItem("character");
                                localStorage.removeItem("save");
                                navigate("/")
                            }}>
                            Accueil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}