import ListItems from "../../components/ListItems";
import LibraryGameItem from "../../features/library/components/LibraryGameItem";
import useUserLibrary from "../../features/library/hooks/UseUserLibrary";
import { useParams } from "react-router-dom";

export default function Library() {
  const { userId } = useParams();
  const { isLoading, error, library } = useUserLibrary(userId ?? "");

  console.log(library)

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gradient-to-br from-[#2e2e2e] to-[#1b1b1b]">
      <div className="w-1/6">
        <div className="w-full bg-gradient-to-t from-[#391e1e] to-[#691414]">
          <p className="w-full bg-red-600 flex items-center justify-center font-bold">
            LIBRARY
          </p>
          <div className="flex flex-col">
            <div className="h-screen">
              {isLoading ? (
                <div>
                  <div>{isLoading}</div>
                </div>
              ) : error ? (
                <div>
                  {error}
                </div>
              ) : (
                <ListItems noItemsMessage={"No games in library"}>
                  {library?.items.map((value, index) => {
                    return (
                      <div key={index} className="w-full h-full">
                        <LibraryGameItem
                          id={value.id}
                          title={value.title}
                          thumbnail={value.thumbnail ?? ""}
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
      <div className="w-5/6 flex justify-center items-center">
        <p>NO GAME SELECTED</p>
      </div>
    </div>
  );
}
