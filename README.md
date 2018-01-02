[![CircleCI](https://circleci.com/gh/RxSwiftCommunity/peril.svg?style=svg)](https://circleci.com/gh/RxSwiftCommunity/peril)

# peril

Settings for the RxSwiftCommunity organization's [Peril](https://github.com/danger/peril) server. The server receives webhook events from every org repository (new issues and pull requests). We can hook into that in the `issue.ts` and `pr.ts` files, respectively. Usually we only use `pr.ts`.

Run `yarn install` to get autocomplete and everything. If the `settings-peril.json` is changed, the Heroku server needs to be restarted (just let @ashfurrow know). You can run tests with `yarn jest`.

