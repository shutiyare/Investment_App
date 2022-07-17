import { createTerminus } from '@godaddy/terminus'

export default function terminusConfiguration(server, port, Logger) {

  const onSignal = () => {
    Logger.info('server is starting cleanup')
    return Promise.resolve()
  }

  const onShutdown = () => {
    Logger.info('cleanup finished, server is shutting down')
  }

  const onHealthCheck = () => Promise.resolve('UP')


  const terminusConfiguration = Object.freeze({
    logger: Logger.info,
    signal: 'SIGINT',
    healthChecks: {
      '/healthcheck': onHealthCheck
    },
    onSignal,
    onShutdown
  })

  createTerminus(server, terminusConfiguration)

  server.listen(port, () => Logger.info(`Server listening on port ${port}`));
}