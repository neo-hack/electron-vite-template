import fs from 'fs-extra'
import os from 'os'
import path from 'path'

let appDir = path.resolve(os.homedir(), 'planit')
if (process.env.NODE_ENV === 'development') {
  appDir = path.resolve(process.cwd(), 'assets')
}
console.log(appDir)

export const getFiles = () => {
  const files = fs.readdirSync(appDir)
  console.log(files)
}

export const readFile = (filename = 'demo.md') => {
  /**
   * @todo: replace appDir with real pages dir
   */
  const filepath = path.resolve(appDir, filename)
  return fs.readFileSync(filepath).toString()
}
