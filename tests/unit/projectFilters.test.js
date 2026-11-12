import { describe, it, expect } from 'vitest'
import { projects } from '../../src/data/projects'
import { technologies } from '../../src/data/technologies'
import { projectFilters, filterProjects } from '../../src/data/projectFilters'
import { existsSync } from 'node:fs'

describe('Project categories', () => {
  it('offers only the three requested categories', () => {
    expect(projectFilters.map(f => f.label)).toEqual(['Web Apps', 'APIs', 'Games'])
  })
  it.each(projectFilters.map(f => f.label))('%s has actual matching projects', category => {
    const result = filterProjects(projects, category)
    expect(result.length).toBeGreaterThan(0)
    expect(result.every(p => (p.types || [p.type]).includes(category))).toBe(true)
  })
  it('supports legacy single types and multi-category projects without duplicates', () => {
    const sample = [{ slug: 'web', type: 'Web Apps' }, { slug: 'both', types: ['Web Apps','APIs'] }]
    expect(filterProjects(sample, 'Web Apps').map(p => p.slug)).toEqual(['web','both'])
    expect(filterProjects(sample, 'APIs').map(p => p.slug)).toEqual(['both'])
    expect(filterProjects(sample, 'unknown')).toEqual([])
  })
  it('keeps game catalogs separate from playable games', () => {
    expect(filterProjects(projects, 'Games').map(p => p.slug)).toContain('vitalmind')
    expect(filterProjects(projects, 'Games').map(p => p.slug)).not.toContain('pixelquest')
  })
  it('has unique project routes and real preview assets', () => {
    expect(new Set(projects.map(p=>p.slug)).size).toBe(projects.length)
    for (const project of projects) {
      if(project.screenshot) expect(existsSync(`public${project.screenshot}`), project.screenshot).toBe(true)
      for(const item of project.gallery || []) if(item.src) expect(existsSync(`public${item.src}`),item.src).toBe(true)
    }
  })
})

describe('Technology catalog', () => {
  it.each(['Java','Spring','Spring Boot','Jakarta EE (JEE)'])('includes %s in Backend', name => {
    expect(technologies.find(t=>t.name===name)?.category).toBe('Backend')
  })
  it.each(['Codex','GitHub Copilot'])('includes %s in Tools', name => {
    expect(technologies.find(t=>t.name===name)?.category).toBe('Tools')
  })
  it('has unique, complete skills and keeps the home orbit readable', () => {
    expect(new Set(technologies.map(t=>t.name)).size).toBe(technologies.length)
    expect(technologies.every(t=>t.icon && t.description && t.category)).toBe(true)
    expect(technologies.filter(t=>t.showInOrbit!==false)).toHaveLength(10)
  })
})
