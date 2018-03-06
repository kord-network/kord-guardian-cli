import fs from 'fs-extra'
import path from 'path'

import Logger from './logger'

const ENV_TEMPLATE = '../lib/template/.env'

const logger = new Logger()

const env = async opts => {
  try {
    const dir = opts.dir || __dirname

    await fs.copy(
      path.resolve(__dirname, ENV_TEMPLATE),
      path.resolve(dir, '.env')
    )

    return logger.success(`Generated environment variables file in ${dir}`)
  } catch (e) {
    logger.error(e)
  }
}

export default env
