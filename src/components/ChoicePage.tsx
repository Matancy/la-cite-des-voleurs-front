import React from 'react';
import SkillsSection from './SkillsSection.tsx';

const Title = () => {
    
    return (
        <div className="flex flex-col h-screen gradient font-Inter text-xl">
            <div className="p-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Retour au menu
                </button>
            </div>
            <SkillsSection/>
        </div>
    );
};

export default Title;
