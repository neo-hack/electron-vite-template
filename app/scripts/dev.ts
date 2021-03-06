import * as path from 'path'
import * as fs from 'fs'
import * as esbuild from 'esbuild'
import startViteServer from './run-vite'
import startElectron from './run-electron'

import {
  cannotFoundTSConfigMessage,
  CompileError,
  finishMessageDev,
  formatDiagnosticsMessage,
  startMessage,
  mainPath,
  outDir,
  preloadPath,
} from './common'

const chalk = require('chalk')

function reportError(errors: CompileError[]) {
  const reportingMessage = formatDiagnosticsMessage(errors)
  console.error(reportingMessage)
}

function buildStart() {
  console.log(startMessage)
}

let viteClose: () => Promise<void>

async function electronClosed() {
  if (viteClose) {
    await viteClose()
  }
}

function buildComplete(dir: string) {
  console.log(finishMessageDev)
  startElectron(dir, electronClosed)
}

function notFoundTSConfig() {
  console.error(chalk.red(cannotFoundTSConfigMessage))
  process.exit()
}

async function main() {
  // Start vite server
  viteClose = await startViteServer()
  // Start dev for main process
  esDev(reportError, buildStart, buildComplete, notFoundTSConfig)
}

main()

//
// SUPPORTING BUILD SCRIPT
//

function transformErrors(error: esbuild.BuildFailure): CompileError[] {
  const errors = error.errors.map((e): CompileError => {
    return {
      location: e.location,
      message: e.text,
    }
  })
  return errors
}

async function esDev(
  reportError: { (errors: CompileError[]): void; (arg0: CompileError[]): void },
  buildStart: () => void,
  buildComplete: { (dir: string): void; (arg0: string): void },
  notFoundTSConfig: { (): void; (): void },
) {
  const tsconfigPath = path.join(mainPath, 'tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    notFoundTSConfig()
  }

  try {
    await esbuild.build({
      outdir: outDir,
      entryPoints: [
        path.join(mainPath, 'index.ts'),
        path.join(mainPath, 'io.ts'),
        path.join(mainPath, 'utils.ts'),
      ],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'silent',
      errorLimit: 0,
      incremental: true,
      platform: 'node',
      sourcemap: true,
      watch: {
        onRebuild: (error) => {
          if (error) {
            reportError(transformErrors(error))
          } else {
            buildComplete(outDir)
          }
        },
      },
    })
    buildComplete(outDir)
    // start dev for preload build
    await esDevPreload(reportError, notFoundTSConfig)
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure
      reportError(transformErrors(error))
    }
  }
}

async function esDevPreload(
  reportError: { (errors: CompileError[]): void; (arg0: CompileError[]): void },
  notFoundTSConfig: { (): void; (): void },
) {
  const tsconfigPath = path.join(mainPath, 'tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    notFoundTSConfig()
  }

  try {
    await esbuild.build({
      outdir: path.join(outDir, 'preload'),
      entryPoints: [path.join(preloadPath, 'index.ts'), path.join(preloadPath, 'bridge.ts')],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'silent',
      errorLimit: 0,
      incremental: true,
      platform: 'node',
      sourcemap: true,
      watch: {
        onRebuild: (error) => {
          if (error) {
            reportError(transformErrors(error))
          }
        },
      },
    })
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure
      reportError(transformErrors(error))
    }
  }
}
