import { createModel } from '@rematch/core'
import { RootModel } from './index'

type State = {
  visible: boolean
}

export const todo = createModel<RootModel>()({
  state: {
    visible: false,
  } as State,
  reducers: {
    toggle(state) {
      return {
        ...state,
        visible: !state.visible,
      }
    },
  },
})
