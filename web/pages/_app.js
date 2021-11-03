import { SWRConfig } from 'swr'
import PlayerContextProvider from '@/context/PlayerContext'
import '../styles/globals.css'

const SWR_OPTIONS = {
  fetcher: (...args) => fetch(...args).then((res) => res.json()),
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={SWR_OPTIONS}>
      <PlayerContextProvider>
        <Component {...pageProps} />
      </PlayerContextProvider>
    </SWRConfig>
  )
}

export default MyApp
