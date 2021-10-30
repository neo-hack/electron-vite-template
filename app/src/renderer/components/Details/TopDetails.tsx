import React from 'react'
import styled from 'styled-components'
import { Typography, IconGroup } from 'granen'
import { Trash } from 'css.gg/icons/all'

import { Stats } from './components/Stats'
import { DetailProps } from './types'
import { List } from './styles'

const Detail = styled.div<Partial<DetailProps>>`
  border-bottom: 1px solid var(--border-color);
  margin: 0px -16px;

  @apply pl-4 pr-8 flex justify-between items-center;

  .top-detail-title {
    @apply flex flex-col;
  }

  [data-role='title'] {
    @apply m-0;
  }

  [data-role='list'] {
    @apply pl-1;
  }
`

const Group = styled(IconGroup)`
  --ggs: 1;
`

export const TopDetail = ({ title, ...props }: DetailProps) => {
  return (
    <Detail {...props}>
      <div className="top-detail-title">
        <Typography.Title>{title}</Typography.Title>
        <List data-role="list">
          <Stats done={props.done} total={props.total} />
        </List>
      </div>
      <Group borderless={true}>
        <IconGroup.Item color="#F96057">
          <Trash />
        </IconGroup.Item>
      </Group>
    </Detail>
  )
}
