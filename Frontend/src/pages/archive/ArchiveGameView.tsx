import { useParams } from "react-router-dom";
import CommentSection from "../../features/comments/components/CommentSection";
import ViewGame from "../../features/archive/components/View/ViewGame";

export default function ArchiveGameView() {
  const { id } = useParams();

  return (
    <div className="w-screen min-h-full bg-gray-500">
      <div className="w-full h-full flex justify-center bg-blue-300">
        <div className="w-2/3 flex flex-col p-5 bg-black gap-25">
          <ViewGame gameId={id}></ViewGame>

          <CommentSection targetId={id} targetType={0}></CommentSection>
        </div>
      </div>
    </div>
  );
}
