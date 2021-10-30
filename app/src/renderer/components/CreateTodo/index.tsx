import React from 'react'
import { Popup } from 'granen'
import { useDispatch, useSelector } from 'react-redux'
import Editor from 'rich-markdown-editor'
import { dark } from 'rich-markdown-editor/dist/theme'

import { RootState, Dispatch } from '@store/index'

export const CreateTodo = () => {
  const visible = useSelector((state: RootState) => state.todo.visible)
  const dispatch = useDispatch<Dispatch>().todo
  console.log('CreateTodo', visible)
  return (
    <Popup.Group>
      <Popup showClose={true} visible={visible} onClose={dispatch.toggle}>
        <Editor theme={dark} defaultValue="Hello world!" onChange={() => {}} />
      </Popup>
    </Popup.Group>
  )
}
