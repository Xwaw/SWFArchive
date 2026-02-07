import { useState } from "react";

export default function UserInfo({info}: {info: string[]}){
    return(
        <div className="w-full h-full">
            {info.map((value, index) => {
                return(
                    <div key={index} className="w-full h-7 flex flex-col justify-center">
                        {value.toString()}
                    </div>
                )
            })}
        </div>
    )
}