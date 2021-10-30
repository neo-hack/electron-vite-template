import { api } from '../../src/preload/bridge'

declare global {
  interface Window {
    Main: typeof api
  }
}
