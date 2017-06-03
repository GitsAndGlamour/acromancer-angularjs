#!/bin/sh
config=`cat config/config.json | underscore select '.production' --outfmt text`
echo "(function (window) {
        window.__env = window.__env || {};

        // API url
        window.__env.config = $config;

        // Base url
        window.__env.baseUrl = '/';

        // Whether or not to enable debug mode
        // Setting this to false will disable console output
        window.__env.enableDebug = true;
      }(this));" > env.js
