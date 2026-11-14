import { useParams } from "react-router-dom";
import ViewGame from "../../features/archive/components/View/ViewGame";
import { useAuth } from "../../features/authorization/hooks/UseAuth";
import NavigationHome from "../home/components/Header/NavigationHome";
import "./archive-game-view.css";

export default function ArchiveGameView() {
  const { id } = useParams();
  const { user } = useAuth();

  return (
    <div className="archive-game-page min-h-screen text-[#f4e9e9] [color-scheme:dark] [font-family:Arial,sans-serif]">
      <div className="archive-game-navigation overflow-x-auto bg-[#161616]">
        <NavigationHome isLogged={!!user} />
      </div>
      <main>
        <ViewGame key={id} gameId={id} />
      </main>
    </div>
  );
}
