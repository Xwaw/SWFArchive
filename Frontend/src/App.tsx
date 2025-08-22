import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();

    return (
      <div className="bg-gray-900 text-white">
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white">
          <div>
            <p>
              MAIN
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => { navigate("/register")}}> Register </button>
            <button onClick={() => { navigate("/login")}}> Login </button>
          </div>
        </header>
      </div>
    ); 
}
