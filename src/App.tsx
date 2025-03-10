import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./views/Login";
import { Main } from "./views/Main";
import LogisticMonitoring from "./views/LogisticMonitoring";
import LocalesProvider from "./context/localesState";
import "./styles/global.css";
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/authContext';

export function App() {
  const { userId } = useContext(AuthContext)
  const navigate = useNavigate()

  const cnxLocalStorage = localStorage.getItem("@CNX_MES_PLATFORM_CONFIG");

  if (!cnxLocalStorage) {
    const cnxPlatformConfig = {
      id: '',
      user: '',
      theme: 'dark',
      language: 'pt-br',
      pinnedTab: null
    }
    localStorage.setItem("@CNX_MES_PLATFORM_CONFIG", JSON.stringify(cnxPlatformConfig))
  }

  useEffect(() => {
    if (userId === '') {
      navigate('/login')
    }
  }, [])


  if (!userId) {
    return (
      <LocalesProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </LocalesProvider>
    )
  }
  return (
    <LocalesProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/logisticMonitoring" element={<LogisticMonitoring />} />
      </Routes>
    </LocalesProvider>
  );
}
