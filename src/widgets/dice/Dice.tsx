import React, { useState, useRef, useEffect } from "react";
import "./style.css";

interface DiceRollProps {
    numberOfDice: number;
    adjustScore: number;
    buttonPosition: "top" | "bottom" | "left" | "right";
    isCharacterCreation: boolean;
    rolling?: boolean;
    onRollingChange?: (rolling: boolean) => void;
}

const getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const DiceRoll: React.FC<
    DiceRollProps & {
        onTotalChange: (
            total: number,
            totalDice: number,
            rolling: boolean
        ) => void;
    }
> = ({
    numberOfDice,
    adjustScore,
    buttonPosition,
    onTotalChange,
    isCharacterCreation,
    rolling,
    onRollingChange,
}) => {
        const [diceCount] = useState<number>(numberOfDice);
        const [diceResults, setDiceResults] = useState<number[]>([]);
        const [total, setTotal] = useState<number>(0);
        const [totalDice, setTotalDice] = useState<number>(0);
        const diceRefs = useRef<(HTMLDivElement | null)[]>([]);

        const setRolling = (rolling: boolean) => {
            onRollingChange(rolling);
        }

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

        const enableDice = () => {
            setRolling(false);
        };

        useEffect(() => {
            setTimeout(() => {
                onTotalChange(total, totalDice, rolling);
            }, 3000);
        }, [total, totalDice, rolling]);

        const toggleClasses = (die: HTMLDivElement) => {
            die.classList.toggle("odd-roll");
            die.classList.toggle("even-roll");
        };

        let flexDirection;
        let margin;
        if (buttonPosition === "top") {
            flexDirection = "flex-col-reverse";
            margin = "";
        } else if (buttonPosition === "bottom") {
            flexDirection = "flex-col";
            margin = "";
        } else if (buttonPosition === "left") {
            flexDirection = "flex-row-reverse justify-center";
            margin = "mb-6";
        } else {
            flexDirection = "flex-row justify-center";
            margin = "mb-6";
        }

        return (
            <div className={`dice-container ${flexDirection}`}>
                <div className="dice">
                    {[...Array(diceCount)].map((_, index) => (
                        <div className="die-container" key={index}>
                            <ol
                                className="die-list even-roll"
                                data-roll="1"
                                id={`die-${index + 1}`}
                                ref={(ref) => (diceRefs.current[index] = ref)}
                            >
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
                <button
                    id="roll-button"
                    onClick={rollDice}
                    disabled={rolling}
                    className={`${isCharacterCreation
                            ? "bg-light-gray/[.8] rounded-lg px-3 w-40 border-solid border-2 border-black"
                            : "bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded h-min flex items-center"
                        } ${rolling
                            ? "opacity-50 cursor-not-allowed"
                            : `${isCharacterCreation
                                ? "hover:bg-gray-400"
                                : "hover:bg-light-gray"
                            }`
                        } ${margin} `}
                >
                    <p className={`${rolling ? "cursor-not-allowed" : ""}`}>
                        Lancer dé
                    </p>
                </button>
            </div>
        );
    };

export default DiceRoll;
