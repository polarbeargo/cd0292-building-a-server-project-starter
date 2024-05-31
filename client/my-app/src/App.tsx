import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const [state, formAction] = useState({
    width: 0,
    height: 0,
    fileName: '',
  });

  const [itemActivity, setItemActivity] = useState('ImageThumbnailPath');

  const fetchThumb = async () => {
    const url = 'http://localhost:3002/api/ImageThumbnailPath';
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return await response.json();
  };

  const resizeImageAPI = async () => {
    const url = `http://localhost:3002/api/ImageProcessing?filename=${state.fileName || filename}&width=${state.width}&height=${state.height}`;
    const response = await fetch(url, {
      headers: {
        method: 'GET',
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };

  const thumbnailsShow = (): void => {
    fetchThumb().then(response => {
      setThumbnails(response.thumbnails);
    });
  };

  useEffect(thumbnailsShow, []);

  const [filename, setFilename] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilename(e.target.value);
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };

  const resizeImage = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    formAction({
      ...state,
      fileName: filename,
      width: width,
      height: height,
    });
    resizeImageAPI().then(response => {
      console.log(response);
    });
  };

  const resizeImageParallel = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    formAction({
      ...state,
      fileName: filename,
      width: width,
      height: height,
    });
    resizeImageAPI().then(response => {
      console.log(response);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          <li onClick={resizeImage}>Resize image</li>
          <li onClick={resizeImageParallel}>Resize Image Parallel</li>
          <li onClick={thumbnailsShow}>Show Thumbnails</li>
        </ul>
        {thumbnails.map((thumbnail: string, index: number) => (
          <img key={index} src={thumbnail} alt={`Thumbnail ${index}`} />
        ))}
        <PhotoProvider>
          {thumbnails.map((thumbnail: string, index: number) => (
            <PhotoView key={index} src={thumbnail}>
              <img src={thumbnail} alt={`Thumbnail ${index}`} />
            </PhotoView>
          ))}
        </PhotoProvider>
        <div>
          <label>Filename:</label>
          <input type="text" value={filename} onChange={handleFilenameChange} />
        </div>
        <div>
          <label>Width:</label>
          <input type="number" value={width} onChange={handleWidthChange} />
        </div>
        <div>
          <label>Height:</label>
          <input type="number" value={height} onChange={handleHeightChange} />
        </div>
      </header>
    </div>
  );
}

export default App;
