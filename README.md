<p align="center">
  <a href="https://github.com/timperman/artifactory-promote-action/actions"><img alt="typescript-action status" src="https://github.com/timperman/artifactory-promote-action/workflows/build-test/badge.svg"></a>
</p>

# artifactory-promote-action

Promotes Docker image artifacts between Artifactory repositories (registries).

[Inputs](#Inputs)
* [url](#url)
* [username](#username)
* [password](#password)
* [sourceRepo](#sourceRepo)
* [targetRepo](#targetRepo)
* [dockerRepository](#dockerRepository)
* [tag](#tag)
* [targetTag](#targetTag)
* [copy](#copy)

[Example usage](#Example-usage)

## Inputs

### `repository`

**Required** Artifactory server URL

### `username`

**Required** Artifactory username

### `password`

**Required** Artifactory password

### `sourceRepo`

Source Artifactory Docker repo

### `targetRepo`

Target Artifactory Docker repo to promote to

### `tag`

Docker tag to promote

### `targetTag`

Target Docker tag after promotion (default: `latest`)

### `copy`

Boolean value - copy image if true, move if false

### Example usage

```yaml
steps:
  - name: Promote Docker image
    uses: timperman/artifactory-promote-action@v1
    with:
      url: https://artifactory.jfrog.io
      username: ${{ secrets.DOCKER_USERNAME }}
      password: ${{ secrets.DOCKER_PASSWORD }}
      sourceRepo: docker-dev
      targetRepo: docker-prod
      dockerRepository: myorg/myrepository
      tag: ${{ github.sha }}
      targetTag: v1.0.0
      copy: 'true'
```
