import * as React from "react"
import Router from "next/router"
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query"
import NProgress from "nprogress"
import { syncDrupalPreviewRoutes } from "next-drupal"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Playfair_Display, Inter } from "next/font/google"
import Script from "next/script"
import "nprogress/nprogress.css"

// Bootstrap grid + utilities only (no Reboot — preserves Tailwind Preflight)
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "bootstrap/dist/css/bootstrap-utilities.min.css"

import "styles/fonts.css"
import "styles/globals.css"

// Site typography — exactly two webfont families (CLAUDE.md rule)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
})

NProgress.configure({ showSpinner: false })

Router.events.on("routeChangeStart", function (path) {
  syncDrupalPreviewRoutes(path)
  NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }) {
  const queryClientRef = React.useRef<QueryClient | null>(null)
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={`${playfair.variable} ${inter.variable}`}>
          <Component {...pageProps} />
        </div>
        <Analytics />
        <SpeedInsights />
      </Hydrate>

      {/* Google Analytics (GA4 + Google Ads) — non-blocking, afterInteractive */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-0H44Y5TX5Q"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0H44Y5TX5Q');
          gtag('config', 'G-RZ48JCVXWJ');
          gtag('config', 'AW-859648231');
        `}
      </Script>
    </QueryClientProvider>
  )
}
