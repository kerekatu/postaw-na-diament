import Layout from '@/components/containers/Layout'
import CreateRoomForm from '@/components/createRoomForm'

const CreateRoom = () => {
  return (
    <Layout>
      <section className="flex min-w-full items-center justify-center">
        <CreateRoomForm />
      </section>
    </Layout>
  )
}

export default CreateRoom
