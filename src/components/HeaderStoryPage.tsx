import React from "react";
import SkillsSection from "./SkillsSection.tsx";

const HeaderStoryPage = () => {
    return (
        <div className="w-full flex justify-between font-Inter text-xl mb-10">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                Retour au menu
            </button>
            <div className="w-2/5">
                <SkillsSection />
            </div>
        </div>
    );
};

export default HeaderStoryPage;
