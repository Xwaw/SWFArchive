import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="SWFArchive"
        numberSlots={2}
        slot={{
          1: (
            <Link
              className="text-white text-2xl cursor-pointer no-underline hover:text-red-400"
              to={"/"}
            >
              SWFArchive
            </Link>
          ),
          2: <button onClick={() => navigate("/profile")}>Profile</button>,
        }}
      />
      <div className="flex flex-row gap-50">
        <div className="border-5 border-red-800 rounded-2xl p-5 hover:border-red-600">
          <h1>Go to Profile</h1>
          <button className="p-20" onClick={() => {navigate("/profile")}}>Go to Profile</button>
        </div>
        <div className="border-5 border-red-800 rounded-2xl p-5 hover:border-red-600">
          <h1>Go to Library</h1>
          <button className="p-20" onClick={() => {navigate("/library")}}>Go to Library</button>
        </div>
      </div>
    </div>
  );
}
