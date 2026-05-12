import { useParams } from "react-router-dom";
import CommentSection from "../../features/comments/components/CommentSection"
import ViewGame from "../../features/archive/components/View/ViewGame";

export default function ArchiveGameView() {
  const {id} = useParams();

  return(
    <div className="w-screen h-screen">
      <ViewGame gameId={id}></ViewGame>
      
      <CommentSection targetId={id} targetType={0}></CommentSection>
    </div>
  )
}
