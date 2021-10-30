import styled from 'styled-components'

export const List = styled.div`
  @apply flex mb-2;
  --ggs: 0.6;

  color: var(--text-color-2);

  [data-role='tag']:first-child {
    @apply pl-0;
  }
`
