import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import { afterEach, expect, it } from 'vitest'
import Navbar from '../../src/components/Navbar.vue'
import ProjectCard from '../../src/components/ProjectCard.vue'
import CertificateCard from '../../src/components/CertificateCard.vue'
import ProjectsView from '../../src/views/ProjectsView.vue'
import ProjectDetailView from '../../src/views/ProjectDetailView.vue'
import { certificates } from '../../src/data/certificates'
import { projects } from '../../src/data/projects'

async function mountWithRouter(component, path, props = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/projects', name: 'projects', component: ProjectsView },
      { path: '/projects/:slug', name: 'project-detail', component: ProjectDetailView },
    ],
  })
  await router.push(path)
  return { router, wrapper: mount(component, { props, global: { plugins: [router] } }) }
}

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

it('navigates from the mobile menu and applies theme changes', async () => {
  localStorage.setItem('portfolio-theme', 'light')
  const { router, wrapper } = await mountWithRouter(Navbar, '/')
  const menu = wrapper.get('[aria-controls="main-nav-links"]')
  await menu.trigger('click')
  expect(menu.attributes('aria-expanded')).toBe('true')
  await wrapper.get('#main-nav-links a[href="/projects"]').trigger('click')
  await flushPromises()
  expect(router.currentRoute.value.name).toBe('projects')
  expect(menu.attributes('aria-expanded')).toBe('false')
  await wrapper.get('[aria-label="Toggle color theme"]').trigger('click')
  expect(document.documentElement.dataset.theme).toBe('dark')
  expect(localStorage.getItem('portfolio-theme')).toBe('dark')
})

it.each(['qrprofile', 'easycoloc'])('renders %s and opens its real detail route', async (slug) => {
  const project = projects.find((item) => item.slug === slug)
  const { router, wrapper } = await mountWithRouter(ProjectCard, '/projects', { project })
  expect(wrapper.get('h3').text()).toBe(project.title)
  expect(wrapper.get('img').attributes('src')).toBe(project.screenshot)
  const external = wrapper.findAll('a[target="_blank"]')
  expect(external.map((link) => link.attributes('href'))).toEqual([project.githubUrl || project.demoUrl])
  await wrapper.get('.project-preview').trigger('click')
  await flushPromises()
  expect(router.currentRoute.value.name).toBe('project-detail')
  const detail = mount(RouterView, { global: { plugins: [router] } })
  expect(detail.get('h1').text()).toBe(project.title)
  expect(detail.findAll('.card-actions a').some((link) => link.text().includes('Live Demo'))).toBe(Boolean(project.demoUrl))
})

it('keeps the credential reachable when its certificate preview fails', async () => {
  const certificate = certificates.find(({ credentialUrl, image }) => credentialUrl && image)
  const wrapper = mount(CertificateCard, { props: { certificate } })
  expect(wrapper.get('img').attributes('src')).toBe(certificate.image)
  expect(wrapper.get('a.certificate-image').attributes('href')).toBe(certificate.credentialUrl)
  await wrapper.get('img').trigger('error')
  expect(wrapper.get('.certificate-fallback').text()).toBe('Certificate preview unavailable')
  expect(wrapper.get('.certificate-link').attributes('href')).toBe(certificate.credentialUrl)
})

it('renders a certificate without a credential action when no URL is supplied', () => {
  const certificate = { ...certificates[0], credentialUrl: null }
  const wrapper = mount(CertificateCard, { props: { certificate } })
  expect(wrapper.get('h3').text()).toBe(certificate.title)
  expect(wrapper.find('a').exists()).toBe(false)
})
