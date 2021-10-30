import React from 'react'
import { Layout, Box, Stat, Typography } from 'granen'
import styled from 'styled-components'

import { TopBar } from '@/renderer/components/TopBar'

const List = styled.div`
  @apply flex gap-4;

  [data-role='box'] {
    @apply flex-1 p-4;
    background-color: var(--bg-color-1);
  }

  [data-role='stat'] {
    background-color: var(--bg-color-1);
  }
`

const Container = styled(Layout.Main)`
  @apply h-full w-full p-4;

  background-color: var(--bg-color);

  [data-role='title'] {
    @apply m-0;
  }

  [data-role='paragraph'] {
    @apply mt-0;
  }
`

export const StatsPage = () => {
  return (
    <Container>
      <TopBar />
      <Typography.Title>今日事，今日毕</Typography.Title>
      <Typography.Paragraph type="secondary">今日事，今日毕</Typography.Paragraph>
      <List>
        <Box shadow="lg">
          <Stat>
            <Stat.Label>Sent</Stat.Label>
            <Stat.Number animated={true}>345670</Stat.Number>
            <Stat.HelpText type="danger">Shenzhen</Stat.HelpText>
          </Stat>
        </Box>
        <Box shadow="lg">
          <Stat>
            <Stat.Label>Sent</Stat.Label>
            <Stat.Number animated={true}>345670</Stat.Number>
            <Stat.HelpText type="danger">Shenzhen</Stat.HelpText>
          </Stat>
        </Box>
        <Box shadow="lg">
          <Stat>
            <Stat.Label>Sent</Stat.Label>
            <Stat.Number animated={true}>345670</Stat.Number>
            <Stat.HelpText type="danger">Shenzhen</Stat.HelpText>
          </Stat>
        </Box>
      </List>
    </Container>
  )
}
