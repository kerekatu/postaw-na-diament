import { useContext, useEffect, useState } from 'react'
import { RoomContext } from '@/context/RoomContext'
import { PlayerContext } from '@/context/PlayerContext'
import { useRouter } from 'next/router'

import Game from '@/components/room/Game'
import Layout from '@/components/containers/Layout'
import GameSidebar from '@/components/room/GameSidebar'
import GameLobby from '@/components/room/GameLobby'
import { socket } from '@/libsweb-sockets'

export default function Room() {
  const { roomPlayers } = useContext(RoomContext)
  const { playerData } = useContext(PlayerContext)

  const [gameStarted, setGameStarted] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // send back to homepage if player is not defined
    if (!Object.keys(playerData).length > 0) {
      router.push('/')
    }
  }, [playerData, router])

  const handleStartGame = () => {
    socket.emit('START_GAME', playerData, (response) => {
      if (response?.status === '403') {
        console.log(response.message)
      } else {
        setGameStarted(true)
      }
    })
  }

  return (
    <Layout>
      <section className="min-w-full min-h-full">
        <div className="grid grid-cols-6 gap-24 min-w-full min-h-full">
          <GameSidebar roomPlayers={roomPlayers} player={playerData} />
          {!gameStarted ? (
            <GameLobby handleStartGame={handleStartGame} />
          ) : (
            <Game />
          )}
        </div>
      </section>
    </Layout>
  )
}
