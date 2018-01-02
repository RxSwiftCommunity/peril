[![CircleCI](https://circleci.com/gh/RxSwiftCommunity/peril.svg?style=svg)](https://circleci.com/gh/RxSwiftCommunity/peril)

# peril

Settings for the RxSwiftCommunity organization's [Peril](https://github.com/danger/peril) server. The server receives webhook events from every org repository (new issues and pull requests). We can hook into that in the `org/all-issues.ts` and `org/all-prs.ts` files, respectively. Usually we only use `all-prs.ts`, but Peril affords us a lot of power and flexibility to respond to [pull request actions](https://developer.github.com/v3/activity/events/types/#pullrequestevent) and [issue actions](https://developer.github.com/v3/activity/events/types/#issuesevent).

Run `yarn install` to get autocomplete and everything. If the `settings-peril.json` is changed, the Heroku server needs to be restarted before Peril will reflect the new changes (just let @ashfurrow know). You can run tests with `yarn jest`. All new Danger checks should be accompanied by unit tests.

