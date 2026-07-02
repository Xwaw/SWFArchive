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

  if(error){
    return(
      <div>
        {error}
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

        <div className="w-full h-1 bg-[#a3a3a3]"/>

        <div className="w-full h-20 bg-gradient-to-l from-red-800 to-red-950 flex gap-20 items-center justify-center">
          <p className="bg-black/20 p-2" style={{fontSize: 20}}>Title: {viewGame?.title}</p>
          <p className="bg-black/20 p-2" style={{fontSize: 20}}>Hours: {Math.round(viewGame?.hoursPlayed ?? 0.0) / 60}</p>
        </div>
      </div>
    </div>
  );
}
