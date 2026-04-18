import { GetStaticPropsResult } from "next"

import { Layout, LayoutProps } from "components/layout"
import { Meta } from "components/meta"
import { getMenus } from "lib/get-menus"
import { BUILD_DATE_DISPLAY } from "lib/build-date"

interface AccessibilityPageProps extends LayoutProps {}

export default function AccessibilityPage({ menus }: AccessibilityPageProps) {
  return (
    <Layout menus={menus}>
      <Meta
        title="Accessibility Statement | Turnberry Place Las Vegas"
        description="Accessibility statement for TurnberryPlaceForSale.com. Need help? Call (702) 500-1971."
        path="/accessibility"
      />

      <div className="card-content">
        <div className="container py-5 prose-page">
          <h1>Accessibility Statement</h1>
          <p className="mt-3">
            TurnberryPlaceForSale.com is committed to providing a website that is accessible
            to the widest possible audience, regardless of technology or ability. We aim to
            conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
          </p>

          <h2 className="mt-4">Measures to Support Accessibility</h2>
          <ul className="mt-2">
            <li>We use semantic HTML and accessible navigation patterns.</li>
            <li>Images include descriptive alternative text where appropriate.</li>
            <li>Interactive elements are designed to be keyboard accessible.</li>
            <li>We support reduced-motion preferences where possible.</li>
          </ul>

          <h2 className="mt-4">Feedback</h2>
          <p className="mt-2">
            If you experience any difficulty accessing content on this website, please let us
            know and we will work to provide the information you need.
          </p>
          <p className="mt-2">
            <strong>Phone:</strong>{" "}
            <a href="tel:+17025001971">(702) 500-1971</a>
            <br />
            <strong>Email:</strong>{" "}
            <a href="mailto:DrDuffy@TurnberryPlaceForSale.com">DrDuffy@TurnberryPlaceForSale.com</a>
          </p>

          <p className="mt-4 text-muted">
            <small>
              Last updated: {BUILD_DATE_DISPLAY}
            </small>
          </p>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<AccessibilityPageProps>> {
  try {
    return {
      props: {
        menus: await getMenus({} as any),
      },
    }
  } catch {
    return {
      props: {
        menus: { main: [], footer: [] },
      },
    }
  }
}

