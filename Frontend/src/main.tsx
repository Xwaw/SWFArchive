import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/App.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard.tsx'
import RegisterUser from './unusedForNow/RegisterUser.tsx'
import LoginUser from './unusedForNow/loginTest.tsx'
import Profile from './account/profile.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/register' element={<RegisterUser/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/login' element={<LoginUser/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
