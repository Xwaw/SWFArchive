import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function GoBack(){
    const navigate = useNavigate()

    useEffect(() => {
        if(window.history.length > 1) navigate(-1);
        else navigate("/")
    }, [])

    return null;
}