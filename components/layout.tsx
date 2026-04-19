import * as React from "react"
import { DrupalMenuLinkContent } from "next-drupal"

import { Navbar } from "components/navbar"
import { Footer } from "components/footer"
import { StickyCTA } from "components/sticky-cta"
import { CalendlyBadge } from "components/calendly-badge"

export interface LayoutProps {
  menus: {
    main: DrupalMenuLinkContent[]
    footer: DrupalMenuLinkContent[]
  }
  children?: React.ReactNode
}

export function Layout({ menus, children }: LayoutProps) {
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
      <StickyCTA />
      <Footer links={menus.footer} />
      <CalendlyBadge />
    </div>
  )
}
