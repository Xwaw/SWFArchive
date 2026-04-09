import NavBar from "../../components/NavBar";
import ArchiveList from "../../features/archive/components/ArchiveList";
import useArchive from "../../features/archive/hooks/UseArchive";

export default function Archive() {
  const { archive, isLoading, error } = useArchive();

  if (isLoading && !archive) return <div>LOADING...</div>;

  if (error)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p
          style={{
            fontSize: 70,
            color: "red",
          }}
        >
          {error}
        </p>
      </div>
    );

  return (
    <div className="w-screen h-min-screen bg-blue-300">
      <NavBar />

      <div className="w-full h-full flex justify-center bg-blue-300">
        <div className="w-2/3 h-full flex flex-col bg-black">
          {archive ? (
            <div>
              <ArchiveList children={archive?.items!}></ArchiveList>
            </div>
          ) : (
            <div>NO GAMES</div>
          )}
        </div>
      </div>
    </div>
  );
}
