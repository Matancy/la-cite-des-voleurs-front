import React from "react";
import backArrowIcon from "../assets/images/back_arrow.png";
import { useNavigate } from "react-router-dom";

const Rules = () => {
    const navigate = useNavigate();

    const navigateToMainPage = () => {
        navigate("/");
    };

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto h-screen">
            <button
                onClick={navigateToMainPage}
                className="bg-light-gray/[.8] hover:bg-light-gray text-gray-800 font-bold py-2 px-4 rounded-xl h-min flex items-center self-start mb-6"
            >
                <img src={backArrowIcon} alt="Back" className="w-4 h-4 mr-2" />{" "}
                Retour au menu
            </button>
            <h1 className="self-center mb-6 font-GrenzeGotisch text-white text-stroke-2px text-6xl">Règles</h1>
            <div className="w-2/3 self-center text-justify">
                <h2 className="text-center font-bold">Les Stats :D</h2>
                <br />
                <p>
                    Pendant cette aventure, les capacités de votre personnage seront définies par ses statistiques que vous obtiendrez par des jets de dés. Je vous conseille de croire en l'âme des dés pour faciliter votre aventure et obtenir le maximum de points dans les 3 stats suivantes :
                </p>
                <br />
                <ul>
                    <li><strong>Habilité</strong>: Représente votre capacité au combat, définie par 1D6 + 6.</li>
                    <li><strong>Endurance</strong>: Représente la vie de votre aventurier, définie par 2D6 + 12.</li>
                    <li><strong>Chance</strong>: Représente votre capacité à vous extirper de situations difficiles, définie par 1D6 + 6.</li>
                </ul>
                <br />
                <p>Mais ne vous inquiétez pas, vous aurez aussi un peu d'argent pour votre aventure qui pourrait être utile dans certaines conditions.</p>
                <br />
                <h2 className="text-center font-bold">Les Combats  &gt;:(</h2>
                <br />
                <p>Parlons peu, parlons bien. Durant votre aventure, vous serez amené à combattre pour votre survie. Cela déclenchera une phase de combat où vous et votre ennemi lancerez 2D6 + votre habileté. Le perdant sera blessé et perdra 2 points d'endurance. Le premier qui réduit l'endurance de l'autre à 0 gagne. Le perdant meurt dans la souffrance et la honte.</p>
                <br />
                <h2 className="text-center font-bold">La Chance ;)</h2>
                <br />
                <p>Dans certaines actions que vous ferez, il faudra croire en l'âme des dés pour continuer en tentant votre chance. Lancez 2D6. Si votre jet est inférieur ou égal à votre chance, bravo, vous êtes quelqu'un de chanceux. Sinon, subissez le sadisme du maître du jeu  &gt;:).</p>
                <br />
                <p>Voilà qui termine les explications, à vous de jouer et bonne chance, vous en aurez besoin...</p>
            </div>
        </div>
    );
};

export default Rules;
