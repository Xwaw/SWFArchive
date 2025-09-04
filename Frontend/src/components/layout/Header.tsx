import { type ReactNode } from "react";

interface HeaderProporties {
  title: string;
  numberSlots: number;
  slot?: {[key: number]: ReactNode};
}

export default function Header( { title, numberSlots, slot = {}} : HeaderProporties) {  
    const flexSlots = Array.from({length : numberSlots}, (_, i) => (
      <div key={i} className="flex items-center gap-2 p-2 text-white">
        {slot[i + 1]}
      </div>
    ));
  
    return (
      <div>
        <title>{title}</title>
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-2 bg-red-800 text-white" title="">
          {flexSlots}
        </header>
      </div>
    ); 
}