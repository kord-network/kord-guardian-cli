import slugify from 'slugify'

/**
 * Construct package name from KORD Guardian name
 *
 * @param  {String} guardian KORD Guardian name
 * @return {String}          Package name
 */
export const getPackageName = guardian =>
  `${slugify(guardian.toLowerCase())}-kord-guardian-service`

/**
 * Validate input is not empty
 *
 * @param  {String}  input Input to validate
 * @return {Boolean}
 */
export const isEmpty = input => input.replace(/ /g, '') !== ''
