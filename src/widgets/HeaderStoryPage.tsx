import React from "react";
import SkillsSection from "./SkillsSection.tsx";
import backArrowIcon from "../assets/images/back_arrow.png";
import { useNavigate } from "react-router-dom";

const HeaderStoryPage = () => {
    const navigate = useNavigate();

    const navigateToMainPage = () => {
        navigate("/");
    };

    return (
        <div className="w-full flex justify-between font-Inter text-xl mb-10">
            <button
                onClick={navigateToMainPage}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min flex items-center"
            >
                <img src={backArrowIcon} alt="Back" className="w-4 h-4 mr-2" />{" "}
                Retour au menu
            </button>
            <div className="w-2/5">
                <SkillsSection />
            </div>
        </div>
    );
};

export default HeaderStoryPage;
