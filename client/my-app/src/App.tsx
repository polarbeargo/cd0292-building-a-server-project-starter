import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {Button, Menu, MenuItem} from '@material-ui/core';
import {PhotoProvider, PhotoView} from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const [state, formAction] = useState({
    width: '',
    height: 0,
    fileName: 0,
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
    const url = `http://localhost:3002/api/ImageProcessing?filename=${state.fileName}&width=${state.width}&height=${state.height}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return await response.json();
  };

  const resizeImage = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    resizeImageAPI().then(response => {
      console.log(response);
    });
  };

  const thumbnailsShow = (): void => {
    fetchThumb().then(response => {
      setThumbnails(response.thumbnails);
    });
  };

  useEffect(thumbnailsShow, []);

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
        <Menu open>
          <MenuItem
            onClick={(e: React.MouseEvent<HTMLLIElement>) => resizeImage(e)}
          >
            Resize Image
          </MenuItem>
          <MenuItem onClick={thumbnailsShow}>Show Thumbnails</MenuItem>
        </Menu>
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
      </header>
    </div>
  );
}

export default App;
