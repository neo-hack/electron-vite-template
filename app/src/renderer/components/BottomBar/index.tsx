import React from 'react'
import styled from 'styled-components'
import { MathPlus } from 'css.gg/icons/all'

const Bar = styled.div`
  color: var(--text-color-0);
  border-color: ${() => 'var(--border-color)'};
  --ggs: 0.6;

  @apply w-full h-8 flex items-center cursor-pointer border-t-1 relative z-50 p-4 text-sm;
`

const Item = styled.div`
  @apply flex items-center gap-1;
`

type BottomBarProps = {
  onClick?: () => void
}

export const BottomBar = (props: BottomBarProps) => {
  return (
    <Bar>
      <Item onClick={props.onClick}>
        <MathPlus />
        Create New Page
      </Item>
    </Bar>
  )
}
