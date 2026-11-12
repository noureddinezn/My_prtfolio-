import { test, expect } from '@playwright/test'
import { projects } from '../../src/data/projects.js'
import { certificates } from '../../src/data/certificates.js'
import { cv } from '../../src/data/cv.js'
import { filterProjects } from '../../src/data/projectFilters.js'

test.beforeEach(async ({ context, baseURL }) => {
  const origin = new URL(baseURL).origin
  await context.route(url => url.origin !== origin, route => route.abort())
})


test('project filters show visible results and detail navigation works', async ({page}) => {
  await page.goto('/projects')
  const filters=page.locator('.project-filters')
  await expect(filters.getByRole('button')).toHaveText(['Web Apps','APIs','Games'])
  for(const category of ['APIs','Games','Web Apps']) {
    await filters.getByRole('button',{name:category,exact:true}).click()
    const expected=filterProjects(projects,category)
    await expect(page.locator('.project-card h3')).toHaveText(expected.map(p=>p.title))
    await expect(page.locator('.project-card').first()).toHaveCSS('opacity','1')
    await expect(filters.getByRole('button',{name:category,exact:true})).toHaveAttribute('aria-pressed','true')
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true)
    await page.locator('.project-card').last().scrollIntoViewIfNeeded()
    await expect(page.locator('.project-card').last()).toHaveCSS('opacity','1')
  }
  await page.getByRole('heading',{name:'Projects',exact:true}).scrollIntoViewIfNeeded()
  await page.locator('.project-card').first().getByRole('link',{name:'View Project',exact:true}).click()
  await expect(page).toHaveURL(/\/projects\/qrprofile$/)
  await expect(page.locator('main h1')).toContainText('QR_Profile')
})

test('skills categories include the requested Java stack and AI tools', async ({page})=>{
  await page.goto('/about')
  await page.locator('.skill-filters').getByRole('button',{name:'Backend',exact:true}).click()
  await expect(page.locator('.skill-card h3')).toHaveText(['Laravel','Java','Spring','Spring Boot','Jakarta EE (JEE)'])
  await page.locator('.skill-filters').getByRole('button',{name:'Tools',exact:true}).click()
  await expect(page.locator('.skill-card h3')).toHaveText(['Git','Codex','GitHub Copilot'])
})

test('fixed navbar, theme, and mobile menu survive scrolling',async({page,isMobile})=>{
  await page.goto('/about')
  await page.getByRole('button',{name:'Toggle color theme'}).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark')
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme','dark')
  await page.getByRole('heading',{name:'Main Technologies & Skills'}).scrollIntoViewIfNeeded()
  await expect(page.locator('.site-header')).toHaveCSS('position','fixed')
  expect(await page.locator('.site-header').evaluate(e=>Math.round(e.getBoundingClientRect().top))).toBe(12)
  if(isMobile) {
    await page.getByRole('button',{name:'Toggle menu',exact:true}).click()
    await page.locator('#main-nav-links').getByRole('link',{name:'Projects',exact:true}).click()
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.getByRole('button',{name:'Toggle menu',exact:true})).toHaveAttribute('aria-expanded','false')
  }
})

test('CV preview targets Drive, PDF downloads, and modal closes with Escape',async({page})=>{
  await page.goto('/')
  await page.getByRole('button',{name:'Download CV',exact:true}).click()
  const dialog=page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  const preview = dialog.getByRole('link', { name: /View CV/ })
  await expect(preview).toHaveAttribute('href', cv.source)
  await page.context().route(cv.source, route => route.fulfill({ body: 'CV preview destination' }))
  const [popup] = await Promise.all([page.waitForEvent('popup'), preview.click()])
  await expect(popup).toHaveURL(cv.source)
  await popup.close()
  const downloadEvent=page.waitForEvent('download')
  await dialog.getByRole('link',{name:'Download CV',exact:true}).click()
  const download=await downloadEvent
  expect(download.suggestedFilename()).toBe('Noureddine-Zouana-CV.pdf')
  expect(await download.failure()).toBeNull()
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
})

