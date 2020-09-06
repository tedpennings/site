# [ted.pennin.gs](https://ted.pennin.gs)

This is the code for my personal website, welcome.

## Developing

`yarn && yarn start` will get you going at [http://localhost:3000](http://localhost:3000)

## Acknowledgements

I'm thankful for the wonderful colleagues I've worked with over the years. They have taught me a lot. The code for this project looks a lot like what I write day-to-day, with everything I've learned from others. Thanks, y'all.

This project uses a lot of open source software -- check out the [package.json](package.json) and [yarn.lock](yarn.lock).

I'm also thankful to the following companies for free versions of their cool products:

- [GitHub Actions](https://github.com/features/actions) for my CI setup (see [.github/workflows](.github/workflows))
- [Netlify](https://www.netlify.com/) for static site hosting and PR previews, and shoutout to the OSS [Wait for Netlify Deployment](https://github.com/marketplace/actions/wait-for-netlify-deployment) GitHub Action
- [Cypress](https://cypress.io) for their great [dashboard service](https://www.cypress.io/dashboard) to view test run recordings and history
- [Packtracker](https://packtracker.io/) for monitoring my asset bundle sizes
- [Dependabot](https://dependabot.com/) (GitHub) for keeping me up to date
- [Snyk](https://snyk.io/) for keeping me safe

## Contributing

If you want to submit a PR, awesome, yes, thank you!

PR checks will not pass when run against forks, because secrets/credentials will not be available to those builds. I'll check it locally or cherry-pick the commits onto a non-forked PR.

The Code of Conduct is [Contributor Covenant](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

## License

[MIT](LICENSE)
