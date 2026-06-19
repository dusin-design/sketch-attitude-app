import { createContext, useContext, useState } from 'react'

// Lar en side (f.eks. en fullskjerms tegne-sesjon) be appen skjule sin egen
// bunnmeny mens den er aktiv, uten å måtte endre rute eller bruke nettleserens
// Fullscreen API (som er upålitelig på iPhone Safari).
const UIChromeContext = createContext({ immersive: false, setImmersive: () => {} })

export function UIChromeProvider({ children }) {
  const [immersive, setImmersive] = useState(false)
  return (
    <UIChromeContext.Provider value={{ immersive, setImmersive }}>
      {children}
    </UIChromeContext.Provider>
  )
}

export function useUIChrome() {
  return useContext(UIChromeContext)
}
