// @ts-nocheck
// FIXME(strict-mode): legacy Drupal integration code. Re-enable type-checking when migrating away from next-drupal.
import { DrupalNode } from "next-drupal"

import { NodePage } from "components/node--page"
import { NodeArticle } from "components/node--article"
import { NodeLandingPage } from "components/node--landing-page"
import { NodeProperty } from "components/node--property"

const nodeTypes = {
  "node--page": NodePage,
  "node--article": NodeArticle,
  "node--landing_page": NodeLandingPage,
  "node--property_listing": NodeProperty,
}

export interface NodeProps {
  node: DrupalNode
  viewMode?: string
}

export function Node({ node, viewMode = "full", ...props }: NodeProps) {
  if (!node) {
    return null
  }

  const Component = nodeTypes[node.type]

  if (!Component) {
    return null
  }

  return <Component node={node} viewMode={viewMode} {...props} />
}
