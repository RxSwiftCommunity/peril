jest.mock("danger", () => jest.fn())
import * as danger from "danger"
const dm = danger as any

import { changelog } from "../pr"

beforeEach(() => {
  dm.danger = {}
  dm.warn = jest.fn()
})

const pr = {
  head: {
    user: {
      login: "danger",
    },
    repo: {
      name: "danger-js",
    },
  },
  title: "This is the pull request title.",
}

it("warns when code has changed but no changelog entry was made", () => {
  dm.danger.github = {
    api: {
      repos: {
        getContent: () => Promise.resolve({ data: [{ name: "code.swift" }, { name: "CHANGELOG.md" }] }),
      },
    },
    pr,
  }
  dm.danger.git = {
    modified_files: ["code.swift"],
    created_files: [],
  }
  return changelog().then(() => {
    expect(dm.warn).toBeCalled()
  })
})

it("does nothing when there is no changelog file", () => {
  dm.danger.github = {
    api: {
      repos: {
        getContent: () => Promise.resolve({ data: [{ name: "code.js" }] }),
      },
    },
    pr,
  }
  dm.danger.git = {
    modified_files: [],
    created_files: [],
  }
  return changelog().then(() => {
    expect(dm.warn).not.toBeCalled()
  })
})

it("does nothing when only non-Swift files were changed", () => {
  dm.danger.github = {
    api: {
      repos: {
        getContent: () => Promise.resolve({ data: [{ name: "CHANGELOG.md" }] }),
      },
    },
    pr,
  }
  dm.danger.git = {
    modified_files: ["Podfile"],
    created_files: [],
  }
  return changelog().then(() => {
    expect(dm.warn).not.toBeCalled()
  })
})

it("does nothing when only `test` files were changed", () => {
  dm.danger.github = {
    api: {
      repos: {
        getContent: () => Promise.resolve({ data: [{ name: "CHANGELOG.md" }] }),
      },
    },
    pr,
  }
  dm.danger.git = {
    modified_files: ["Tests/CalculatorSpec.swift"],
    created_files: [],
  }
  return changelog().then(() => {
    expect(dm.warn).not.toBeCalled()
  })
})

it("does nothing when the changelog was changed", () => {
  dm.danger.github = {
    api: {
      repos: {
        getContent: () => Promise.resolve({ data: [{ name: "code.js" }, { name: "CHANGELOG.md" }] }),
      },
    },
    pr,
  }
  dm.danger.git = {
    modified_files: ["src/index.html", "CHANGELOG.md"],
    created_files: [],
  }
  return changelog().then(() => {
    expect(dm.warn).not.toBeCalled()
  })
})

it("does nothing if the PR is marked a #trivial", () => {
  dm.danger.github = {
    api: {
      repos: {
        getContent: () => Promise.resolve({ data: [{ name: "code.swift" }, { name: "CHANGELOG.md" }] }),
      },
    },
    pr: {
      ...pr,
      title: "Just fixing some typos #trivial",
    },
  }
  dm.danger.git = {
    modified_files: ["code.swift"],
    created_files: [],
  }
  return changelog().then(() => {
    expect(dm.warn).not.toBeCalled()
  })
})
