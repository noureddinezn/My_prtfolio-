import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { useTheme } from '../../src/composables/useTheme'

const ThemeHarness = {
  setup: useTheme,
  template: '<button @click="toggleTheme">{{ theme }}</button>',
}

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
})

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
  vi.unstubAllGlobals()
})

it('uses the device preference on first visit and persists a toggle', async () => {
  const wrapper = mount(ThemeHarness)
  await wrapper.vm.$nextTick()
  expect(wrapper.text()).toBe('dark')
  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toBe('light')
  expect(document.documentElement.dataset.theme).toBe('light')
  expect(localStorage.getItem('portfolio-theme')).toBe('light')
})

it('restores the saved preference on a later visit', async () => {
  localStorage.setItem('portfolio-theme', 'light')
  const wrapper = mount(ThemeHarness)
  await wrapper.vm.$nextTick()
  expect(wrapper.text()).toBe('light')
  expect(document.documentElement.dataset.theme).toBe('light')
})
