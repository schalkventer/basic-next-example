
import { Html, Head, Main, NextScript } from 'next/document'

export const Document = () => {
  return (
    <Html>
      <Head>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document