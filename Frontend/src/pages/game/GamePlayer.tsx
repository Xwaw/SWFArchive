import { useParams } from "react-router-dom";
import GameScreen from "../../features/player/components/GameScreen";
import { Config } from "../../Config";
import usePlayerLoad from "../../features/player/hooks/usePlayerLoad";

export default function GamePlayer() {
  const {gameId} = useParams();
  const {isLoading, error, url} = usePlayerLoad(gameId ?? "");
  
  if(isLoading) {
    return(
      <div>
        LOADING...
      </div>
    )
  }

  if(error) {
    return(
      <div>
        {error}
      </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-tl from-[#ffffff] to-[#444242] flex justify-center items-center">
      <div className="flex justify-center items-center shadow-2xl">
        <GameScreen swfUrl={Config.API_URL + url}/>
      </div>
    </div>
  );
}
