import React from 'react';

interface ProgressBarProps {
  bgcolor: string;
  completed: number;
  max: number;
  changeColorBasedOnPercentage: boolean; // Nouveau paramètre booléen
}

const ProgressBar: React.FC<ProgressBarProps> = ({ bgcolor, completed, max, changeColorBasedOnPercentage }) => {
  // Assure que completed ne dépasse pas max
  const actualCompleted = Math.min(completed, max);
  
  const percentage = (actualCompleted / max) * 100;
  let color = bgcolor;

  if (changeColorBasedOnPercentage) { // Vérifiez si le changement de couleur est activé
    if (percentage <= 20) {
      color = "red";
    } else if (percentage <= 50) {
      color = "orange";
    }
  }

  return (
    <div className="h-6 bg-gray-300 rounded-full">
      <div
        className="h-full rounded-full text-right flex items-center justify-end"
        style={{ width: `${percentage}%`, backgroundColor: color }}
      >
        <span className="p-2 text-white">{`${actualCompleted}/${max}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
