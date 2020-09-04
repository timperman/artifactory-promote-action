import * as core from '@actions/core'
import {promote} from './promote'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
    const username: string = core.getInput('username')
    const password: string = core.getInput('password')
    const source: string = core.getInput('sourceRepo')
    const targetRepo: string = core.getInput('targetRepo')
    const dockerRepository: string = core.getInput('dockerRepository')
    const tag: string = core.getInput('tag')
    const targetTag: string = core.getInput('targetTag')
    const copy: boolean = core.getInput('targetRepo') === 'true'
    core.debug(`artifactory-promote-action
==========================
URL: ${url}
Source repo: ${source}
Target repo: ${targetRepo}
Docker repository: ${dockerRepository}
Tag: ${tag}
Target tag: ${targetTag}
Copy: ${copy}`)

    await promote(
      url,
      username,
      password,
      source,
      targetRepo,
      dockerRepository,
      tag,
      targetTag,
      copy
    )

    const action = copy ? 'copied' : 'moved'
    const sourceTag = tag ? `:${tag}` : ''
    const promotedTag = targetTag ? `:${targetTag}` : sourceTag
    core.info(`${action} image ${dockerRepository}${sourceTag} from ${source} to ${targetRepo} as ${dockerRepository}${promotedTag}`)
    core.setOutput('image', `${dockerRepository}${promotedTag}`)
  } catch (error) {
    core.debug(`error: ${error}`)
    core.setFailed(error.message)
  }
}

run()
