import { useState } from "react";

interface ItemOfList {
  id: number;
  imageSrc?: string;
  text: string;
  onClick: () => void;
}

interface ScrollableListProp {
  items: ItemOfList[];
  isRightAligned: boolean;
  elementsSize: number;
  isOnlyText?: boolean
}

export default function ScrollableList({
  items,
  isRightAligned,
  elementsSize: size,
  isOnlyText = false
}: ScrollableListProp) {
  return (
    <div className="w-full  ">
      <div className="w-full h-screen flex flex-col overflow-y-scroll">
        {items.map((value, index) => {
          return (
            <div
              className={`bg-amber-500 w-full h-${size} shrink-0 flex `}
              onClick={value.onClick}
              key={index}
            >
              {/* element of list */}
              <div
                className={`bg-red-900 w-full flex ${
                  isRightAligned ? "flex-row-reverse" : "flex-row"
                } hover:bg-red-600`}
              >
                {/* is true "text -> Avatar" : "Avatar <- text" */}
                {isOnlyText ? null : <div className="h-full aspect-square bg-red-400">
                  {/* avatar */}
                  <img src={value.imageSrc} alt={value.id.toString()} />
                </div>}
                
                <div className="flex items-center h-full">
                  {/* text */}
                  <p>{value.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
