import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/globals.css'
import { SimplePosApp } from '@/simple-pos'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <SimplePosApp />
      <Toaster position="bottom-right"/>

    </BrowserRouter>

    </Provider>
  </StrictMode>,
)
