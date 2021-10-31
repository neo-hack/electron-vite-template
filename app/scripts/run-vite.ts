import { createServer, InlineConfig, Plugin } from 'vite'
import * as chalk from 'chalk'
import config from '../vite.config'
import { consoleViteMessagePrefix, srcPath } from './common'

function LoggerPlugin(): Plugin {
  return {
    name: 'electron-scripts-logger',
    handleHotUpdate: (ctx) => {
      for (const file of ctx.modules) {
        const path = file.file.replace(srcPath, '')
        console.log(
          chalk.bgYellow.black(consoleViteMessagePrefix),
          chalk.yellow('hmr update'),
          chalk.cyan(path),
        )
      }
      return ctx.modules
    },
  }
}

export default async function startViteServer(): Promise<() => Promise<void>> {
  const cfg = config as InlineConfig
  const server = await createServer({
    ...cfg,
    configFile: false,
    logLevel: 'silent',
    plugins: [...(cfg.plugins ?? []), LoggerPlugin()],
  })
  await server.listen()
  const address = server.httpServer.address()
  if (typeof address === 'object') {
    const port = address.port
    console.log(
      chalk.bgGreen.black(consoleViteMessagePrefix),
      chalk.cyan(`Dev server running at: localhost:${port}`),
    )
  }
  return async () => {
    await server.close()
  }
}
