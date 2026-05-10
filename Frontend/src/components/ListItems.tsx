import type { ReactNode } from "react";
import React from "react";

interface ListItemProps{
    children?: ReactNode
    noItemsMessage?: string;
}

export default function ListItems({children, noItemsMessage}: ListItemProps){
    if(!children){
        return(
            <div className="flex justify-center items-center h-full" style={{
                fontSize: 30,
                textAlign: "center"
            }}>
                {noItemsMessage ?? "NO ITEMS"}
            </div>
        )
    }

    return(
        <div className="w-full h-full">
            {React.Children.map(children, (child, id) => {
               return(
                <div key={id}>
                    {child}
                </div>
               ) 
            })}
        </div>
    )
}