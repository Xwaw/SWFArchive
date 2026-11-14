import ArchiveGamePlayer from "../../../../player/components/ArchiveGamePlayer";

type ArcadeGameScreenProps = {
  gameId: string;
};

export default function ArcadeGameScreen({ gameId }: ArcadeGameScreenProps) {
  return (
    <div
      className="
        absolute z-20
        left-[12.7%] top-[16.5%]
        w-[76%] h-[19%]
        overflow-hidden
        bg-black
      "
    >
      <div className="w-full h-full">
        <ArchiveGamePlayer gameId={gameId} width={800} height={600} />
      </div>
    </div>
  );
}
