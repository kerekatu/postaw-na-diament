import { playerDataState } from '@/libsatoms'
import { socket } from '@/libsweb-sockets'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

const GameLobby = () => {
  const [playerList, setPlayerList] = useState([])
  const playerData = useRecoilValue(playerDataState)
  const router = useRouter()

  useEffect(() => {
    if (!playerData.length > 0) {
      router.push('/')
    }
  }, [playerData, router])

  useEffect(() => {
    const getPlayers = () =>
      socket.on('roomInfo', (data) => {
        setPlayerList(data.players)
      })

    return () => getPlayers()
  }, [playerList])

  return (
    <div>
      {playerList?.map((item, index) => (
        <li key={index}>{item.username}</li>
      ))}
    </div>
  )
}

export default GameLobby
