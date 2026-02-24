import { useEffect, useState } from "react";
import ScrollableList from "../../oldComponents/ScrollableList";
import axios from "axios";
import LibraryGameView from "./LibraryView";

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

const API_URL = import.meta.env.VITE_API_URL;

export default function Library() {
  const [library, setLibrary] = useState<GameData[] | null>();
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null);

  const loadLibrary = async () => {
    try {
      const response = await axios.get(`${API_URL}/library/all`, {
        withCredentials: true,
      });
      const data = response.data;
      setLibrary(data);

      console.log(data);
    } catch (error) {
      console.log(error);
      setLibrary(null);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, [])

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      {/* === LEFT PANEL: Game library list === */}{" "}
      {/* layout for games for not user own games */}
      <div className="w-1/7 bg-gray-800 overflow-y-scroll">
        <div className="flex flex-col">
          {/* Example game in the list */}
          <ScrollableList
            items={(library ?? []).map((value, index) => ({
              id: index,
              imageSrc: value.thumbnailUrl ? `${API_URL}${value.thumbnailUrl}` : undefined,
              text: value.title,
              onClick: () => {setSelectedGame(value)},
            }))}
            isRightAligned={false}
            elementsSize={10}
          ></ScrollableList>
        </div>
      </div>

      <LibraryGameView selectedGame={selectedGame}></LibraryGameView>
    </div>
  );
}
