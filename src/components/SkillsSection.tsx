import React from 'react';
import ProgressBar from "./progressBar.tsx";

const SkillsSection = () => {
    return (
        <div className="p-4 flex flex-col"> {/* Utilisation d'une disposition en colonne */}
            <div className="mb-2 flex items-center">
                <div className="w-32 mr-2"> {/* Utilisation d'une largeur fixe pour les libellés */}
                    <span className="text-white">Habileté :</span>
                </div>
                <div style={{ width: '80%' }}> {/* Largeur de la barre de progression */}
                    <ProgressBar key={1} bgcolor={"#50C0FF"} completed={30} max={90} />
                </div>
            </div>
            <div className="mb-2 flex items-center">
                <div className="w-32 mr-2"> {/* Utilisation d'une largeur fixe pour les libellés */}
                    <span className="text-white">Endurance :</span>
                </div>
                <div style={{ width: '80%' }}> {/* Largeur de la barre de progression */}
                    <ProgressBar key={2} bgcolor={"#67BF48"} completed={70} max={100} />
                </div>
            </div>
            <div className="mb-2 flex items-center">
                <div className="w-32 mr-2"> {/* Utilisation d'une largeur fixe pour les libellés */}
                    <span className="text-white">Chance :</span>
                </div>
                <div style={{ width: '80%' }}> {/* Largeur de la barre de progression */}
                    <ProgressBar key={3} bgcolor={"#DCD304"} completed={50} max={50}/>
                </div>
            </div>
        </div>
    );
};

export default SkillsSection;
