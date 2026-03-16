import { useState } from "react";
import NavBar from "../../components/NavBar";
import ArchiveList from "../../features/archive/components/ArchiveList";
import type { GameCardProps } from "../../features/archive/types/ComponentsProps";

export default function Archive() {
  const [games] = useState<GameCardProps[]>([
    {
      id: "1",
      title: "Gra o widzecie",
      authorName: "FanGay",
      playsCount: 52142,
      starsRated: 2.2,
      thumbnailUrl: "https://placehold.co/300x200",
      uploadedAt: "01.09.1939"
    },
    {
      id: "1",
      title: "Gra o widzecie",
      authorName: "FanGay",
      playsCount: 52142,
      starsRated: 2.2,
      thumbnailUrl: "https://placehold.co/300x200",
      uploadedAt: "01.09.1939"
    },
    {
      id: "1",
      title: "Gra o widzecie",
      authorName: "FanGay",
      playsCount: 52142,
      starsRated: 2.2,
      thumbnailUrl: "https://placehold.co/300x200",
      uploadedAt: "01.09.1939"
    },
    {
      id: "1",
      title: "Gra o widzecie",
      authorName: "FanGay",
      playsCount: 52142,
      starsRated: 2.2,
      thumbnailUrl: "https://placehold.co/300x200",
      uploadedAt: "01.09.1939"
    },
  ]);

  return (
    <div className="w-screen min-h-screen bg-blue-300">
      <NavBar/>

      <div className="w-full flex justify-center bg-blue-300">
        <div className="w-2/3 min-h-screen flex flex-col bg-black">
          <ArchiveList children={games}></ArchiveList>
        </div>
      </div>
    </div>
  );
}
