export {}

type ConsoleReMethods =
  | 'log'
  | 'error'
  | 'info'
  | 'warn'
  | 'debug'
  | 'count'
  | 'now'
  | 'time'
  | 'test'
  | 'assert'
  | 'type'
  | 'timeEnd'
  | 'trace'
  | 'size'
  | 'css'
  | 'mark'
  | 'clear'

type ConsoleReShortCutMethods =
  | 'l'
  | 'e'
  | 'i'
  | 'w'
  | 'd'
  | 'c'
  | 'n'
  | 'ti'
  | 'ts'
  | 'a'
  | 't'
  | 'te'
  | 'tr'
  | 's'
  | 'cs'
  | 'm'
  | 'cl'

type ConsoleReConnect = {
  server?: string
  channel: string
  disableDefaultConsoleOutput?: boolean
  redirectDefaultConsoleToRemote?: boolean
}

export interface ConsoleRe {
  connect: (options: ConsoleReConnect) => void
}

declare module NodeJS {
  interface Global {
    relog: (...message: any) => void
    re: {
      [key in ConsoleReMethods]: (...message: any) => void
    }
  }
}

declare global {
  interface Window {
    relog: (...message: any) => void
    re: {
      [key in ConsoleReMethods | ConsoleReShortCutMethods]: (...message: any) => void
    }
  }

  interface Console {
    re: {
      [key in ConsoleReMethods | ConsoleReShortCutMethods]: (...message: any) => void
    }
  }
}

declare var relog: (...message: any) => void
declare var re: {
  [key in ConsoleReMethods | ConsoleReShortCutMethods]: (...message: any) => void
}

declare const consolere: ConsoleRe
export as namespace consolere
export default consolere
