/**
 * @todo: in granen
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { RadioChecked, Signal } from 'css.gg/icons/all'
import { Menu } from 'granen'
import { useHistory } from 'react-router'

const Panel = styled.div`
  background-color: #151419;
  color: var(--text-color-0);
  border-color: ${() => 'var(--border-color)'};
  --ggs: 1.1;
  -webkit-app-region: drag;

  i {
    cursor: pointer;
  }

  @apply flex flex-col items-center w-20 h-full border-r-1 text-color-white gap-8 pt-17;

  [data-role='menu-item'] {
    @apply p-0 flex justify-center items-center h-11 rounded-lg;
  }

  [data-role='menu'] {
    @apply pt-0;
  }

  [aria-selected='false'] {
    color: var(--text-color-2);
  }
`

export const NavigatePanel = () => {
  const history = useHistory()
  function handleSayHello() {
    window.Main.dispatch('app:read-file', 'hello')
  }
  useEffect(() => {
    window.Main.on('render:read-file', (data: string) => {
      console.log('render:read-file', data)
    })
  }, [])
  return (
    <Panel onClick={handleSayHello}>
      <Menu menuTheme="bgless">
        <Menu.Item
          onClick={() => {
            history.push('/')
          }}
          itemKey="todo"
        >
          <RadioChecked />
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            history.push('/stats')
          }}
          itemKey="stats"
        >
          <Signal />
        </Menu.Item>
      </Menu>
    </Panel>
  )
}
