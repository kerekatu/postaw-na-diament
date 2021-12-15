import Game from '@/components/room/Game'
import Layout from '@/components/containers/Layout'
import GameSidebar from '@/components/room/GameSidebar'
import GameLobby from '@/components/room/GameLobby'
import { socket } from '@/libs/web-sockets'
import useRoomInitialize from '@/hooks/useRoomInitialize'

export default function Room() {
  const { roomPlayers, gameStarted, playerData } = useRoomInitialize()

  const handleStartGame = () => {
    socket.emit('START_GAME', playerData, (response) => {
      if (response?.status === '403') {
        console.log(response.message)
      }
    })
  }

  return (
    <Layout
      customMeta={{
        subtitle: `${
          gameStarted ? '- Gra Rozpoczęta' : '- Poczekalnia w Pokoju'
        }`,
      }}
    >
      <section className="min-w-full min-h-full">
        <div className="grid grid-cols-6 gap-24 min-w-full min-h-full">
          <GameSidebar roomPlayers={roomPlayers} player={playerData} />
          {!gameStarted ? (
            <GameLobby
              handleStartGame={handleStartGame}
              isHost={playerData?.isHost}
            />
          ) : (
            <Game />
          )}
        </div>
      </section>
    </Layout>
  )
}
