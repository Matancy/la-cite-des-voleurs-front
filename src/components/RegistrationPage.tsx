import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backArrowIcon from "../assets/images/back_arrow.png";
import { postRegister } from "../model/callApi.ts";
import { User } from "../model/User.ts";

const RegistrationPage = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const passwordSize = 4;

    const navigateToMainPage = () => {
        navigate("/");
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };    

    const registerUser = () => {
        if (password.length !== passwordSize) {
            setError("Le mot de passe doit comporter "+passwordSize+" caractères.");
            return;
        }

        let user: User = new User(username, password);
        localStorage.setItem("user", JSON.stringify(user));

        fetch("http://localhost:3200/user/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.status === 400) {
                    setError(
                        "Ce nom d'utilisateur est déjà utilisé"
                    );
                } else if (response.ok) {
                    postRegister(user);
                    navigate("/");
                } else {
                    setError(
                        "Une erreur s'est produite lors de la création de compte"
                    );
                }
            })
            .catch((error) => {
                setError(
                    "Une erreur s'est produite lors de la création de compte"
                );
            });
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col background-character-creation font-Inter text-xl p-2 min-h-screen">
            <div className="w-full flex justify-start p-2">
                <button
                    onClick={navigateToMainPage}
                    className="bg-light-gray/[.8] hover:bg-light-gray text-gray-800 font-bold py-2 px-4 rounded-xl h-min flex items-center self-start mb-6"
                >
                    <img
                        src={backArrowIcon}
                        alt="Back"
                        className="w-4 h-4 mr-2"
                    />{" "}
                    Retour au menu
                </button>
            </div>
            <div className="flex flex-grow items-center justify-center">
                <div className="bg-light-gray/[.8] w-1/3 flex flex-col items-center justify-center p-4 rounded-lg">
                    <h1 className="font-GrenzeGotisch text-white text-stroke-2px text-5xl mb-4">
                        Création de compte
                    </h1>
                    <input
                        id="username"
                        type="text"
                        placeholder="Identifiant"
                        onChange={handleUsernameChange}
                        className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-900 focus:border-orange-900 text-lg w-4/5"
                    />
                    <input
                        id="password"
                        type="password"
                        placeholder={`Mot de passe (au moins ${passwordSize} caractères)`}
                        maxLength={passwordSize}
                        onChange={handlePasswordChange}
                        className="mb-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-900 focus:border-orange-900 text-lg w-4/5"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        onClick={registerUser}
                        disabled={!username || !password}
                        className={`${
                            !username || !password
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-dark-brown hover:bg-darker-brown"
                        } rounded-2xl w-2/5 py-2 border-solid border-black border-2 mt-2`}
                    >
                        <h2 className={`${
                            !username || !password
                                ? "cursor-not-allowed"
                                : ""
                        } font-GrenzeGotisch text-white text-stroke-2px text-2xl`}>
                            Créer un compte
                        </h2>
                    </button>
                    <button
                        onClick={navigateToLogin}
                        className="mt-4 text-orange-900 hover:text-black"
                    >
                        J'ai déjà un compte
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
