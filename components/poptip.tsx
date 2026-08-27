"use client"

import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"

export default function Poptip({ anchorId, content }: { anchorId: string; content: string }) {
  return <Tooltip anchorSelect={`#${anchorId}`} content={content} place="top" noArrow={false} />
}
