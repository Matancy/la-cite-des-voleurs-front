import React, { useState } from "react";
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
            <p
                className="w-2/3 self-center text-justify"
            >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt temporibus animi adipisci neque molestiae, assumenda sapiente a? Obcaecati, voluptatibus. Ex non amet esse dolorum ab accusantium sequi similique aliquid quaerat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed commodi, dolor aliquid cumque dolorum, obcaecati quis harum esse animi recusandae numquam voluptate et optio excepturi voluptatum dolores. Officiis, temporibus voluptatibus.</p>
        </div>
    );
};

export default Rules;
