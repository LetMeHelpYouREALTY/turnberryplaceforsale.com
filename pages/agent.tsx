import { GetStaticPropsResult } from "next"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { Meta } from "components/meta"
import { JsonLdSchema } from "components/json-ld-schema"
import { BreadcrumbSchema } from "components/breadcrumb-schema"
import { HeroSection } from "components/agent/HeroSection"
import { ServicesSection } from "components/agent/ServicesSection"
import { YourNeighborSection } from "components/agent/YourNeighborSection"
import { TestimonialsSection } from "components/agent/TestimonialsSection"
import { LocationContactSection } from "components/agent/LocationContactSection"
import { CalendlySection } from "components/agent/CalendlySection"
import { NewsletterSection } from "components/agent/NewsletterSection"
import { GBPMapCard } from "components/gbp-map-card"

interface AgentPageProps extends LayoutProps {}

export default function AgentPage({ menus }: AgentPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Dr. Jan Duffy | Your Turnberry Place Neighbor & REALTOR"
        description="Dr. Jan Duffy lives at Turnberry Place and helps buyers and sellers in her community. Your neighbor, your expert. Call (702) 500-1971."
        path="/agent"
      />
      <JsonLdSchema type="agent" />
      <BreadcrumbSchema items={[{ name: 'Agent', url: 'https://www.turnberryplaceforsale.com/agent' }]} />

      <div className="card-content card-agent">
        <HeroSection />
        <ServicesSection />
        <YourNeighborSection />
        <TestimonialsSection />
        <LocationContactSection />
        <GBPMapCard heading="Visit Dr. Jan Duffy at Turnberry Place" />
        <CalendlySection />
        <NewsletterSection />
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AgentPageProps>> {
  return {
    props: {
      menus: await getMenus({} as any),
    },
  }
}
