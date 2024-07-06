# Image Processing API

[image1]: ./images/ImageProcessingAPI2.png
[image2]: ./images/Demo.gif

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

For this project, refactor and test as much as possible while you are building. Since you are using TypeScript and an unfamiliar library, it is sometimes easier to write and build in plain JS to see what your functions return; remember your submission needs to be in TypeScript. As your skills improve, typing in TypeScript will feel more intuitive. Make sure to remove any debugging code from your final submission.

## Getting Started

Usually, you would get some starter code to build from, but with this project, it’s your job to prove you can do it from scratch, so all that is being provided for you is a folder of license-free stock images you are welcome to use. If you would like to use your own images for this project, you are welcome to do so, but whoever reviews your project will see your images, and when you display your project online, viewers will also see them.

You can use your own images or use the ones provided in this repo: [images](images)

## Project Features

- resizeImage: This function resizes an image asynchronously to a specific width and height. The function should return a promise that resolves to a buffer of the resized image.

  - Can operate from React Client.

- resizeImageParallel: This function resizes an image asynchronously to a specific width and height in parallel. The function should return a promise that resolves to a buffer of the resized image.

  - Launching as the server starts will return the time to resize an image in parallel.

- resizeImagesInParallel: This function resizes an array of images asynchronously to a specific width and height in parallel. The function should return a promise that resolves to an array of buffers of the resized images.

  - Can operate from React Client.

- Show Thumbnails: This function display thumbnails of images asynchronously in a file system.

  - Can operate from React Client.

## Software Design Architecture

![][image1]

- Storage class: By design this functor encapsulates behaviors and states within an object when we need to pass behaviors or characters as a parameter or when we want to maintain state between function calls to provide a clean interface to interact with the object. This class performs operations on images in a file system such as resizing images and getting thumbnails of images in a file system.

- utilities: This module contains utility functions that are used to perform operations on images in a file system such as resizing a image, resize a image in parallel, resize images in parallel and getting thumbnails of images in a file system.

- routes: This module contains routes that are used to receive HTTP call from the React client and perform workflow operations on an image or images in a file system such as check file exsist, resizing a image, resize images in parallel and getting thumbnails of images in a file system.

- middleware: This module contains middleware funcation that are used to perform error handling.

## Requirements

- Node v16.16.0

### Formatting

```bash
npx prettier --write .
```

## Local Installation

### Start the server

```bash
npm install
npm start
```

### Start the client

```bash
cd client/my-app
npm install
npm run start
```

### Run tests

```bash
npm run test
```

## Operate leak.sh

... To be continued

## Docker deployment

Server and client can be deployed using Docker. The following steps are required to deploy the server and client using Docker.

- cd into the project directory

```
 ./docker_run.sh
```

- cd into the client directory

```
cd client/my-app
./client_docker_run.sh
```

## Demo
![][image2]

## Future Improvements

- Utilize the `worker_threads` module to leverage the power of parallel processing for advanced computational tasks. Dynamically spawn threads based on the number of physical CPU cores available on the machine to efficiently resize all images in parallel within a given file system in one button click.

- Leverage on `TensorFlow.js` its ability to take advantage of the underlying hardware's parallel processing capabilities. It uses WebGL, which is a JavaScript API for rendering graphics on the GPU, to perform computations in parallel. This allows TensorFlow.js to execute operations much faster compared to traditional CPU-based computations.
  By utilizing parallel processing, TensorFlow.js can handle complex computational tasks more efficiently to process multiple inputs simultaneously, improving performance. It can distribute the computations across multiple cores or GPUs

## License

[License](LICENSE.txt)
