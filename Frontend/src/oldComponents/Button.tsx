interface buttonProp{
    label: string,
    onClick?: () => void | null;
    type?: "button" | "submit" | "reset";
}

export default function Button({label, onClick, type = "button"} : buttonProp){
    return(
        <button className="w-40 h-20 bg-gray-900 flex justify-center items-center" type={type} onClick={onClick} >
            {label} 
        </button>
    )
}