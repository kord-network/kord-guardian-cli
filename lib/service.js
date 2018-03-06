import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'

import Logger from './logger'
import { getPackageName, isEmpty } from './util/index.js'
import readme from '../lib/template/readme'

const QUESTIONS = [
  {
    name: 'guardian',
    message: 'Enter the name of the new KORD Guardian',
    validate: isEmpty,
  },
  {
    name: 'description',
    message: 'Describe the purpose of this KORD Guardian',
    validate: isEmpty,
  },
  {
    name: 'author',
    message: 'Enter the author of this KORD Guardian',
    validate: isEmpty,
  },
  {
    name: 'license',
    default: 'MIT',
    message: 'Choose a license for the KORD Guardian code',
    validate: isEmpty,
  },
  {
    name: 'moveon',
    message: 'OK?',
    type: 'confirm',
  },
]

const GITIGNORE_DEST = '.gitignore'
const GITIGNORE_TEMPLATE = '../lib/template/gitignore'

const INDEX_DEST = 'index.js'
const INDEX_TEMPLATE = '../lib/template/index.js'

const PACKAGE_DEST = 'package.json'
const PACKAGE_TEMPLATE = '../lib/template/package.json'

const README_DEST = 'README.md'
const README_TEMPLATE = '../lib/template/index.js'

const TEST_FIXTURES_CLAIM_DEST = 'test/fixtures/claim.json'
const TEST_FIXTURES_CLAIM_TEMPLATE = '../lib/template/test/fixtures/claim.json'

const TEST_SPEC_DEST = 'test/kord-guardian-service.spec.js'
const TEST_SPEC_TEMPLATE = '../lib/template/test/kord-guardian-service.spec.js'

const logger = new Logger()

const service = async opts => {
  try {
    const dir = opts.dir || __dirname

    // interactive input
    const answers = await inquirer.prompt(QUESTIONS)

    // read `package.json` template
    const pkg = await fs.readJson(path.resolve(__dirname, PACKAGE_TEMPLATE))

    // generate `package.json` based on user input
    await fs.outputJson(
      path.resolve(dir, PACKAGE_DEST),
      Object.assign({}, pkg, {
        author: answers.author,
        description: answers.description,
        license: answers.license,
        name: getPackageName(answers.guardian),
      }),
      { spaces: 2 }
    )

    // copy `.gitignore` template to output destination
    await fs.copy(
      path.resolve(__dirname, GITIGNORE_TEMPLATE),
      path.resolve(dir, GITIGNORE_DEST)
    )

    // copy `index.js` template to output destination
    await fs.copy(
      path.resolve(__dirname, INDEX_TEMPLATE),
      path.resolve(dir, INDEX_DEST)
    )

    // copy `test/kord-guardian-service.spec.js` template to output destination
    await fs.copy(
      path.resolve(__dirname, TEST_SPEC_TEMPLATE),
      path.resolve(dir, TEST_SPEC_DEST)
    )

    // copy `test/fixtures/claim.json` template to output destination
    await fs.copy(
      path.resolve(__dirname, TEST_FIXTURES_CLAIM_TEMPLATE),
      path.resolve(dir, TEST_FIXTURES_CLAIM_DEST)
    )

    // generate `README.md` based on user input
    await fs.outputFile(
      path.resolve(dir, README_DEST),
      readme(answers)
    )

    return logger.success(`Generated micro-service in ${dir}`)
  } catch (e) {
    logger.error(e)
  }
}

export default service
