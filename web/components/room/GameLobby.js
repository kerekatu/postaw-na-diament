import { socket } from '@/libs/web-sockets'
import { PlayerContext } from '@/context/PlayerContext'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const GameLobby = () => {
  const [playerList, setPlayerList] = useState([])
  const { playerData } = useContext(PlayerContext)
  const router = useRouter()

  useEffect(() => {
    socket.on('roomInfo', (data) => {
      setPlayerList(data.players)
    })

    return () => socket.off('roomInfo')
  }, [])

  useEffect(() => {
    if (!Object.keys(playerData).length > 0) {
      router.push('/')
    }
  }, [playerData, router])

  return (
    <div>
      {playerList.length > 0 &&
        playerList?.map((item, index) => <li key={index}>{item.username}</li>)}
    </div>
  )
}

export default GameLobby
