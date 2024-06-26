'use strict';
const OS = require('os');
process.env.UV_THREADPOOL_SIZE = OS.cpus().length;

import sharp from 'sharp';
import async from 'async';
import assert from 'assert';
import {exec, execSync} from 'child_process';

const width = 720;
const height = 480;
const fixtures = {
  inputJpg: 'images/fjord.jpg',
  outputJpg: 'images/thumbnails/fjord_720x480.jpg',
};

// Spawn one thread per physical CPU core
const physicalCores = Number(
  execSync('lscpu -p | egrep -v "^#" | sort -u -t, -k 2,4 | wc -l', {
    encoding: 'utf-8',
  }).trim()
);
console.log(`Detected ${physicalCores} physical cores`);
sharp.concurrency(physicalCores);
sharp.simd(true);

// use sharp.counters() create timer
const timer = setInterval(() => {
  console.dir(sharp.counters());
}, 100);

interface ResizeParams {
  width: number;
  height: number;
  source: string;
  target: string;
}

const resizeImage = async (params: ResizeParams): Promise<null | string> => {
  try {
    // resize the image
    await sharp(params.source)
      .resize(params.width, params.height)
      .toFormat('jpeg')
      .toFile(params.target);
    return null;
  } catch (err) {
    return 'Image process failed';
  }
};

export const resizeImageParallel = async.mapSeries(
  [1, 1, 2, 4, 8, 16, 32, 64],
  async (parallelism, next) => {
    const start = new Date().getTime();
    const promises = Array.from({length: parallelism}, async (_, id) => {
      return new Promise((resolve, reject) => {
        sharp(fixtures.inputJpg)
          .resize(width, height)
          .toFile(fixtures.outputJpg, err => {
            if (err) {
              reject(err);
            } else {
              resolve(new Date().getTime() - start);
            }
          });
      });
    });

    try {
      const ids = await Promise.all(promises);
      assert(ids && ids.length === parallelism);
      ids && ids.sort();
      const mean =
        (ids as number[]).reduce((a: number, b: number) => a + b) / ids.length;
      console.log(
        parallelism +
          ' parallel calls: fastest=' +
          ids[0] +
          'ms slowest=' +
          ids[ids.length - 1] +
          'ms mean=' +
          mean +
          'ms'
      );
      next();
    } catch (err: any) {
      next(err);
    }
  },
  () => {
    clearInterval(timer);
    console.dir(sharp.counters());
  }
);

interface ParallelResizeOptions {
  tasks: ResizeParams[];
  concurrency: number;
}

export const resizeImagesInParallel = async ({
  tasks,
  concurrency,
}: ParallelResizeOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    async.eachLimit(
      tasks,
      concurrency,
      async task => {
        try {
          await resizeImage(task);
        } catch (error) {
          reject(error);
        }
      },
      error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      }
    );
  });
};

export default resizeImage;
