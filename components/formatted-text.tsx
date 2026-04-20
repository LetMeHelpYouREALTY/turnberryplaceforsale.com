import Image from "next/image"
import { HTMLReactParserOptions, domToReact } from "html-react-parser"
import { Element } from "domhandler"
import parse from "html-react-parser"

import { isRelative } from "lib/utils/is-relative"
import { TURNBERRY_RICHTEXT_IMAGE_ALT_FALLBACK } from "lib/image-alt"
import Link from "next/link"

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element) {
      if (domNode.name === "img") {
        const { src, alt, width = "100px", height = "100px" } = domNode.attribs
        const altText =
          alt && String(alt).trim()
            ? String(alt).trim()
            : TURNBERRY_RICHTEXT_IMAGE_ALT_FALLBACK

        if (isRelative(src)) {
          // Parse width and height to extract numeric values
          const widthNum = parseInt(width.toString().replace(/px|em|rem/, ""), 10) || 100
          const heightNum = parseInt(height.toString().replace(/px|em|rem/, ""), 10) || 100

          return (
            <Image
              src={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${src}`}
              width={widthNum}
              height={heightNum}
              alt={altText}
              layout="intrinsic"
              objectFit="cover"
            />
          )
        }
      }

      if (domNode.name === "a") {
        const { href, class: className } = domNode.attribs

        if (href && isRelative(href)) {
          return (
            <Link href={href} className={className}>
              {domToReact(domNode.children)}
            </Link>
          )
        }
      }

      if (domNode.name === "input") {
        if (domNode.attribs.value === "") {
          delete domNode.attribs.value
        }

        return domNode
      }
    }
  },
}

interface FormattedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  format?: string
  processed: string
  value?: string
}

export function FormattedText({ processed, ...props }: FormattedTextProps) {
  return (
    <div data-cy="node--body" {...props}>
      {parse(processed, options)}
    </div>
  )
}
