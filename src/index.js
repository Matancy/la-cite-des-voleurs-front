import React from "react";
import ReactDOM from 'react-dom/client';
import CharacterCreation from "./components/CharacterCreation.tsx";
import StoryChoicePage from "./components/StoryChoicePage.tsx";
import StoryFightPage from "./components/StoryFightPage.tsx";
import StoryLuckPage from "./components/StoryLuckPage.tsx";
import LoginPage from "./components/LoginPage.tsx";
import RegistrationPage from "./components/RegistrationPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Rules from "./components/Rules.tsx";
import MainPage from "./components/MainPage.tsx";
import './index.css';
import Died from "./components/Died.tsx";

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />}></Route>
                <Route path="/died" element={<Died />}></Route>
                <Route path="/rules" element={<Rules />}></Route>
                <Route path="/character-creation" element={<CharacterCreation />}></Route>
                <Route path="/story-choice/:id" element={<StoryChoicePage />}></Route>
                <Route path="/story-fight/:id" element={<StoryFightPage />}></Route>
                <Route path="/story-luck/:id" element={<StoryLuckPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegistrationPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);