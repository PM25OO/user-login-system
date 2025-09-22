import { BrowserRouter, Route, Routes, Navigate} from "react-router";
import ReactDOM from 'react-dom/client';
import App from './pages/App.tsx'
import HomePage from './pages/Home.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<App />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
)
