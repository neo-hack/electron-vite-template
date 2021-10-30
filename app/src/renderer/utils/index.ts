import { flatten } from 'prosemirror-utils'
import type { EditorState } from 'prosemirror-state'

/**
 * - count checkbox_item
 * - get title
 */
export const getStats = (doc: EditorState['doc']) => {
  const nodes = flatten(doc)
  const todos = nodes.filter((node) => node.node.type.name === 'checkbox_item')
  const title = nodes.find((node) => node.node.type.name === 'heading')
  return {
    done: todos.filter((item) => item.node.attrs.checked === true),
    total: todos,
    title,
  }
}
