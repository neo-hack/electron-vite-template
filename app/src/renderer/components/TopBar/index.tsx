import styled from 'styled-components'

// TODO: to granen
type TopBarProps = {
  mode?: 'light'
}

export const TopBar = styled.div<TopBarProps>`
  -webkit-app-region: drag;
  background-color: transparent;
  @apply h-8 w-full;
`
