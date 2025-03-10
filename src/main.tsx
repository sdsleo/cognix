import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import {
  BrowserRouter
} from "react-router-dom"
import { AuthProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>

)