test('all public pages render without application errors',async({page})=>{
  const errors=[]
  page.on('pageerror',error=>errors.push(error.message))
  for(const path of ['/','/about','/experience','/projects','/certifications','/contact']) {
    await page.goto(path)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.locator('header.site-header')).toBeVisible()
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path).toBe(true)
  }
  expect(errors).toEqual([])
})

async function followNavigation(page, isMobile, label, path) {
  if (isMobile) await page.getByRole('button', { name: 'Toggle menu' }).click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: label, exact: true }).click()
  await expect(page).toHaveURL(new RegExp(`${path}$`))
}

test('main navigation, gallery, certificates and contact QR work together', async ({ page, isMobile }) => {
  test.setTimeout(60_000)
  await page.goto('/')
  await followNavigation(page, isMobile, 'About Me', '/about')
  await followNavigation(page, isMobile, 'Experience', '/experience')
  await expect(page.getByRole('heading', { name: 'Experience', exact: true })).toBeVisible()
  await followNavigation(page, isMobile, 'Projects', '/projects')
  await page.locator('.project-card').first().getByRole('link', { name: 'View Project' }).click()
  await expect(page).toHaveURL(/\/projects\/qrprofile$/)

  const gallery = page.locator('.gallery-item').first().getByRole('link')
  const imagePath = await gallery.getAttribute('href')
  await expect(gallery.locator('img')).toHaveAttribute('src', imagePath)
  const [imageTab] = await Promise.all([page.waitForEvent('popup'), gallery.click()])
  await expect(imageTab).toHaveURL(new URL(imagePath, page.url()).href)
  await imageTab.close()

  await followNavigation(page, isMobile, 'Certifications', '/certifications')
  await expect(page.locator('main .certificate-card')).toHaveCount(certificates.length)
  for (const certificate of certificates.filter(item => item.image && item.credentialUrl)) {
    const card = page.locator('main .certificate-card').filter({
      has: page.getByRole('heading', { name: certificate.title, exact: true }),
    })
    await expect(card.getByRole('link', { name: 'View Certificate', exact: true })).toHaveAttribute('href', certificate.credentialUrl)
    await card.locator('img').scrollIntoViewIfNeeded()
    await expect.poll(() => card.locator('img').evaluate(img => img.naturalWidth)).toBeGreaterThan(0)
  }

  await followNavigation(page, isMobile, 'Contact', '/contact')
  await expect(page.locator('main').getByRole('link', { name: 'Open My Profile', exact: true }))
    .toHaveAttribute('href', 'https://qrprofile.live/p/noureddine-zouana')
})

test('internal links and local images resolve across direct routes and refreshes', async ({ page, request }) => {
  test.setTimeout(90_000)
  const paths = ['/', '/about', '/experience', '/projects', '/certifications', '/contact',
    ...projects.map(({ slug }) => `/projects/${slug}`)]
  const allowedRoutes = new Set(paths)
  const files = new Set()
  for (const path of paths) {
    expect((await page.goto(path)).status(), path).toBe(200)
    await expect(page.locator('main h1')).toBeVisible()
    const local = await page.evaluate(() => {
      const sameOrigin = (url) => url.origin === location.origin
      return {
        links: [...document.querySelectorAll('a[href]')].map(a => new URL(a.href)).filter(sameOrigin).map(url => url.pathname),
        images: [...document.images].map(img => new URL(img.src)).filter(sameOrigin).map(url => url.pathname),
      }
    })
    for (const link of local.links) {
      if (/\.[a-z0-9]+$/i.test(link)) files.add(link)
      else expect(allowedRoutes.has(link), `${path} links to ${link}`).toBe(true)
    }
    local.images.forEach(image => files.add(image))
  }
  for (const file of files) {
    const response = await request.head(file)
    expect(response.ok(), file).toBe(true)
    expect(response.headers()['content-type'], file).toMatch(/^(image\/|application\/pdf)/)
  }
  await page.goto('/projects/qrprofile')
  await page.reload()
  await expect(page.locator('main h1')).toHaveText('QR_Profile')
})
