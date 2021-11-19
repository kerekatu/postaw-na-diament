import { PlayerContext } from '@/context/PlayerContext'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { RoomContext } from '@/context/RoomContext'
import GameSidebar from '@/components/room/GameSidebar'

const GameLobby = () => {
  const { roomPlayers } = useContext(RoomContext)
  const { playerData } = useContext(PlayerContext)
  const router = useRouter()

  useEffect(() => {
    if (!Object.keys(playerData).length > 0) {
      console.log('dupa')
      router.push('/')
    }
  }, [playerData, router])

  return (
    <div className="grid grid-cols-6 gap-24 min-w-full min-h-full">
      <GameSidebar roomPlayers={roomPlayers} player={playerData} />
      <div className="col-span-4 row-span-2 self-center">
        <h2 className="text-4xl dots text-green-500 text-center">
          Zaczekaj aż gra się zacznie
        </h2>
      </div>
    </div>
  )
}

export default GameLobby
