import net from 'net'
import logger from './logger'

const isPortTaken = (port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const tester = net.createServer()

    tester
      .once('error', () => {
        logger.warn(
          `port ${port} is already in use, trying ${port + 1} instead.`
        )
        resolve(true)
      })
      .once('listening', () =>
        tester.once('close', () => resolve(false)).close()
      )
      .listen(port)
  })

const getNextAvailablePort = async (port: number): Promise<number> => {
  const isTaken = await isPortTaken(port)

  if (isTaken) {
    return getNextAvailablePort(port + 1)
  }

  return port
}

export default {
  getNextAvailablePort,
  isPortTaken,
} as const
