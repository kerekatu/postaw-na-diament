import Game from '@/components/room/Game'
import GameLobby from '@/components/room/GameLobby'
import Layout from '@/components/containers/Layout'

export default function Room() {
  return (
    <Layout>
      <section className="min-w-full min-h-full">
        <GameLobby />
      </section>
    </Layout>
  )
}
