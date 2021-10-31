import React from 'react'
import RichMarkEditor from 'rich-markdown-editor'
import { dark } from 'rich-markdown-editor/dist/styles/theme'
import styled from 'styled-components'

const Editor = styled(RichMarkEditor)`
  @apply h-full justify-start p-8;
  & > div {
    @apply h-full p-8 pt-0;
  }
`

const EditorPage = () => {
  return <Editor theme={{ ...dark, background: '#202125' }} />
}

export default EditorPage
