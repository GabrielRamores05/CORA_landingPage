import '../styles/base.css'
import '../styles/layout.css'
import '../styles/components.css'
import '../styles/sections.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
