interface inputProp{
    placeholder?: string,
    onChange?: (e: any) => void,
    value?: string | number | any,
    type: "text" | "password" | "email" | "file",
    required?: boolean
}

export default function InputBox({placeholder, type, onChange, value, required} : inputProp){
    return(
        <div>
            <input
            className="bg-red-600 w-full h-10 text-2xl" 
            type = {type}
            placeholder = {placeholder}
            onChange = {onChange}
            value = {value}
            required = {required}
            />
        </div>
    )
}