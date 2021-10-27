import { SWRConfig } from 'swr'
import '../styles/globals.css'

const SWR_OPTIONS = {
  fetcher: (...args) => fetch(...args).then((res) => res.json()),
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={SWR_OPTIONS}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
