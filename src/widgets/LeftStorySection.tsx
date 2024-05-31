import React from "react";
import SkillsSection from "../widgets/SkillsSection.tsx";

const LeftStorySection = ({ imageUrl }) => {
    return (
        <div className="basis-3/12">
            <img
                src={imageUrl}
                alt="Illustration de la situation"
                className="w-full mb-3 rounded-3xl"
            />
            <SkillsSection />
        </div>
    );
};
export default LeftStorySection;