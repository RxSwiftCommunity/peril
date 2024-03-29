[![CircleCI](https://circleci.com/gh/RxSwiftCommunity/peril.svg?style=svg)](https://circleci.com/gh/RxSwiftCommunity/peril)

Peril
=====

Settings for the RxSwiftCommunity organization's [Peril](https://github.com/danger/peril) server. The server receives webhook events from every org repository (new issues and pull requests). We can hook into that in the `org/all-issues.ts` and `org/all-prs.ts` files, respectively. Usually we only use `all-prs.ts`, but Peril affords us a lot of power and flexibility to respond to [pull request actions](https://developer.github.com/v3/activity/events/types/#pullrequestevent) and [issue actions](https://developer.github.com/v3/activity/events/types/#issuesevent).

Setup
-----

Run `yarn install` to get autocomplete and everything. You can run tests with `yarn jest`. All new Danger checks should be accompanied by unit tests.

If the `settings-peril.json` file gets changed in a PR, the Heroku server needs to be restarted before Peril will reflect the new changes (just let [@ashfurrow](https://github.com/ashfurrow) know).

Automatic PR Checking with Peril
--------------------------------

[Peril](https://github.com/Danger/Peril) is a server which runs [Danger-JS](http://danger.systems/js/) automatically, on all pull requests, organization-wide. This repo contains our Danger rules. Danger can check for pull request metadata, commit information, which files were changed, all kinds of things. Here are the things Peril checks on _every_ RxSwiftCommunity repo's pull requests:

- Ensuring that changes to non-test code are reflected in the changelog (if one exists). [PR](https://github.com/RxSwiftCommunity/peril/pull/1)
- Inviting first-time contributors to join the RxSwiftCommunity organization when their PR is merged. [Discussion](https://github.com/RxSwiftCommunity/contributors/issues/36), [PR](https://github.com/RxSwiftCommunity/peril/pull/4)

If you have an idea for something we should check for in a pull request, or if you have an idea to improve the community using Peril to respond to issues, please [open an issue on the contributors repo](https://github.com/RxSwiftCommunity/contributors/issues/new) so we can discuss!

Status
------

Our Peril server is hosted on Heroku. Free-tier Heroku Dynos don't wake up fast enough to respond to GitHub webhook events, so we use the base-level Hobby tier. [@ashfurrow](https://github.com/ashfurrow) pays this cost. He is the point person for the Peril server, so ping him if you run into any issues.
