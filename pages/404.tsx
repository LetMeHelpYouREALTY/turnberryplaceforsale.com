import Link from "next/link"
import { Layout, LayoutProps } from "components/layout"
import { getMenus } from "lib/get-menus"
import { GetStaticPropsResult } from "next"

interface Custom404Props extends LayoutProps {}

export default function Custom404({ menus }: Custom404Props) {
  return (
    <Layout menus={menus}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">This page could not be found.</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-center"
          >
            Go Home
          </Link>
          <Link
            href="/towers"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition-colors text-center"
          >
            View Towers
          </Link>
        </div>
        <nav
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 max-w-2xl"
          aria-label="Popular Turnberry Place pages"
        >
          <Link href="/towers" className="text-blue-600 hover:underline">
            Towers
          </Link>
          <Link href="/amenities" className="text-blue-600 hover:underline">
            Amenities
          </Link>
          <Link href="/photos" className="text-blue-600 hover:underline">
            Photos
          </Link>
          <Link href="/floor-plans" className="text-blue-600 hover:underline">
            Floor Plans
          </Link>
          <Link href="/stirling-club" className="text-blue-600 hover:underline">
            Stirling Club
          </Link>
          <Link href="/neighborhood" className="text-blue-600 hover:underline">
            Neighborhood
          </Link>
        </nav>
      </div>
    </Layout>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Custom404Props>> {
  // Handle Drupal connection errors gracefully
  try {
    return {
      props: {
        menus: await getMenus(),
      },
    }
  } catch (error) {
    // If Drupal is not available, return empty menus
    // This allows the build to continue without Drupal
    return {
      props: {
        menus: {
          main: [],
          footer: [],
        },
      },
    }
  }
}
