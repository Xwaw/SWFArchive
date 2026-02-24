import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollableList from "../../oldComponents/ScrollableList";

export default function Friends() {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="w-screen flex flex-2 justify-center">
        <div className="w-2/5 bg-amber-500 text-2xl">
          <ScrollableList items={[
            {
              id: "friend1",
              imageSrc: "aaa",
              text: "aaa",
              onClick: () => navigate("aa")
            }
          ]} isRightAligned={false} elementsSize={20}></ScrollableList>
        </div>
        
        
        <div className="w-full bg-gray-400">
          <div className="relative h-30 w-full bg-amber-900 flex justify-center items-center">{/*His Banner*/}
            <div className="w-120 h-20 absolute flex justify-center items-center bg-red-600 ">
              <p className="text-3xl">STARYTWOJNAJEBANYSPIPIJANY</p>
            </div>
          </div>
          <div className="w-full flex justify-center bg-green-900 text-2xl">
            <ScrollableList items={[
              {
                id: "friend1",
                imageSrc: "aaa",
                text: "aaa",
                onClick: () => navigate("aa")
              }
            ]} isRightAligned={false} elementsSize={30}></ScrollableList>
          </div>
        </div>
      </div>
    </div>
  );
}
