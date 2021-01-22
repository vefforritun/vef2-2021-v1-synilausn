import { promises as fs } from 'fs';
import express from 'express';

export const router = express.Router();

/**
 * Higher-order fall sem umlykur async middleware með villumeðhöndlun.
 *
 * @param {function} fn Middleware sem grípa á villur fyrir
 * @returns {function} Middleware með villumeðhöndlun
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Les inn lista af myndböndum úr JSON skrá.
 *
 * @returns {promise} Promise sem inniheldur gögn úr JSON skrá
 */
async function readList() {
  try {
    const file = await fs.readFile('./videos.json');
    return JSON.parse(file);
  } catch (e) {
    throw new Error('Gat ekki lesið JSON skrá');
  }
}

/**
 * Route handler sem birtir lista af myndböndum.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 */
async function index(req, res) {
  const title = 'Fræðslumyndbandaleigan';
  const { videos, categories } = await readList();

  const mapCategory = (category) => {
    const mappedVideos = (category.videos || [])
      .map((id) => (videos || []).find((v) => v.id === id))
      .filter(Boolean);

    return {
      title: category.title,
      videos: mappedVideos,
    };
  };

  const mappedCategories = categories.map(mapCategory);

  res.render('index', { title, categories: mappedCategories });
}

/**
 * Route handler sem birtir fyrirlestur. Ef fyrirlestur finnst ekki í JSON skrá
 * er kallað í next() sem mun enda í 404 handler.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
async function video(req, res, next) {
  const { id } = req.params;

  const json = await readList();
  const { videos } = json;

  const foundVideo = (videos || []).find((a) => a.id === parseInt(id, 10));

  if (!foundVideo) {
    // sendum í 404 handler
    return next();
  }

  const { title } = foundVideo;

  return res.render('video', { title, video: foundVideo });
}

router.get('/', catchErrors(index));
router.get('/:id', catchErrors(video));
