import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  #root {
    @apply h-100vh;
    --ggs: 0.75;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

      /* used for behaving more like an app, selection inside inputs and textareas still work in chromium */
      user-select: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`
