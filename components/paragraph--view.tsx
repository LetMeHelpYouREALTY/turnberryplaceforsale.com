// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import { ViewPropertiesListing } from "components/view--properties_listing"

export function ParagraphView({ paragraph, ...props }) {
  if (paragraph.field_view.name === "properties--listing") {
    return <ViewPropertiesListing view={paragraph.field_view} {...props} />
  }

  return null
}
