import * as React from "react"
import { DrupalMenuLinkContent } from "next-drupal"

import { Navbar } from "components/navbar"
import { Footer } from "components/footer"
import { StickyCTA } from "components/sticky-cta"
import { CalendlyBadge } from "components/calendly-badge"
import { JsonLd } from "components/json-ld"
import { GBPMapCard } from "components/gbp-map-card"
import { buildGbpLocalBusinessSchema } from "lib/schema/gbpLocalBusiness"
import { buildOrganizationSchema } from "lib/schema/organization"
import { buildWebSiteSchema } from "lib/schema/webSite"

export interface LayoutProps {
  menus: {
    main: DrupalMenuLinkContent[]
    footer: DrupalMenuLinkContent[]
  }
  children?: React.ReactNode
}

export function Layout({ menus, children }: LayoutProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.turnberryplaceforsale.com"
  const organizationSchema = buildOrganizationSchema({ baseUrl })
  const webSiteSchema = buildWebSiteSchema({ baseUrl })
  const gbpLocalBusinessSchema = buildGbpLocalBusinessSchema(baseUrl)

  React.useEffect(() => {
    // Adjust header margin for fixed navbar and set CSS variable
    const adjustHeaderMargin = () => {
      const nav = document.querySelector('.card-top-nav')
      const header = document.querySelector('.card-top-header')
      if (nav) {
        const navHeight = (nav as HTMLElement).offsetHeight
        document.documentElement.style.setProperty('--navbar-height', `${navHeight}px`)
        
        if (header) {
          ;(header as HTMLElement).style.marginTop = `${navHeight}px`
        }
      }
    }
    
    adjustHeaderMargin()
    window.addEventListener('resize', adjustHeaderMargin)
    return () => window.removeEventListener('resize', adjustHeaderMargin)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar links={menus.main} />
      <main id="main-content" className="flex-1" style={{ paddingTop: 0, marginTop: 0 }}>
        {children}
      </main>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={webSiteSchema} />
      <JsonLd schema={gbpLocalBusinessSchema} />
      <GBPMapCard
        variant="compact"
        heading="Turnberry Place office — map, hours & contact"
        className="border-t border-gray-200"
      />
      <StickyCTA />
      <Footer />
      <CalendlyBadge />
    </div>
  )
}
