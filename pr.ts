import { schedule, danger, warn, fail } from "danger"

// Hey there!
//
// When a PR is opened, this file gets run. It's not straightforward, try to 
// follow the changelog example and ignore the next four const lines.
// The inspiration for this is https://github.com/artsy/artsy-danger/blob/f019ee1a3abffabad65014afabe07cb9a12274e7/org/all-prs.ts
const isJest = typeof jest !== "undefined"
// Stores the parameter in a closure that can be invoked in tests.
const _test = (reason: string, closure: () => void | Promise<any>) =>
  // We return a closure here so that the (promise is resolved|closure is invoked)
  // during test time and not when we call rfc().
  () => (closure instanceof Promise ? closure : Promise.resolve(closure()))
// Either schedules the promise for execution via Danger, or invokes closure.
const _run = (reason: string, closure: () => void | Promise<any>) =>
  closure instanceof Promise ? schedule(closure) : closure()

const wrap: any = isJest ? _test : _run

// See: https://github.com/artsy/artsy-danger/blob/f019ee1a3abffabad65014afabe07cb9a12274e7/org/all-prs.ts#L67-L85
export const changelog = wrap("Require changelog entries on PRs with code changes", async () => {
  const pr = danger.github.pr
  const changelogs = ["CHANGELOG.md", "changelog.md", "Changelog.md", "CHANGELOG.yml"]

  const getContentParams = { path: "", owner: pr.head.user.login, repo: pr.head.repo.name }
  const rootContents: any = await danger.github.api.repos.getContent(getContentParams)

  const hasChangelog = rootContents.data.find(file => changelogs.includes(file.name))
  if (hasChangelog) {
    const files = [...danger.git.modified_files, ...danger.git.created_files]

    const hasCodeChanges = files.find(file => file.match(/.*\.swift/) && !file.match(/(test|spec)/i))
    const hasChangelogChanges = files.find(file => changelogs.includes(file))

    if (hasCodeChanges && !hasChangelogChanges) {
      warn("It looks like code was changed without adding anything to the Changelog")
    }
  }
})
