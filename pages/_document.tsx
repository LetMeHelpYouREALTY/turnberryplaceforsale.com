import NextDocument, { Html, Main, NextScript, Head } from "next/document"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="shortcut icon" type="image/png" href="https://cribflyer-publicsite.s3.amazonaws.com/favicon/256.png" />
          <link rel="apple-touch-icon" href="https://cribflyer-publicsite.s3.amazonaws.com/favicon/256.png" />
          {/* Allow indexing + large image previews (critical for Photos + rich results) */}
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? (
            <meta
              name="google-site-verification"
              content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
            />
          ) : null}
          <meta name="author" content="Dr. Jan Duffy, REALTOR" />
          {/* Google Analytics is now loaded via next/script in pages/_app.tsx
              (strategy="afterInteractive", non-blocking). Legacy UA property removed. */}
        </Head>
        <body data-spy="scroll" data-target=".card-top-nav" data-offset="80">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
