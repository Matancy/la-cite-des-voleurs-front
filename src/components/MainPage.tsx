import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Character } from "../model/Character";
import { User } from "../model/User";
import accountImage from "../assets/images/account.png";
import disconnectImage from "../assets/images/disconnect.png";

export default function MainPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const json = localStorage.getItem("user");
        if (json) {
            setIsLoggedIn(true);
        }
    }, []);

    const navigateTo = (page: string) => {
        navigate(page);
    };

    let json = localStorage.getItem("character");
    let user: Character | null = null;
    if (json === null) {
        user = null;
    } else {
        user = JSON.parse(json!);
    }

    json = localStorage.getItem("user");
    let userAccount: User | null = null;
    if (json === null) {
        userAccount = null;
    } else {
        userAccount = JSON.parse(json!);
    }

    const navigateToLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    return (
        <div className="flex flex-col h-screen background-main-page font-Inter text-xl">
            {!isLoggedIn && (
                <div className="w-full flex justify-end items-center px-2 py-2">
                    <p className="mr-4 text-white">Vous êtes déconnecté</p>
                    <button
                        className="bg-light-gray/[.8] hover:bg-light-gray p-3 rounded-2xl w-14 h-14"
                        onClick={navigateToLogin}
                    >
                        <img src={accountImage} alt="Compte" className="" />
                    </button>
                </div>
            )}
            {isLoggedIn && (
                <div className="w-full flex justify-end items-center px-2 py-2">
                    <p className="mr-4 text-white">Bonjour {userAccount.id}</p>
                    <button
                        className="bg-light-gray/[.8] hover:bg-light-gray p-3 rounded-2xl w-14 h-14"
                        onClick={handleLogout}
                    >
                        <img
                            src={disconnectImage}
                            alt="Déconnexion"
                            className=""
                        />
                    </button>
                </div>
            )}
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
                            {user && user.name
                                ? `Bienvenue ${user.name} !`
                                : ""}
                        </p>
                    </div>
                    {/* @here bonus : vérifie si un personnage est déjà dans le cache ou non, et modifie les actions en conséquences */}
                    <button
                        onClick={
                            !user || !user.name
                                ? () => navigateTo("/character-creation")
                                : () => navigateTo("/story-choice/1")
                        }
                        className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg px-3 py-1 mb-3 border-solid border-2 border-black"
                    >
                        <p>Démarrer</p>
                    </button>
                    {user && user.name ? (
                        <button
                            onClick={() => navigateTo("/character-creation")}
                            className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg px-3 py-1 border-solid border-2 border-black"
                        >
                            <p>Changer de joueur</p>
                        </button>
                    ) : null}
                </div>
                <button
                    onClick={() => navigateTo("/rules")}
                    className="bg-light-gray/[.8] hover:bg-light-gray rounded-lg mt-3 py-1 w-full border-solid border-2 border-black"
                >
                    <p>Règles</p>
                </button>
            </div>
        </div>
    );
}
