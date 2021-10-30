import React from 'react'

import { Stats } from './components/Stats'
import { DetailProps } from './types'
import { List } from './styles'

export const NotificationDetail = (props: Omit<DetailProps, 'title'>) => {
  return (
    <List>
      <Stats done={props.done} total={props.total} />
    </List>
  )
}
