// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import Image, { ImageProps } from "next/image"

import { absoluteURL } from "lib/utils/absolute-url"
import { TURNBERRY_IMAGE_ALT_FALLBACK } from "lib/image-alt"
import { MediaProps } from "components/media"

interface MediaImageProps extends MediaProps, Partial<ImageProps> {}

export function MediaImage({
  media,
  layout = "responsive",
  objectFit,
  width,
  height,
  ...props
}: MediaImageProps) {
  const image = media?.field_media_image

  if (!image) {
    return null
  }

  return (
    <Image
      src={absoluteURL(image.uri.url)}
      layout={layout}
      objectFit={objectFit}
      width={width || image.resourceIdObjMeta.width}
      height={height || image.resourceIdObjMeta.height}
      alt={
        (image.resourceIdObjMeta.alt &&
          String(image.resourceIdObjMeta.alt).trim()) ||
        TURNBERRY_IMAGE_ALT_FALLBACK
      }
      title={image.resourceIdObjMeta.title}
      {...props}
    />
  )
}
