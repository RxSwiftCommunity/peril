import { danger, schedule } from "danger"

const gh = danger.github as any
const issue = gh.issue
const repo = gh.repository

const qWords: string[] = ["how", "who", "what", "where", "when", "why", "which"]

if (issue.title.slice(-1) == "?") {
  addLabel()
} else {
  const title = issue.title.toLowerCase()
  for (var i = 0; i < qWords.length; i++) {
    if (title.startsWith(qWords[i])) {
      addLabel()
      break
    }
  }
}

function addLabel() {
  schedule(async () => {
    await danger.github.api.issues.addLabels({
      owner: repo.owner.login,
      repo: repo.name,
      number: issue.number,
      labels: ["question"],
    })
  })
}
