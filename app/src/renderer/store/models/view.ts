import { createModel } from '@rematch/core'
import { RootModel } from './index'

import { loremIpsum } from 'lorem-ipsum'

export type TodoItem = {
  title: string
  id: string | number
  deadline?: string
}

type ComplexCount = {
  count: number
  list: TodoItem[]
}

export const view = createModel<RootModel>()({
  state: {
    count: 0,
    list: new Array(10).fill(0).map((_, index) => {
      return {
        id: index,
        title: loremIpsum({ count: 6, units: 'word' }),
      }
    }),
  } as ComplexCount, // <-
  reducers: {
    increment(state, payload: number) {
      return {
        ...state,
        count: state.count + payload,
      }
    },
    setDeadline(state, payload: { data: string; id: string | number }) {
      return {
        ...state,
        list: state.list.map((item) => {
          if (item.id === payload.id) {
            return {
              ...item,
              deadline: payload.data,
            }
          }
          return {
            ...item,
          }
        }),
      }
    },
  },
  effects: (dispatch) => ({
    incrementAsync(payload: number, state) {
      dispatch.count.increment(payload)
    },
  }),
})
