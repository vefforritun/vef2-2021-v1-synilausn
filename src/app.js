import express from 'express';

import { router as videoRouter } from './videos.js';
import { formatAge, formatDuration } from './lib/format.js';

const app = express();

//
const publicPath = new URL('../public', import.meta.url).pathname;
app.use(express.static(publicPath));

const viewsPath = new URL('../views', import.meta.url).pathname;
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.locals.formatAge = formatAge;
app.locals.formatDuration = formatDuration;

app.use('/', videoRouter);

/**
 * Middleware sem sér um 404 villur.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = 'Myndband fannst ekki';
  const subtitle = 'Myndbandið sem þú ert að leita að finnst ekki 😨';
  res.status(404).render('error', { title, subtitle });
}

/**
 * Middleware sem sér um villumeðhöndlun.
 *
 * @param {object} err Villa sem kom upp
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  console.error(err);
  const title = 'Villa kom upp';
  const subtitle = err.message;
  res.status(500).render('error', { title, subtitle });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`);
});
