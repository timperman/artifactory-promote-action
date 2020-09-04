import {promote} from '../src/promote'
import nock from 'nock'

beforeEach(() => {
  nock.disableNetConnect()
})

test('promote makes a call', async () => {
  const artifactoryPromote = nock('https://artifactory.jfrog.io', {
    reqheaders: {Authorization: 'Basic dXNlcjpwYXNzd29yZA=='}
  })
    .post('/artifactory/api/docker/docker-dev/v2/promote', {
      targetRepo: 'docker-prod',
      dockerRepository: 'library/base-image',
      copy: true
    })
    .reply(200, {})

  await promote(
    'https://artifactory.jfrog.io',
    'user',
    'password',
    'docker-dev',
    'docker-prod',
    'library/base-image',
    '',
    '',
    true
  )
  expect(artifactoryPromote.isDone()).toBeTruthy()
})
