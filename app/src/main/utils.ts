import debug from 'debug'

if (process.env.NODE_ENV === 'development') {
  debug.enable('*')
}

export const logger = {
  bridge: {
    main: debug('BRIDGE:MAIN'),
  },
}
