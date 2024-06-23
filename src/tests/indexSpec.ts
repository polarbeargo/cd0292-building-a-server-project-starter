// eslint-disable-next-line node/no-unpublished-import
import superTest from 'supertest';
import {expect} from 'chai';
import app from '../index';
import fs from 'fs';
import path from 'path';
import Storage from '../storage';

describe('Test response from  / endpoint', () => {
  it('should return 200', async (): Promise<void> => {
    const response = await superTest(app).get('/');
    expect(response.status).to.equal(200);
  });
});

describe('Health Check', () => {
  it('should return 200', async () => {
    const response = await superTest(app).get('/health');
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('status');
  });
});
describe('Resize Image', (): void => {
  it('should resize image with given width, filename and height', async (): Promise<void> => {
    const err: null | string = await Storage.createImageThumbnail({
      width: '468',
      height: '256',
      filename: 'icelandwaterfall',
    });
    expect(err).to.be.null;
  });
});

it('gets /api/ImageProcessing?width=468&height=256&filename=icelandwaterfall', async (): Promise<void> => {
  const response = await superTest(app).get(
    '/api/ImageProcessing?width=468&height=256&filename=icelandwaterfall'
  );
  expect(response.status).to.equal(200);
});

it('gets /api/ImageProcessing?width=-468&height=256&filename=icelandwaterfall', async (): Promise<void> => {
  const response = await superTest(app).get(
    '/api/ImageProcessing?width=-468&height=256&filename=icelandwaterfall'
  );
  expect(response.status).to.equal(200);
});

describe('Get ImageProcessing API', () => {
  it('should return 200', async () => {
    const response = await superTest(app).get('/api/ImageProcessing');
    expect(response.status).to.equal(200);
  });
});

describe('Get ImageThumbnailPath API', () => {
  it('should return 200', async () => {
    const response = await superTest(app).get('/api/ImageThumbnailPath');
    expect(response.status).to.equal(200);
  });
});

describe('POST /ImageProcessingParallel', () => {
  it('should resize images and return 200', async () => {
    const response = await superTest(app).get(
      '/api/ImageProcessingParallel?filename=icelandwaterfall&width=500&height=300'
    );

    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Images resized successfully');
  });
});

afterAll(async () => {
  const resizedImagePath: string = path.resolve(
    Storage.imageThumbnailPath,
    'icelandwaterfall_468x256.jpg'
  );

  try {
    fs.unlinkSync(resizedImagePath);
  } catch (err) {
    console.error(err);
  }
});
