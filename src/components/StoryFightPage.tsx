import React ,{ useState, useEffect} from "react";
import HeaderStoryPage from "../widgets/HeaderStoryPage.tsx";
import ProgressBar from "../widgets/progressBar.tsx";
import storyData from "../assets/temp/fight.json";
import Dice from "../widgets/dice/Dice.tsx";
import { useParams } from "react-router-dom";

const StoryFightPage = () => {
    let user: Character = JSON.parse(localStorage.getItem("character")); 

    const { id, text, imageURL, idOfNextNode, foeStamina } = storyData;
    const [nextStep, setNextStep] = useState<boolean>(true);
    const [playerAttack, setPlayerAttack] = useState<number>(0);
    const [monsterAttack, setMonsterAttack] = useState<number>(0);
    const [playerLife, setPlayerLife] = useState<number>(user.stamina);
    const [monsterLife, setMonsterLife] = useState<number>(parseInt(foeStamina));

    

    const params = useParams();
    const idP = params.id;

    const handlePlayerHability = (total: number, totalDice: number, rolling: boolean) => {
        setPlayerAttack(total);
    };

    const handleMonsterHability = (total: number, totalDice: number, rolling: boolean) => {
        setMonsterAttack(total);
    };

    useEffect(() => {
        if(playerAttack>0 && monsterAttack>0){
            if (playerAttack>monsterAttack) {
                setMonsterLife(monsterLife-2)
                setMonsterAttack(0);
                setPlayerAttack(0);
                console.log(monsterAttack, playerAttack)
                if(monsterLife > 0){
                    //dégriser le button dans diceRoll 
                }
            }
            else if (playerAttack<monsterAttack) {
                setPlayerLife(playerLife-2)
                setMonsterAttack(0);
                setPlayerAttack(0);
                console.log(monsterAttack, playerAttack)
                if(playerLife> 0){
                    //dégriser le button dans diceRoll 
                }
            }
            else{
                setMonsterAttack(0);
                setPlayerAttack(0);
                console.log(monsterAttack, playerAttack)
                //dégriser le button dans diceRoll 
            }
        }
      }, [playerAttack,monsterAttack]);

    return (
        <div className="p-4 font-Inter text-xl flex flex-col background-old-page overflow-auto">
            <HeaderStoryPage />
            <div className="text-center flex flex-col items-center">
                <h2 className="font-bold text-5xl mb-4 font-GrenzeGotisch text-white text-stroke-2px">
                    Cellule {idP}
                </h2>
                <img
                    src={imageURL}
                    alt="Illustration de la situation"
                    className="w-2/5 mb-3 rounded-3xl"
                />
                <div
                    className="mb-6 w-2/3"
                    dangerouslySetInnerHTML={{ __html: text }}
                />
                <div className="w-2/3 flex justify-between items-center mb-6">
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Endurance joueur :</h2>
                        <div className="mb-4">
                            <ProgressBar
                                key={1}
                                bgcolor={"#67BF48"}
                                completed={playerLife}
                                max={user.stamina}
                                changeColorBasedOnPercentage={true}
                            />
                        </div>
                        <Dice
                            numberOfDice={2}
                            adjustScore={6}
                            onTotalChange={handlePlayerHability}
                            buttonPosition="left"
                            isCharacterCreation={false}
                        />
                    </div>
                    <div className="flex flex-col w-2/5">
                        <h2 className="mb-2">Endurance monstre :</h2>
                        <div className="mb-4">
                            <ProgressBar
                                key={1}
                                bgcolor={"#67BF48"}
                                completed={monsterLife}
                                max={Number(foeStamina)}
                                changeColorBasedOnPercentage={true}
                            />
                        </div>
                        <Dice
                            numberOfDice={2}
                            adjustScore={6}
                            onTotalChange={handleMonsterHability}
                            buttonPosition="right"
                            isCharacterCreation={false}
                        />
                    </div>
                </div>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded h-min">
                    <p>Aller à {idOfNextNode}</p>
                </button>
            </div>
        </div>
    );
};

export default StoryFightPage;
