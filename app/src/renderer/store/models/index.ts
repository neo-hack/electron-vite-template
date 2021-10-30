import { Models } from '@rematch/core'
import { view } from './view'
import { search } from './search'
import { todo } from './todo'
export interface RootModel extends Models<RootModel> {
  view: typeof view
  search: typeof search
  todo: typeof todo
}

export const models: RootModel = { view, search, todo }
