import { useEffect, useState, type ReactNode } from "react";
import ListItems from "../../components/ListItems";
import LibraryGameItem from "../../features/library/components/LibraryGameItem";

export default function Library() {
  const [items, setItems] = useState<ReactNode[] | null>(null)

  

  useEffect(() => {
    setItems([<div>
      <LibraryGameItem id={""} title={"Super Crazy maniac Deluxe 3"} />
    </div>])
  }, [])

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-gradient-to-br from-[#2e2e2e] to-[#1b1b1b]">
      <div className="w-1/6">
        <div className="w-full bg-gradient-to-t from-[#391e1e] to-[#691414]">
          <p className="w-full bg-red-600 flex items-center justify-center font-bold"> LIBRARY </p>
          <div className="flex flex-col">
            <div className="h-screen">
              <ListItems noItemsMessage={"No games in library"}>
                {items}
              </ListItems>
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
