import bent from 'bent'

export async function promote(
  url: string,
  source: string,
  targetRepo: string,
  dockerRepository: string,
  tag: string,
  targetTag: string,
  copy: boolean
): Promise<any> {
  let payload: any = {
    targetRepo,
    dockerRepository,
    copy
  }
  if (tag !== '') {
    payload.tag = tag
  }
  if (targetTag !== '') {
    payload.targetTag = targetTag
  }

  const post = bent(url, 'POST', 'json')
  return post(`/artifactory/api/docker/${source}/v2/promote`, payload)
}
