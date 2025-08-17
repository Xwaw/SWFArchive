import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    return (
      <div>
        <button onClick={
          () => {
            navigate("/register")
          }
        }></button>
      </div>
    );
}
