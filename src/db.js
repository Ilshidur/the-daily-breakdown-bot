const fs = require('fs');
const { promisify } = require('util');

const breakdownsFilePath = 'breakdowns.json';
const publishedBreakdownsFileName = './db/published_breakdowns.json';

async function getPublishedBreakdowns() {
  const data = await promisify(fs.readFile)(publishedBreakdownsFileName, { flag: 'a+' });
  return (data && data.length > 0) ? JSON.parse(data.toString()) : [];
}

async function getBreakdowns() {
  const data = await promisify(fs.readFile)(breakdownsFilePath);
  const breakdowns = JSON.parse(data.toString());

  const publishedBreakdowns = await getPublishedBreakdowns();

  return breakdowns.filter(breakdown => !publishedBreakdowns.includes(breakdown.number));
}

async function savePublishedBreakdown(breakdownNumber) {
  let publishedBreakdowns = await getPublishedBreakdowns();

  publishedBreakdowns = [...publishedBreakdowns, breakdownNumber];

  await promisify(fs.writeFile)(publishedBreakdownsFileName, JSON.stringify(publishedBreakdowns, ' ', 2));
}

module.exports = { getPublishedBreakdowns, getBreakdowns, savePublishedBreakdown };
