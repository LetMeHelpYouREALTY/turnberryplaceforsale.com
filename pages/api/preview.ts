// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import { drupal } from "lib/drupal"

export default async function (request, response) {
  return drupal.preview(request, response)
}
