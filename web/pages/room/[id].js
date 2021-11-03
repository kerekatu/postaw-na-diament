import Game from '@/components/room/Game'
import GameLobby from '@/components/room/GameLobby'
import Layout from '@/components/Layout'

export default function Room() {
  return (
    <Layout>
      <section>
        <GameLobby />
      </section>
    </Layout>
  )
}
