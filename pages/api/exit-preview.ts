// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import { NextApiResponse } from "next"

export default async function exit(_, response: NextApiResponse) {
  response.clearPreviewData()

  response.writeHead(307, { Location: "/" })
  response.end()
}
