import React from 'react'
import { GranenThemeProvider, Layout } from 'granen'
import styled from 'styled-components'
import { HashRouter, Switch, Route } from 'react-router-dom'

import { EditorPage } from '@/renderer/pages/editor'
import { StatsPage } from '@/renderer/pages/stats'
import { NavigatePanel } from '@/renderer/components/NavigatePanel'
import { GlobalStyle } from '@/renderer/GlobalStyle'

const Container = styled.div`
  @apply flex flex-col h-full;

  [data-role='layout'] {
    flex: 1;
  }
`

function App() {
  return (
    <GranenThemeProvider defaultThemeType="dark">
      <HashRouter>
        <Container className="App">
          <GlobalStyle />
          <Layout>
            <NavigatePanel />
            <Switch>
              <Route exact={true} path="/">
                <EditorPage />
              </Route>
              <Route exact={true} path="/stats">
                <StatsPage />
              </Route>
            </Switch>
          </Layout>
        </Container>
      </HashRouter>
    </GranenThemeProvider>
  )
}

export default App
