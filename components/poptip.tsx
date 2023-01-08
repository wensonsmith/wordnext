'use client'

import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

export default function Poptip({anchorId, content}: any) {
  return <Tooltip anchorId={anchorId} content={content} place="top" noArrow={false}/>
}