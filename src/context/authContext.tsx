import { createContext, ReactNode, useState } from 'react';


interface I_AuthContextTypes {
  userName: string,
  userId: string,
  handleSetUser({ name, id }: { name: string, id: string }): void,
  handleExitUser(): void
  addPermissions(permis: any[]): void
}

interface AuthProviderProps {
  children: ReactNode
}
export const AuthContext = createContext({} as I_AuthContextTypes)


export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({
    userName: '',
    userId: ''
  })

  const [permis, setPermis] = useState<any[]>()


  function handleSetUser({ name, id }: { name: string, id: string }) {
    setUser({
      userName: name,
      userId: id
    })
  }

  function handleExitUser() {
    setUser({
      userName: '',
      userId: ''
    })
  }

  function addPermissions([]: any) {
    setPermis([])
  }

  return (
    <AuthContext.Provider value={{
      userId: user.userId,
      userName: user.userName,
      handleSetUser,
      handleExitUser,
      addPermissions,
    }}>
      {children}
    </AuthContext.Provider>
  )
}