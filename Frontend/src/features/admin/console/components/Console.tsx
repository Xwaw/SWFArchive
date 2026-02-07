import { useEffect } from "react";

import PromptInput from "./PromptInput";
import { useConsole } from "../hooks/UseConsole";

export default function Console() {
  const color = "#00ff00";
  const {output, handleCommand} = useConsole();

  useEffect(() => {
    handleCommand(["hello"])
  }, [])

  return (
    <div className="w-full h-11/12 flex flex-col" style={{color: color}}>
      <div className="w-full h-full flex flex-col">
        <div
          className="w-full h-full border-2 flex flex-col justify-end items-end"
          style={{ borderColor: color }}
        >
       
        <div className="w-full h-full break-words bg-transparent resize-none break-all overflow-wrap-anywhere p-2 overflow-y-scroll">
          {output.map((value, index) => (
            <div key={index}>
              <p>
                {value}
              </p>
            </div>
          ))}
        </div>
        </div>
      </div>

      <PromptInput
        onSubmit={(args) => {handleCommand(args)}}
        className="w-full h-1/12 flex items-center p-1"
        color={color}
      ></PromptInput>
    </div>
  );
}
