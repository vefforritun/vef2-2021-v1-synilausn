/* global test, expect */
import { formatAge } from './format';

/*
  Ef aldur er meiri en eitt ár (365 dagar) er birt Fyrir X ári/árum síðan
  Annars, ef aldur er meiri en mánuður (30 dagar) er birt Fyrir X mánuði/mánuðum síðan
  Annars, ef aldur er meiri en vika (7 dagar) er birt Fyrir X viku/vikum síðan
  Annars, ef aldur er meiri en dagur (24 klst) er birt Fyrir X degi/dögum síðan
  Annars, er aldur í klukkustundum birtur Fyrir x klukkustund/klukkustundum síðan
*/

// We'd like to be able to simulate time here...
const NOW = new Date().getTime();

// Super approximate!
const MILLISECS_IN_MIN = 1000 * 60;
const MILLISECS_IN_HOUR = 1000 * 60 * 60;
const MILLISECS_IN_DAY = 1000 * 60 * 60 * 24;
const MILLISECS_IN_WEEK = 1000 * 60 * 60 * 24 * 7;
const MILLISECS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;
const MILLISECS_IN_YEAR = 1000 * 60 * 60 * 24 * 365;

test('aldur í klukkustundum birtur "Fyrir x klukkustundum" síðan, fyrir 0 klst', () => {
  expect(formatAge(NOW)).toBe('Fyrir 0 klukkustundum síðan');
});

test('aldur í klukkustundum birtur "Fyrir x klukkustundum" síðan, fyrir 1 klst', () => {
  expect(formatAge(NOW - MILLISECS_IN_HOUR)).toBe('Fyrir 1 klukkustund síðan');
});

test('aldur í klukkustundum birtur "Fyrir x klukkustundum" síðan, fyrir 10 klst', () => {
  expect(formatAge(NOW - (10 * MILLISECS_IN_HOUR))).toBe('Fyrir 10 klukkustundum síðan');
});

test('aldur í klukkustundum birtur "Fyrir x klukkustundum" síðan, fyrir 23:59 klst', () => {
  expect(formatAge(NOW - (24 * MILLISECS_IN_HOUR - MILLISECS_IN_MIN))).toBe('Fyrir 23 klukkustundum síðan');
});

test('aldur er meiri en dagur (24 klst) er birt Fyrir X degi síðan, fyrir 1 degi', () => {
  expect(formatAge(NOW - (MILLISECS_IN_DAY))).toBe('Fyrir 1 degi síðan');
});

test('aldur er meiri en dagur (24 klst) er birt Fyrir X dögum síðan, fyrir 6 dögum', () => {
  expect(formatAge(NOW - (6 * MILLISECS_IN_DAY))).toBe('Fyrir 6 dögum síðan');
});

test('ef aldur er meiri en vika (7 dagar) er birt Fyrir X viku síðan, fyrir 7 dögum', () => {
  expect(formatAge(NOW - (MILLISECS_IN_WEEK + 1))).toBe('Fyrir 1 viku síðan');
});

test('ef aldur er meiri en vika (7 dagar) er birt Fyrir X vikum síðan, fyrir 29 dögum', () => {
  expect(formatAge(NOW - (29 * MILLISECS_IN_DAY))).toBe('Fyrir 4 vikum síðan');
});

test('ef aldur er meiri en mánuður (30 dagar) er birt Fyrir X mánuði síðan, fyrir 1 mánuði', () => {
  expect(formatAge(NOW - (MILLISECS_IN_MONTH + 1))).toBe('Fyrir 1 mánuði síðan');
});

test('ef aldur er meiri en mánuður (30 dagar) er birt Fyrir X mánuðum síðan, fyrir 12 mánuðum -1 sek', () => {
  expect(formatAge(NOW - (12 * MILLISECS_IN_MONTH + 1))).toBe('Fyrir 12 mánuðum síðan');
});

test('aldur er meiri en eitt ár er birt "Fyrir X ári síðan", fyrir 1 ár', () => {
  expect(formatAge(NOW - (MILLISECS_IN_YEAR + 1))).toBe('Fyrir 1 ári síðan');
});

test('aldur er meiri en eitt ár er birt "Fyrir X árum síðan", fyrir 2 ár', () => {
  expect(formatAge(NOW - (2 * MILLISECS_IN_YEAR + 1))).toBe('Fyrir 2 árum síðan');
});
