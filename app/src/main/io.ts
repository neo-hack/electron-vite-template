import fs from 'fs-extra'
import os from 'os'
import path from 'path'
import pkg from '../../package.json'

let appDir = path.resolve(os.homedir(), pkg.name)
if (process.env.NODE_ENV === 'development') {
  appDir = path.resolve(process.cwd(), '..')
}

export const getFiles = () => {
  const files = fs.readdirSync(appDir)
  return files
}

export const readFile = (filename?: string) => {
  if (!filename) {
    return ''
  }
  const filepath = path.resolve(appDir, filename)
  return fs.readFileSync(filepath).toString()
}
