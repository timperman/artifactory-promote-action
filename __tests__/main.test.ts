import {promote} from '../src/promote'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import nock from 'nock'

beforeEach(() => {
  nock.disableNetConnect()
})

test('promote makes a call', async () => {
  const artifactoryPromote = nock('https://artifactory.jfrog.io')
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
