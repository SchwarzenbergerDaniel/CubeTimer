import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route     path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
