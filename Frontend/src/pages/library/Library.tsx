import { useState } from "react";
import ListItems from "../../components/ListItems";
import LibraryGameItem from "../../features/library/components/LibraryGameItem";
import useUserLibrary from "../../features/library/hooks/UseUserLibrary";
import { useParams } from "react-router-dom";
import LibraryGameView from "../../features/library/components/LibraryGameView";
import useOwnership from "../../features/authorization/hooks/UseOwnership";

export default function Library() {
  const { userId } = useParams();
  const { isLoading: isOwnerLoading, error: isOwnerError, isOwner } = useOwnership(userId ?? "");
  const { isLoading: isLibraryLoading, error: isLibraryError, library } = useUserLibrary(userId ?? "");
  const [ selectedGame, setSelectedGame ] = useState<string | null>(null);

  if(!isOwner){
    return(
      <div className="w-full h-full flex justify-center items-center">
        <p>U ARE NOT ALLOWED TO USE THIS LIBRARY</p>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gradient-to-br from-[#2e2e2e] to-[#1b1b1b]">
      <div className="w-1/6">
        <div className="w-full bg-gradient-to-t from-[#391e1e] to-[#691414]">
          <div onClick={() => {setSelectedGame(null)}} className={`w-full bg-red-600 flex items-center justify-center font-bold hover:bg-red-600/75 border-1`}>
            <span>LIBRARY</span>
          </div>
          <div className="w-full h-8 border-2 border-black flex items-center">
            <input type="text" placeholder="search..." />
          </div>
          <div className="flex flex-col">
            <div className="h-screen">
              {isLibraryLoading ? (
                <div>
                  <div>{isLibraryLoading}</div>
                </div>
              ) : isLibraryError ? (
                <div>{isLibraryError}</div>
              ) : (
                <ListItems noItemsMessage={"No games in library"}>
                  {library?.items.map((value) => {
                    return (
                      <div
                        key={value.id}
                        className={`w-full h-full ${selectedGame === value.id ? "bg-black/30" : ""}`}
                      >
                        
                        <LibraryGameItem
                          id={value.id}
                          title={value.title}
                          thumbnail={value.thumbnail ?? ""}
                          onSelect={(id) => {
                            setSelectedGame(id);
                          }}
                        />
                      </div>
                    );
                  })}
                </ListItems>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-5/6 flex justify-center items-center h-full">
        <LibraryGameView gameId={selectedGame ?? ""} />
      </div>
    </div>
  );
}
