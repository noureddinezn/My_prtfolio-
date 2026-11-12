import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { certificates } from '../../src/data/certificates'
import { projects } from '../../src/data/projects'

describe('Portfolio catalog', () => {
  it('has unique certificate IDs and local previews for certificates with images', () => {
    expect(new Set(certificates.map(({ id }) => id)).size).toBe(certificates.length)
    for (const { title, image, credentialUrl } of certificates) {
      if (image) expect(existsSync(`public${image}`), title).toBe(true)
      if (credentialUrl) {
        const url = new URL(credentialUrl)
        expect(url.protocol, title).toBe('https:')
        expect(url.pathname, title).not.toBe('/')
      }
    }
  })

  it('has secure, distinct destinations for live projects and source links', () => {
    const liveProjects = projects.filter(({ demoUrl }) => demoUrl)
    expect(liveProjects.length).toBeGreaterThan(0)
    for (const project of projects) {
      for (const destination of [project.demoUrl, project.githubUrl].filter(Boolean)) {
        expect(new URL(destination).protocol, project.slug).toBe('https:')
      }
      if (project.demoUrl) expect(project.demoUrl).not.toBe(project.githubUrl)
    }
  })
})
