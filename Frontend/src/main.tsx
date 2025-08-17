import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HelloPage from './HelloPage.tsx'
import RegisterUser from './RegisterUser.tsx'
import LoginUser from './loginTest.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}></Route>
        <Route path='/register' element={<RegisterUser/>}></Route>
        <Route path='/hello' element={<HelloPage/>}></Route>
        <Route path='/login' element={<LoginUser/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
