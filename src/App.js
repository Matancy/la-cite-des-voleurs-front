import React, { useState } from "react";
import CharacterCreation from "./components/CharacterCreation.tsx";
import MainPage from "./components/MainPage.tsx";
import StoryChoicePage from "./components/StoryChoicePage.tsx";
import StoryFightPage from "./components/StoryFightPage.tsx";
import StoryLuckPage from "./components/StoryLuckPage.tsx";

const App = () => {
    const [currentPage, setCurrentPage] = useState("accueil");

    const renderPage = () => {
        switch (currentPage) {
            case "character-creation":
                return <CharacterCreation />;
            case "story-choice":
                return <StoryChoicePage />;
            case "story-fight":
                return <StoryFightPage />;
            case "story-luck":
                return <StoryLuckPage />;
            case "main-page":
                return <MainPage />;
            default:
                return <MainPage />;
        }
    };

    return (
        <div>
            {renderPage()}
            <nav>
                <ul>
                    <li onClick={() => setCurrentPage("accueil")}>Accueil</li>
                    <li onClick={() => setCurrentPage("character-creation")}>
                        Création de personnage
                    </li>
                    <li onClick={() => setCurrentPage("story-choice")}>
                        Choix de l'histoire
                    </li>
                    <li onClick={() => setCurrentPage("story-fight")}>
                        Combat d'histoire
                    </li>
                    <li onClick={() => setCurrentPage("story-luck")}>
                        Chance de l'histoire
                    </li>
                </ul>
            </nav>
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
        </div>
    );
};

// const App = () => {
//     return (
//         <StoryLuckPage/>
//     )
// }

export default App;
