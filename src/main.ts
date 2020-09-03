import * as core from '@actions/core'
import {promote} from './promote'

async function run(): Promise<void> {
  try {
    const url: string = core.getInput('url')
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
      source,
      targetRepo,
      dockerRepository,
      tag,
      targetTag,
      copy
    )

    const promotedTag = targetTag ? `:${targetTag}` : tag ? `:${tag}` : ''
    core.setOutput('image', `${dockerRepository}${promotedTag}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
