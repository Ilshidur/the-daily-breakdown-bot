const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const cron = require('node-cron');
const ytdl = require('ytdl-core');
const Twit = require('twit');
const { promisify } = require('util');

const config = require('./config');
const { getPublishedBreakdowns, getBreakdowns, savePublishedBreakdown } = require('./db');

const T = new Twit(config.twitter);

// The breakdowns must NOT last more than 30 seconds
// Otherwise, Twitter won't allow it.
// We'll prefer comment which the length is equal or less to 130.
const MAX_BREAKDOWN_DURATION = 30;
const AUTHOR = '@Ilshidur';

function notifyMissingBreakdowns() {
  return new Promise((resolve, reject) => {
    const tweet = {
      status: `${AUTHOR} Hey dude. I'm running out of breakdowns. Can you give me some ?`,
    };
    T.post('statuses/update', tweet, (err, data, response) => {
      if (err) {
        return reject(err);
      }
      console.log(`Hey dude. I'm running out of breakdowns. Can you give me some ?`);
      resolve();
    });
  });
}

async function getNewBreakdown() {
  const breakdowns = await getBreakdowns();

  if (breakdowns.length === 0) {
    await notifyMissingBreakdowns();
    return null;
  }

  const number = (await getPublishedBreakdowns()).length + 1;
  const breakdown = breakdowns[Math.round(Math.random() * (breakdowns.length - 1))];

  if (breakdown.end - breakdown.start > MAX_BREAKDOWN_DURATION) {
    breakdown.end = breakdown.start + 30;
  }

  return { breakdown, number };
}

async function downloadVideo(newBreakdown) {
  const downloadStream = link => ytdl(link, {
    quality: 'highestaudio',
    filter: (format) => format.container === 'mp4'
  });

  const download = (link, fileName) => new Promise((resolve, reject) => {
    const filePath = `videos/${fileName}`;
    downloadStream(link)
      .on('error', reject)
      .on('end', () => resolve(filePath))
      .pipe(fs.createWriteStream(filePath), { end: true });
  });

  const fileName = `breakdown-${Date.now()}.mp4`;
  await download(newBreakdown.link, fileName);

  return fileName;
}

async function convertBreakdown(fileName, newBreakdown) {
  const convertedFileName = `breakdown-${Date.now()}-converted.mp4`;
  const convert = () => new Promise((resolve, reject) => {
    try {
      ffmpeg(fs.createReadStream(`videos/${fileName}`))
        .format('mp4')
        .seekInput(newBreakdown.start)
        .duration(newBreakdown.end - newBreakdown.start)
        .audioCodec('aac')
        .videoCodec('libx264')
        .size('?x480')
        // .videoBitrate('800k')
        .on('error', (err, stdout, stderr) => {
          console.log('An error occurred: ' + err.message);
          console.log('ffmpeg stdout: ' + stdout);
          console.log('ffmpeg stderr: ' + stderr);
          reject(err);
        })
        .on('end', () => {
          resolve(convertedFileName);
        })
        .save(`videos/${convertedFileName}`);
    } catch (err) {
      reject(err);
    }
  });

  await convert();
  return convertedFileName;
}

async function deleteFullVideo(fileName) {
  await promisify(fs.unlink)(`videos/${fileName}`);
}

async function postBreakdown(fileName, breakdown, breakdownNumber) {
  const upload = () => new Promise(async (resolve, reject) => {

    console.log('Uploading the heaviest breakdown ...');
    T.postMediaChunked({ file_path: `videos/${fileName}` }, (err, data, response) => {
      if (err) {
        return reject(err);
      }
      resolve(data.media_id_string);
    });
  });

  const tweet = (uploadedMediaId) => new Promise((resolve, reject) => {
    console.log('Posting the most cringy tweet ...');
    const tweet = {
      status: `\u3010Daily breakdown\u3011 \u3018n° ${breakdownNumber}\u3019\n\n${breakdown.title} by ${breakdown.artist}\n${breakdown.link}&t=${breakdown.start}s\n\n${breakdown.comment}`,
      media_ids: [uploadedMediaId]
    };

    T.post('statuses/update', tweet, (err, data, response) => {
      if (err) {
        return reject(err);
      }
      console.log('Yeah we posted the heaviest breakdown so far, bro !');
      resolve();
    });
  });

  const uploadedMediaId = await upload();
  await tweet(uploadedMediaId);
}

async function goBreakdown() {
  console.log('Getting a cool breakdown ...');
  const { breakdown: newBreakdown, number } = await getNewBreakdown();

  if (!newBreakdown) {
    return;
  }

  console.log(`We got [${newBreakdown.title}] by ${newBreakdown.artist}. Sounds neat !`);

  console.log('Downloading that fucking breakdown ...');
  const fileName = await downloadVideo(newBreakdown);

  console.log('Getting the heavier breakdown ...');
  const convertedBreakdownFileName = await convertBreakdown(fileName, newBreakdown);

  await deleteFullVideo(fileName);

  await postBreakdown(convertedBreakdownFileName, newBreakdown, number);

  await savePublishedBreakdown(newBreakdown.number);
  if (process.env.NODE_ENV === 'production') {
    await deleteFullVideo(convertedBreakdownFileName);
  }

  console.log('Now go enjoy this.');
}

if (process.env.NODE_ENV === 'production') {
  cron.schedule('0 7 * * *', () => {
    console.log(`It's BREAKDOWN time !`);
    goBreakdown();
  });
} else {
  goBreakdown()
    .catch(err => console.error(err));
}
