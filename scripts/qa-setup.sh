#!/bin/sh
rm -rf .tmp/
config=`cat config/config.json | underscore select '.qa' --outfmt text`
echo "(function (window) {
        window.__env = window.__env || {};

        // API url
        window.__env.config = JSON.parse('$config');

        // Base url
        window.__env.baseUrl = '/';

        // Whether or not to enable debug mode
        // Setting this to false will disable console output
        window.__env.enableDebug = true;
      }(this));" > env.js
echo "{
        "projects": {
          "default": "acromancer-nonprod"
        }
      }" > .firebaserc
