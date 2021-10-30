import styled from 'styled-components'

type TopBarProps = {
  mode?: 'light'
}

export const TopBar = styled.div<TopBarProps>`
  -webkit-app-region: drag;
  background-color: transparent;
  @apply h-8 w-full;
`
