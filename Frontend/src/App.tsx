import { useState } from "react";

export default function App() {

  return (
    <div>
      {(()=>{
        const words = [];
        for(let i = 0; i < 20; i++){
          words.push(
            <p>Its some sort of text to put, please ignore.</p>
          )
        }
        return words;
      })()}
    </div>
  );
}
