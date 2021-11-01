import { SWRConfig } from 'swr'
import { RecoilRoot } from 'recoil'
import '../styles/globals.css'

const SWR_OPTIONS = {
  fetcher: (...args) => fetch(...args).then((res) => res.json()),
}

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig value={SWR_OPTIONS}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SWRConfig>
  )
}

export default MyApp
