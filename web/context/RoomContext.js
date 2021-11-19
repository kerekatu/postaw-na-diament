import { createContext, useMemo, useState } from 'react'

export const RoomContext = createContext()

const RoomContextProvider = ({ children }) => {
  const [roomPlayers, setRoomPlayers] = useState([])

  const data = useMemo(
    () => ({
      roomPlayers,
      setRoomPlayers,
    }),
    [roomPlayers]
  )

  return <RoomContext.Provider value={data}>{children}</RoomContext.Provider>
}

export default RoomContextProvider
