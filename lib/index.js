import sade from 'sade'

import env from './env'
import service from './service'

const prog = sade('kord-guardian')

prog.version(VERSION)

prog.command('generate service', '', { default:true })
  .describe('Generate a new KORD Guardian micro-service')
  .option('-d, --dir', 'Change the directory of the output')
  .example('service')
  .example('service -d ./example')
  .action(service)

prog.command('generate env')
  .describe('Generate a KORD Guardian environment variables config file')
  .option('-d, --dir', 'Change the directory of the output')
  .example('env')
  .example('env -d ./example')
  .action(env)

prog.parse(process.argv)
