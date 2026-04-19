// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import { GetStaticPropsContext } from "next"
import { DrupalMenuLinkContent } from "next-drupal"
import { drupal } from "lib/drupal"

export async function getMenus(context: GetStaticPropsContext): Promise<{
  main: DrupalMenuLinkContent[]
  footer: DrupalMenuLinkContent[]
}> {
  // Return empty menus if Drupal base URL is not configured
  if (!process.env.NEXT_PUBLIC_DRUPAL_BASE_URL) {
    return {
      main: [],
      footer: [],
    }
  }

  // Try to get menus from Drupal, but handle errors gracefully
  try {
    const { tree: main } = await drupal.getMenu("main", {
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    })
    const { tree: footer } = await drupal.getMenu("footer", {
      locale: context.locale,
      defaultLocale: context.defaultLocale,
    })

    return {
      main,
      footer,
    }
  } catch (error) {
    // If Drupal is not available, return empty menus
    // This allows the build to continue without Drupal
    if (process.env.NODE_ENV === 'development') {
      console.warn("Drupal is not available. Using empty menus.")
    }
    return {
      main: [],
      footer: [],
    }
  }
}
