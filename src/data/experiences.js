// Keep this source order stable: the homepage uses the first entry as its summary.
export const experiences = [
  {
    id: 'personal-projects',
    period: 'present',
    organization: 'Personal Projects',
    title: 'Personal Projects',
    role: 'Full Stack Developer',
    description:
      'Independent portfolio and product work focused on building practical, maintainable web applications.',
    points: [
      'Building modern web applications with React, Laravel and PostgreSQL.',
      'Working with APIs, Docker and CI/CD workflows.',
      'Improving problem-solving and system design skills.',
    ],
    technologies: ['React', 'Laravel', 'PostgreSQL', 'Docker', 'CI/CD', 'JAVA', 'GIT', 'githup_action', 'Postman'],
    timeline: {
      period: 'Ongoing',
      category: 'Independent work',
      icon: 'fa-solid fa-code',
      identityLabel: 'Personal development projects',
      sectionTitle: 'Development focus',
      technologies: ['React', 'Vue.js', 'Laravel', 'Java', 'PostgreSQL', 'Docker', 'Git', 'CI/CD', 'GitHub Actions', 'Postman'],
      action: { label: 'View My Projects', to: '/projects', icon: 'fa-solid fa-arrow-right' },
    },
  },
  {
    id: 'youcode',
    period: '2025 - en_cours',
    organization: 'YouCode',
    title: 'YouCode',
    role: 'Web Development Training',
    description:
      'A hands-on software development program centered on real projects, teamwork, and modern web practices.',
    points: [
      'Intensive training in full-stack development.',
      'Worked on multiple real projects and team briefs.',
      'Learned modern web technologies and best practices.',
      'Practical work with REST APIs, backend development, databases, and modern development tools.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'laravel', 'Vue.js', 'MySQL'],
    timeline: {
      period: '2025 – Present',
      category: 'Full Stack Development training',
      icon: 'fa-solid fa-graduation-cap',
      identityLabel: 'Web development training',
      sectionTitle: 'Learning & practical experience',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'Vue.js', 'MySQL'],
    },
  },
  {
    id: 'ocp',
    period: 'June 2026 – July 2026',
    organization: 'OCP Group',
    title: 'OCP Group Internship',
    role: 'Full Stack Developer Intern',
    description:
      'Contributed to the development of a web application related to industrial motor management during a two-month internship.',
    points: [
      'Contributed to the development of Gestion des Moteurs, a web application for managing industrial motors.',
      'Worked with React and Laravel during the internship.',
    ],
    // Retain the technologies already recorded in the portfolio, with consistent labels.
    technologies: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'React', 'PostgreSQL'],
    timeline: {
      period: 'June 2026 – July 2026',
      start: '2026-06',
      end: '2026-07',
      duration: '2 months',
      category: 'Internship',
      featured: true,
      icon: 'fa-solid fa-industry',
      identityLabel: 'IT Department · Industrial technology',
      sectionTitle: 'Responsibilities & project scope',
      technologies: ['React', 'Laravel', 'HTML', 'CSS', 'JavaScript', 'PostgreSQL'],
      logo: { src: '/images/experience/ocp-logo.png', alt: 'OCP Group logo' },
      project: {
        title: 'Gestion des Moteurs',
        label: 'Internship project',
        description: 'Web application for managing industrial motors.',
        image: '/images/experience/ocp-project.png',
        alt: 'Gestion des Moteurs — real OCP internship project screenshot',
        unavailableLabel: 'Project screenshot not available yet',
        icon: 'fa-solid fa-gears',
      },
      report: {
        src: '/documents/rapport-stage-ocp.pdf',
        label: 'View Internship Report',
        unavailableLabel: 'Internship report not available yet.',
      },
    },
  },
]

export const timelineExperiences = ['ocp', 'youcode', 'personal-projects']
  .map((id) => experiences.find((experience) => experience.id === id))

export const experiencePage = {
  kicker: 'Experience',
  title: 'Experience',
  description: 'A focused timeline of my training, internships, and project work, showing how I build, learn, and improve across full-stack web development.',
  timelineLabel: 'Professional experience and development timeline',
  technologiesLabel: 'Technologies',
}

export const experienceTechnologyIcons = {
  React: 'fa-brands fa-react',
  'Vue.js': 'fa-brands fa-vuejs',
  Laravel: 'fa-brands fa-laravel',
  HTML: 'fa-brands fa-html5',
  CSS: 'fa-brands fa-css3-alt',
  JavaScript: 'fa-brands fa-js',
  Java: 'fa-brands fa-java',
  PostgreSQL: 'fa-solid fa-database',
  MySQL: 'fa-solid fa-database',
  Docker: 'fa-brands fa-docker',
  Git: 'fa-brands fa-git-alt',
  'CI/CD': 'fa-solid fa-gears',
  'GitHub Actions': 'fa-brands fa-github',
  Postman: 'fa-solid fa-paper-plane',
}
