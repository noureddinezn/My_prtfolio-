# Portfolio testing and deployment

Use Node.js 24.17.0 and npm. The CI workflow uses the existing lockfile and the repository's default branch, `master`.

## Local verification

```sh
npm ci
npx playwright install chromium
npm run test:unit
npm run test:integration
npm run test:coverage
npm run test:e2e
npm run build
```

`npm test` runs the unit and integration suites together. The coverage report covers the Vue and JavaScript source executed by those two suites. Open `coverage/index.html` for the line-by-line report.

Playwright builds into `test-build/` and starts Vite preview on localhost port 4173. In CI, it previews the build from the preceding step. The desktop and phone profiles run in Chromium. The tests intercept external requests and verify the external destinations without depending on third-party websites.

## First production deployment

1. Open the portfolio's existing project in Vercel. In **Settings → Git**, disconnect its Git repository before pushing or merging the workflow. The repository configuration also disables Git-triggered builds. The deploy job queries Vercel and stops if the selected project still has a Git connection. [Vercel Git configuration](https://vercel.com/docs/project-configuration/git-configuration)
2. Retrieve the existing project ID from **Settings → General**. To retrieve the owner ID from an existing link, run `npx vercel@65.14.0 link --project <existing-project-id>` while signed in under the project's owner scope. Select the existing project if prompted. Read `orgId` and `projectId` from the local `.vercel/project.json`. Keep that folder local. [Vercel CLI linking](https://vercel.com/docs/cli/link)
3. Create an access token in your [Vercel account token settings](https://vercel.com/account/tokens) with access to that project's scope. In GitHub, open **Settings → Environments**, create or open **production**, and add the following environment secrets.

   | Secret | Value |
   | --- | --- |
   | `VERCEL_TOKEN` | Vercel access token |
   | `VERCEL_ORG_ID` | Existing project owner's `orgId` |
   | `VERCEL_PROJECT_ID` | Existing project's `projectId` |

   Restrict the environment to `master` where GitHub offers deployment branch rules. Enter values in GitHub's secrets interface. [Vercel CLI environment variables](https://vercel.com/docs/cli/global-options)
4. Commit the intended changes on `feature/testing-vercel-cicd`, push the branch, and open a PR against `master`. Include the existing local project-filter changes if they are part of the release. The tests cover the current worktree and depend on `src/data/projectFilters.js` and its companion portfolio edits. Keep generated build output and dependency changes under `node_modules` out of the commit.
5. After the PR workflow reports its first result, open **Settings → Branches → Branch protection rules** and add or edit the rule for `master`. Enable **Require a pull request before merging**, **Require status checks to pass before merging**, and **Require branches to be up to date before merging**. Select the GitHub Actions job **Portfolio CI** from its observed check run. Apply the rule to administrators as well if all changes must pass through this gate. [GitHub branch protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
6. Merge after the required check passes. The push to `master` runs CI again and publishes the tested build to the existing project. For a retry, run **Portfolio CI/CD** from **Actions** on `master`.

## How production is gated

Pull requests and manual runs test the selected revision. Only a push or manual run on `master` can publish after **Portfolio CI** succeeds. The deployment job downloads the same run's tested build, packages it as Vercel Build Output API v3, and deploys it with the Vercel CLI. It checks that the commit is still the tip of `master` before publishing. Credentials are scoped to the deployment step. [Vercel Build Output API](https://vercel.com/docs/build-output-api)

Vite's default root base matches the existing Vue Router history. Vercel serves real static files first and falls back to `index.html` for the portfolio's page routes. After the first deployment, verify a direct visit and refresh at `/projects/qrprofile` and check the CV PDF and a gallery image on the production domain.

## Local verification results

| Check | Result |
| --- | --- |
| Unit | 18 passed |
| Integration | 8 passed |
| E2E against production preview | 14 passed across desktop and phone |
| V8 coverage | 52.87% lines and 44.17% branches |
| Production build | Passed |
| Workflow validation | Passed with actionlint |

The suites ran in a clean temporary copy installed with `npm ci`. An additional standalone Playwright CV run verified that the E2E command builds and starts preview by itself. The OCP screenshot and internship PDF are still absent, so their existing fallbacks apply. The install audit reported four moderate transitive development dependency advisories.

The GitHub workflow and live Vercel deployment await repository and project setup. The branch and workflow files are local.
