import chalk from 'chalk'

const LOGGER_PREFIX = '\n💂‍‍   KORD Guardian ~ '

class Logger {
  static log(format, msg) {
    return console.log(
      format(`${Logger.prefix}${msg}`)
    )
  }

  error(msg) {
    return Logger.log(chalk.red.bold, msg)
  }

  success(msg) {
    return Logger.log(chalk.green.bold, msg)
  }
}

Logger.prefix = LOGGER_PREFIX

export default Logger
