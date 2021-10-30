import type { Models } from '@rematch/core'
import { basic } from './basic'
export interface RootModel extends Models<RootModel> {
  basic: typeof basic
}

export const models: RootModel = { basic }
