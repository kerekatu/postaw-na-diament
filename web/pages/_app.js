import { SWRConfig } from 'swr'
import PlayerContextProvider from '@/context/PlayerContext'
import '../styles/globals.css'
import RoomContextProvider from '@/context/RoomContext'

const SWR_OPTIONS = {
  fetcher: (...args) => fetch(...args).then((res) => res.json()),
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={SWR_OPTIONS}>
      <PlayerContextProvider>
        <RoomContextProvider>
          <Component {...pageProps} />
        </RoomContextProvider>
      </PlayerContextProvider>
    </SWRConfig>
  )
}

export default MyApp
