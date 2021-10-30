import React from 'react'
import { Tag } from 'granen'
import { RadioChecked } from 'css.gg/icons/all'

import { DetailProps } from '../types'

export const Stats = (props: Pick<DetailProps, 'done' | 'total'>) => {
  return (
    <Tag shape="square">
      {props.done}/{props.total}
      <RadioChecked />
    </Tag>
  )
}
