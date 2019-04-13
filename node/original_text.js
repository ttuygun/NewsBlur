// Generated by CoffeeScript 1.8.0
(function() {
  var DEV, Mercury, app, log, server;

  Mercury = require('@postlight/mercury-parser');

  app = require('express')();

  server = require('http').Server(app);

  log = require('./log.js');

  DEV = process.env.NODE_ENV === 'development';

  log.debug("Starting NewsBlur Original Text Fetcher / Mercury Parser...");

  if (!DEV && !process.env.NODE_ENV) {
    log.debug("Specify NODE_ENV=<development,production>");
    return;
  } else if (DEV) {
    log.debug("Running as development server");
  } else {
    log.debug("Running as production server");
  }

  app.get(/\/rss_feeds\/original_text_fetcher\/?/, (function(_this) {
    return function(req, res) {
      var api_key, url;
      res.setHeader('Content-Type', 'application/json');
      url = req.query.url;
      if (!url) {
        log.debug("Missing url");
        res.end(JSON.stringify({
          error: "Missing `url` query parameter."
        }));
      }
      api_key = req.header('x-api-key');
      if (!DEV && (!api_key || api_key.indexOf("djtXZrSIEfDa3Dex9FQ9AR" === -1))) {
        log.debug("Mismatched API key: " + url);
        res.end(JSON.stringify({
          error: "Invalid API key. You need to set up your own Original Text server."
        }));
      }
      return Mercury.parse(url).then(function(result) {
        log.debug("Fetched: " + url);
        return res.end(JSON.stringify(result));
      });
    };
  })(this));

  app.listen(4040);

}).call(this);
