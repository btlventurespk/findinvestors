// Custom server so the app runs under Hostinger's Passenger loader as well as
// via `npm start`. Passenger loads this file directly and provides PORT;
// `node server.js` uses PORT from the environment or falls back to 3000.
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      handle(req, res, parse(req.url, true));
    }).listen(port, (err) => {
      if (err) throw err;
      console.log(`> findinvestors ready on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
