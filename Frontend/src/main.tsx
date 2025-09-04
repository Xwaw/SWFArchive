import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Profile from "./layouts/Profile";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import SwfLibrary from "./layouts/Library";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/profile/login" element={<Login/>}></Route>
        <Route path="/profile/register" element={<Register/>}></Route>
        <Route path="/library" element={<SwfLibrary/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
