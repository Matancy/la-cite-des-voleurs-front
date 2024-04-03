import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
    const navigate = useNavigate();

    const navigateTo = (page: string) => {
        navigate(page);
    }

    const userName = localStorage.getItem("userName");

    return (
        <div className="flex flex-col h-screen background-main-page font-Inter text-xl">
            <div className="m-auto">
                <h1 className="text-center mb-8 font-GrenzeGotisch text-8xl border-solid text-white text-stroke-2px">
                    La Cité des Voleurs
                </h1>
                <div className="bg-light-gray/[.8] rounded-3xl flex flex-col items-center justify-between p-8">
                    <div className="flex flex-col items-center mb-10">
                        <h2 className="mb-2 text-5xl text-white text-stroke-1px">
                            Nouvelle partie
                        </h2>
                        <p className="text-white text-stroke-1px text-2xl">
                            {userName ? `Bienvenue ${userName} !` : ""}
                        </p>
                    </div>
                    {/* TODO : Ajouter l'URL de redirection pour démarer si le username est existant */}
                    <button onClick={!userName ? () => navigateTo("/character-creation") : () => navigateTo("/")} className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg px-3 py-1 mb-3 border-solid border-2 border-black">
                        <p>Démarrer</p>
                    </button>
                    {userName ?
                        <button onClick={() => navigateTo("/character-creation")} className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg px-3 py-1 border-solid border-2 border-black">
                            <p>Changer de joueur</p>
                        </button>
                        : null}
                </div>
                <button onClick={() => navigateTo("/rules")} className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg mt-3 py-1 w-full border-solid border-2 border-black">
                    <p>Règles</p>
                </button>
            </div>
            <nav>
                <ul className="text-white">
                    <li onClick={() => navigateTo("/")}>Accueil</li>
                    <li onClick={() => navigateTo("/character-creation")}>
                        Création de personnage
                    </li>
                    <li onClick={() => navigateTo("/story-choice")}>
                        Choix de l'histoire
                    </li>
                    <li onClick={() => navigateTo("/story-fight")}>
                        Combat d'histoire
                    </li>
                    <li onClick={() => navigateTo("/story-luck")}>
                        Chance de l'histoire
                    </li>
                </ul>
            </nav>
        </div>

    )
};