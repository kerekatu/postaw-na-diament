import JoinRoom from '@/components/JoinRoom'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <section className="h-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <JoinRoom />
      </section>
    </Layout>
  )
}
