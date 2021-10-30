/**
 * Build main process using ESBuild
 */
import * as path from 'path'
import * as fs from 'fs'
import * as esbuild from 'esbuild'
import {
  cannotFoundTSConfigMessage,
  finishMessageProd,
  formatDiagnosticsMessage,
  startMessage,
  CompileError,
  mainPath,
  outDirMain,
  preloadPath,
} from './common'

function reportError(errors: CompileError[]) {
  const reportingMessage = formatDiagnosticsMessage(errors)
  console.error(reportingMessage)
}

function buildStart() {
  console.log(startMessage)
}

function buildComplete(dir: string) {
  console.log(finishMessageProd)
  process.exit()
}

function notFoundTSConfig() {
  console.error(chalk.red(cannotFoundTSConfigMessage))
  process.exit()
}

async function main() {
  // Start dev for main process
  esProd(reportError, buildStart, buildComplete, notFoundTSConfig)
}

main()

const chalk = require('chalk')

function transformErrors(error: esbuild.BuildFailure): CompileError[] {
  const errors = error.errors.map((e): CompileError => {
    return {
      location: e.location,
      message: e.text,
    }
  })
  return errors
}

//
// SUPPORTING BUILD SCRIPT
//
async function esProd(
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
      outdir: outDirMain,
      entryPoints: [path.join(mainPath, 'index.ts'), path.join(mainPath, 'io.ts')],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'info',
      errorLimit: 0,
      incremental: true,
      platform: 'node',
      sourcemap: false,
      watch: false,
    })
    buildComplete(outDirMain)
    // preload build
    await esProdPreload(reportError, notFoundTSConfig)
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure
      reportError(transformErrors(error))
    }
  }
}

async function esProdPreload(
  reportError: { (errors: CompileError[]): void; (arg0: CompileError[]): void },
  notFoundTSConfig: { (): void; (): void },
) {
  const tsconfigPath = path.join(mainPath, 'tsconfig.json')
  if (!fs.existsSync(tsconfigPath)) {
    notFoundTSConfig()
  }

  try {
    await esbuild.build({
      outdir: path.join(outDirMain, 'preload'),
      entryPoints: [path.join(preloadPath, 'index.ts'), path.join(preloadPath, 'bridge.ts')],
      tsconfig: tsconfigPath,
      format: 'cjs',
      logLevel: 'silent',
      errorLimit: 0,
      incremental: true,
      platform: 'node',
      sourcemap: true,
    })
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure
      reportError(transformErrors(error))
    }
  }
}
