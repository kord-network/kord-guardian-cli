const micro = require('micro')
const listen = require('test-listen')
const request = require('request-promise')

const kordGuardianService = require('../')
const claimData = require('./fixtures/claim.json')

describe('KORD Guardian Service', () => {
  let service

  beforeAll(async () => {
    service = micro(kordGuardianService)
  })

  afterAll(() => {
    service.close()
  })

  it('Should return a KORD Claim object', async () => {
    const uri = await listen(service)

    const body = await request({
      body: claimData,
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'POST',
      uri,
    })

    const actual = body

    expect(actual).toMatchSnapshot()
  })

  it('Should return an error object', async () => {
    const uri = await listen(service)

    const invalidClaimData = { ...claimData, address: '0xc4300acba32f5631ec4e45b3d62bd31f947a27e3' }

    const body = await request({
      body: invalidClaimData,
      headers: {
        'Content-Type': 'application/json',
      },
      json: true,
      method: 'POST',
      uri,
    })

    const actual = body
    const expected = { errors: [{ message: 'Could not verify claim' }] }

    expect(actual).toEqual(expected)
  })
})
