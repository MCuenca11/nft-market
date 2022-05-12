import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { MarketProvider } from '../context/MarketContext'
import { ModalProvider } from 'react-simple-hook-modal'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
    >
      <MarketProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </MarketProvider>
    </MoralisProvider>
  )
}

export default MyApp
