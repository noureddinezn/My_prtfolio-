# Experience page assets

The OCP logo was copied from the existing local project asset at `fullbreif/projectOcp/frontend/src/assets/ocp.png`.

Add these actual files when available:

- `public/images/experience/ocp-project.png`: the real Gestion des Moteurs screenshot.
- `public/documents/rapport-stage-ocp.pdf`: the real internship report.

No screenshot or report has been fabricated. The page shows a screenshot fallback and a disabled report button until the matching assets respond with the expected content type. Reload the page after adding the files; run `npm run build` for a production build. The report opens in a new tab only when a PDF exists. The logo path is `public/images/experience/ocp-logo.png`.

The shared `experiences` array retains Personal Projects first so the existing Home page summary is preserved. The Experience page uses the separately ordered `timelineExperiences` export.
