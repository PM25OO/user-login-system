import { BrowserRouter, Route, Routes } from "react-router";
import ReactDOM from 'react-dom/client';
import App from './App.tsx'
import HomePage from './Home.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
)
