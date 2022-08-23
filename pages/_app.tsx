import type { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import Head from 'next/head'

export const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>To-do App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
  

}

export default MyApp
