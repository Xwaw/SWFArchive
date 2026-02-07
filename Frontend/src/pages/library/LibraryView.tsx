import { Link } from "react-router-dom";
import ScrollableList from "../../components/ScrollableList";

interface GameData {
  hoursPlayed: number;
  playingStatus: string;
  addedAt: string;
  lastPlayed?: string | null;
  title: string;
  authorName: string;
  swfUrl: string;
  thumbnailUrl?: string | null;
  description?: string | null;
  modified: string;
}

interface LibraryViewProps {
  selectedGame: GameData | null;
}

const API_URL = import.meta.env.VITE_API_URL;

export default function LibraryGameView({ selectedGame }: LibraryViewProps) {
  return (
    <div className="w-full h-full">
      {/* === RIGHT PANEL: Game view === */}
      <div className="flex-1 bg-black flex flex-col">
        {/* === TOP SECTION (banner, play button, info) === */}
        <div
          className="flex-shrink-0 bg-amber-900 flex flex-col pb-5"
          style={{
            backgroundImage: selectedGame?.thumbnailUrl
              ? `url(${API_URL}${selectedGame.thumbnailUrl})`
              : "none",
          }}
        >
          {/* Game title banner */}
          <div className="relative w-full h-70 flex ">
            <div className="w-full h-20 bg-[#00000088] flex items-center px-5">
              <p className="text-3xl text-white">{selectedGame?.title}</p>
            </div>
          </div>

          {/* Play button pod banerem */}
          <div className="w-full h-20 flex gap-5">
            <Link to={"/play"} state={{ game: selectedGame }}>
              <button className="w-72 h-4/5 bg-lime-600 text-5xl font-bold text-black flex justify-center items-center ml-5 mt-5 hover:bg-lime-500 transition">
                PLAY
              </button>
            </Link>
            <button className="w-30 h-4/5 bg-red-600 text-2xl text-black flex justify-center items-center ml-5 mt-5 hover:bg-red-500 transition">
              Ruffle
            </button>
            <div className="h-4/5 ml-5 mt-5 flex justify-center items-center">
              AS: 3.0
            </div>
            <div className="h-4/5 ml-5 mt-5 flex justify-center items-center">
              <p>TIME: {selectedGame?.hoursPlayed} H</p>
            </div>
            <div className="h-4/5 ml-5 mt-5 flex justify-center items-center">
              <p>Last played: {selectedGame?.lastPlayed}</p>
            </div>
            <div className="h-4/5 ml-5 mt-5 flex justify-center items-center">
              <p>Added: {selectedGame?.addedAt}</p>
            </div>
          </div>
        </div>

        {/* === MAIN SCROLLABLE CONTENT === */}
        <div className="flex-1 flex bg-amber-50 overflow-y-scroll">
          {/* Main game info section */}
          <div className="w-4/5 bg-amber-600 p-5 text-black">
            {/* Example content to show scrolling */}
            There is some info about updates of current .swf FILE
          </div>

          {/* Side info panel */}
          <div className="w-1/5 bg-red-950 text-white justify-center items-start p-5 flex flex-col overflow-y-scroll">
            <p className="text-center w-full">== Friends ==</p>
            <div className="w-full h-full p-2 flex flex-col gap-2">
              {/* Friends who play */}
              <ScrollableList
                items={[
                  {
                    id: 1,
                    imageSrc: "aa",
                    text: "Nickname: Playing",
                    onClick: () => {
                      console.log("game");
                    },
                  },
                ]}
                isRightAligned={false}
                elementsSize={10}
              ></ScrollableList>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
