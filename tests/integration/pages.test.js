import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import ProjectsView from '../../src/views/ProjectsView.vue'
import AboutView from '../../src/views/AboutView.vue'
import HeroSection from '../../src/components/HeroSection.vue'
import { projects } from '../../src/data/projects'
import { filterProjects } from '../../src/data/projectFilters'

async function mountProjects() {
  const router = createRouter({history:createMemoryHistory(),routes:[{path:'/projects',component:ProjectsView},{path:'/projects/:slug',component:{template:'<p>Project detail</p>'}}]})
  await router.push('/projects'); await router.isReady()
  return {wrapper:mount(ProjectsView,{attachTo:document.body,global:{plugins:[router]}}),router}
}
describe('Projects page integration', () => {
  it('filters real cards, re-reveals returned cards, and preserves their routes', async () => {
    const bounds = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({top:0,bottom:100,left:0,right:100,width:100,height:100})
    const {wrapper,router}=await mountProjects()
    expect(wrapper.findAll('.project-filter').map(b=>b.text())).toEqual(['Web Apps','APIs','Games'])
    for(const category of ['APIs','Games','Web Apps','Games','Web Apps']) {
      await wrapper.findAll('button').find(b=>b.text()===category).trigger('click')
      await flushPromises()
      const expected=filterProjects(projects,category)
      expect(wrapper.findAll('.project-card h3').map(h=>h.text())).toEqual(expected.map(p=>p.title))
      expect(wrapper.findAll('.project-card').every(c=>c.classes().includes('is-visible'))).toBe(true)
      expect(wrapper.find('button[aria-pressed="true"]').text()).toBe(category)
    }
    await wrapper.find('.project-preview').trigger('click'); await flushPromises()
    expect(router.currentRoute.value.path).toBe(`/projects/${projects[0].slug}`)
    bounds.mockRestore()
  })
})
describe('Skills page integration',()=>{
  it('shows Java frameworks and AI tools in their relevant filters',async()=>{
    const wrapper=mount(AboutView)
    await wrapper.findAll('button').find(b=>b.text()==='Backend').trigger('click')
    expect(wrapper.findAll('.skill-card h3').map(h=>h.text())).toEqual(expect.arrayContaining(['Java','Spring','Spring Boot','Jakarta EE (JEE)']))
    expect(wrapper.text()).not.toContain('GitHub Copilot')
    await wrapper.findAll('button').find(b=>b.text()==='Tools').trigger('click')
    expect(wrapper.findAll('.skill-card h3').map(h=>h.text())).toEqual(['Git','Codex','GitHub Copilot'])
  })
})
describe('CV options integration',()=>{
  it('opens the dialog with a Drive preview and separate local download',async()=>{
    const wrapper=mount(HeroSection,{global:{stubs:{RouterLink:true,TechOrbit:true}},attachTo:document.body})
    await wrapper.find('button[aria-haspopup="dialog"]').trigger('click')
    const dialog=document.querySelector('.cv-dialog')
    expect(dialog.open).toBe(true)
    expect(dialog.querySelector('a[target="_blank"]').href).toContain('drive.google.com/file/d/1QZVQ6jsdJmSOPtKP1yCOumJcgdxz89zA/view')
    expect(dialog.querySelector('a[download]').getAttribute('href')).toBe('/documents/noureddine-zouana-cv.pdf')
    dialog.querySelector('button').click()
    expect(dialog.open).toBe(false)
  })
})
