import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ProConfigProvider } from '@ant-design/pro-components'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProConfigProvider>
      <App />
    </ProConfigProvider>
  </StrictMode>,
)
