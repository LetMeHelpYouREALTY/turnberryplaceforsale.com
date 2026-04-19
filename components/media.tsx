// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import { DrupalMedia } from "next-drupal"

import { MediaImage } from "components/media--image"

const mediaTypes = {
  "media--image": MediaImage,
}

export interface MediaProps {
  media: DrupalMedia
}

export function Media({ media, ...props }: MediaProps) {
  if (!media) {
    return null
  }

  const Component = mediaTypes[media.type]

  if (!Component) {
    return null
  }

  return <Component media={media} {...props} />
}
