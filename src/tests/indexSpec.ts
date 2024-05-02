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
    await Storage.createImageThumbnail({
      width: '468',
      height: '256',
      fileName: 'icelandwaterfall',
    });
  });
});

it('gets /api/ImageProcessing?filename=icelandwaterfall&width=468&height=256', async (): Promise<void> => {
  const response = await superTest(app).get(
    '/api/ImageProcessing?filename=icelandwaterfall&width=468&height=256'
  );
  expect(response.status).to.equal(200);
});

it('gets /api/ImageProcessing?filename=icelandwaterfall&width=-468&height=256', async (): Promise<void> => {
  const response = await superTest(app).get(
    '/api/ImageProcessing?filename=icelandwaterfall&width=-468&height=256'
  );
  expect(response.status).to.equal(200);
});

//  Return error if width isn't a number
describe('Image Processing width is not a number', () => {
  it('should return 400', async () => {
    const response = await superTest(app).get('/api/ImageProcessing?width=abc');
    expect(response.status).to.equal(404);
  });
});

//  Return error if height isn't a number
describe('Image Processing height is not a number', () => {
  it('should return 400', async () => {
    const response = await superTest(app).get(
      '/api/ImageProcessing?height=abc'
    );
    expect(response.status).to.equal(400);
  });
});

//  Return error if file does not exist
describe('Image Processing file does not exist', () => {
  it('should return 400', async () => {
    const response = await superTest(app).get(
      '/api/ImageProcessing?width=800&height=600&name=abc.jpg'
    );
    expect(response.status).to.equal(400);
  });
});

// Return error if parameters are not provided
describe('Image Processing parameters not provided', () => {
  it('should return 400', async () => {
    const response = await superTest(app).get('/api/ImageProcessing');
    expect(response.status).to.equal(400);
  });
});

// Return message if image not found
describe('Image Processing image not found', () => {
  it('should return 404', async () => {
    const response = await superTest(app).get('/api/ImageProcessing?width=800');
    expect(response.status).to.equal(404);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.equal('File does not exist');
  });
});

// Return success if resize image successful
describe('Image Processing resize image successful', () => {
  it('should return 200', async () => {
    const response = await superTest(app).get(
      '/api/ImageProcessing?width=800&height=600&name=sample.jpg'
    );
    expect(response.status).to.equal(200);
  });
});

afterAll(async () => {
  const resizedImagePath: string = path.resolve(
    Storage.imageThumbnailPath,
    'icelandwaterfall_728x640.jpg'
  );

  try {
    fs.unlinkSync(resizedImagePath);
  } catch (err) {
    console.error(err);
  }
});
