import { Config } from "../../../Config";
import useGameViewLibrary from "../hooks/UseGameViewLibrary";
import type { ViewGameLibraryProps } from "../types/props";
import PlayButton from "./PlayButton";

export default function LibraryGameView({ gameId }: ViewGameLibraryProps) {
  const { isLoading, error, viewGame } = useGameViewLibrary(gameId);

  
  if(isLoading){
    return(
      <div>
        LOADING...
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <div className="relative">
        <div
          className="w-full h-60"
          style={{
            backgroundImage: `url("${Config.API_URL + (viewGame?.thumbnailUrl ?? "")}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        </div>
        <div className="absolute w-30 aspect-square left-10 top-45">
            <PlayButton gameId={viewGame?.id ?? ""}></PlayButton>
        </div>

        <div className="w-full h-1 bg-[#a3a3a3]" />

        <div className="w-full h-full bg-amber-400">

        </div>
      </div>
    </div>
  );
}
