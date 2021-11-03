import { createContext, useMemo, useState } from 'react'

export const PlayerContext = createContext()

const PlayerContextProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState({})

  const data = useMemo(() => ({ playerData, setPlayerData }), [playerData])

  return (
    <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
  )
}

export default PlayerContextProvider
