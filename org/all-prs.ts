import { schedule, danger, warn, fail, message, markdown, results, Scheduleable } from "danger"

// Hey there!
//
// When a PR is opened, this file gets run. You can add all your rules here, but
// remember that they'll be applied to every pull request on every repo in the
// RxSwiftCommunity organization, so we better write some unit tests!
//
// Note that all the rules have to be async functions.
//
// Follow the changelog example and ignore the next four const lines.
// The inspiration for this is https://github.com/artsy/artsy-danger/blob/f019ee1a3abffabad65014afabe07cb9a12274e7/org/all-prs.ts
const isJest = typeof jest !== "undefined"
// Returns the promise itself, for testing.
const _test = (reason: string, promise: Promise<any>) => promise
// Schedules the promise for execution via Danger.
const _run = (reason: string, promise: Promise<any>) => schedule(promise)
const wrap: any = isJest ? _test : _run

// Inspiration: https://github.com/artsy/artsy-danger/blob/f019ee1a3abffabad65014afabe07cb9a12274e7/org/all-prs.ts#L67-L85
export const changelog = wrap("Require changelog entries on PRs with code changes", async () => {
  // First we check if there is a changelog in the repository.
  const pr = danger.github.pr
  const changelogs = ["CHANGELOG.md", "changelog.md", "Changelog.md", "CHANGELOG.yml"]

  const getContentParams = { path: "", owner: pr.head.user.login, repo: pr.head.repo.name }
  const rootContents: any = await danger.github.api.repos.getContents(getContentParams)

  const hasChangelog = rootContents.data.find((file: any) => changelogs.includes(file.name))
  const markedTrivial = (pr.title + pr.body).includes("#trivial")
  if (hasChangelog) {
    const files = [...danger.git.modified_files, ...danger.git.created_files]

    // Look for Swift files that aren't in a unit test directory.
    const hasCodeChanges = files.find((file: any) => file.match(/.*\.swift/) && !file.match(/(test|spec)/i))
    const hasChangelogChanges = files.find(file => changelogs.includes(file))
    if (!!hasCodeChanges && !hasChangelogChanges) {
      const baseMessage = "It looks like code was changed without adding anything to the Changelog. "
      if (markedTrivial) {
        markdown(baseMessage)
      } else {
        warn(baseMessage + "If this is a trivial PR that doesn't need a changelog, add #trivial to the PR title or body.")
      }
    }
  }
})
