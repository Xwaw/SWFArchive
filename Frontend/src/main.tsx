import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import SwfPlayerLayout from './SwfPlayerLayout';
import RegisterUser from './unusedForNow/RegisterUser';
import LoginUser from './unusedForNow/LoginTest';
import Profile from './account/profile';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/play-swf' element={<SwfPlayerLayout/>}></Route>
        <Route path='/register' element={<RegisterUser/>}></Route>
        <Route path='/login' element={<LoginUser/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
