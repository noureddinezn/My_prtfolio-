export const projectFilters = [
  { label: 'Web Apps', icon: 'fa-solid fa-desktop' },
  { label: 'APIs', icon: 'fa-solid fa-server' },
  { label: 'Games', icon: 'fa-solid fa-gamepad' },
]

export function filterProjects(projects, category) {
  return projects.filter((project) => (project.types || [project.type]).includes(category))
}
