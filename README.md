Ted Pennings
=====================

[![Build Status](https://travis-ci.org/tedpennings/site.svg)](https://travis-ci.org/tedpennings/site)

This is the code for my website.

## Developing locally
* Clone the repo and `cd` into it
* `npm install`
* `npm start` and go to the URL provided.

## Deployments

Webpack does all the heavy lifting for code packaging.

Inside `/dist`, webpack bundles my JS into a single `bundle.js`. The static assets are included using [webpack-file-loader](https://github.com/webpack/file-loader), and [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin) generates a spartan `index.html` that links to the `bundle.js` with a random hash for cache-busting.

For the actual config, see [webpack.config.prod.js](webpack.config.prod.js)

Travis deploys my site to S3 on each commit.

## Data storage

The blog post content is stored in [Firebase](https://www.firebase.com/) and read anonymously in your browser. Details are in [src/DataService.js](src/DataService.js).

Static content -- like the bio blurb -- is here in source control.

## License

MIT
