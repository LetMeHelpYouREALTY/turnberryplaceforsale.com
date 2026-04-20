import NextDocument, { Html, Main, NextScript, Head } from "next/document"
import {
  TURNBERRY_GEO_POSITION_META,
  TURNBERRY_ICBM_META,
} from "lib/schema/geo"

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="apple-touch-icon" href="/images/turnberry/asset-19.jpg" />
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
          <meta name="geo.region" content="US-NV" />
          <meta name="geo.placename" content="Las Vegas" />
          <meta name="geo.position" content={TURNBERRY_GEO_POSITION_META} />
          <meta name="ICBM" content={TURNBERRY_ICBM_META} />
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
