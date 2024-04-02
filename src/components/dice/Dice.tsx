import React, { useState, useRef,useEffect } from 'react';
import './style.css';

interface DiceRollProps {
  numberOfDice: number;
  adjustScore: number;
  
}

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DiceRoll: React.FC<DiceRollProps & { onTotalChange: (total: number, totalDice: number, rooling:boolean) => void }> = ({ numberOfDice, adjustScore, onTotalChange }) => {
  const [diceCount] = useState<number>(numberOfDice);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalDice, setTotalDice] = useState<number>(0);
  const [rolling, setRolling] = useState<boolean>(false); 
  const diceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rollDice = () => {
    setRolling(true);
    const results: number[] = [];
    diceRefs.current.forEach((die, index) => {
      if (die) {
        const result = getRandomNumber(1, 6);
        toggleClasses(die);
        die.dataset.roll = String(result);
        results.push(result);
      }
    });
    setDiceResults(results);
    setTotal(results.reduce((acc, curr) => acc + curr, 0) + adjustScore);
    setTotalDice(results.reduce((acc, curr) => acc + curr, 0));
    
  };

  useEffect(() => {
    // Vérifiez ici si les valeurs d'état sont correctement mises à jour
    onTotalChange(total, totalDice,rolling);
}, [total,totalDice,rolling]);

  const toggleClasses = (die: HTMLDivElement) => {
    die.classList.toggle('odd-roll');
    die.classList.toggle('even-roll');
  };


  return (
    <div className="dice-container">
      <div className="dice">
        {[...Array(diceCount)].map((_, index) => (
          <div className="die-container" key={index}>
            <ol className="die-list even-roll" data-roll="1" id={`die-${index + 1}`} ref={ref => (diceRefs.current[index] = ref)}>
              <li className="die-item" data-side="1">
                <span className="dot"></span>
              </li>
              <li className="die-item" data-side="2">
                <span className="dot"></span>
                <span className="dot"></span>
              </li>
              <li className="die-item" data-side="3">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </li>
              <li className="die-item" data-side="4">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </li>
              <li className="die-item" data-side="5">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </li>
              <li className="die-item" data-side="6">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </li>
            </ol>
          </div>
        ))}
      </div>
      <button id="roll-button" onClick={rollDice} disabled={rolling} className={`bg-light-gray/[.8] rounded-lg px-3 w-40 border-solid border-2 border-black ${rolling ? 'opacity-50 cursor-not-allowed' : 'hover:bg-light-gray'}`}>
      <p>Lancer dé</p>
      </button>
    </div>
  );
};

export default DiceRoll;
