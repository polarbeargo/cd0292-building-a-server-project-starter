import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';

function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const [state, formAction] = useState({
    width: '',
    height: 0,
    fileName: 0,
  });

  const [item, setItem] = useState('ImageThumbnailPath');

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

  const resizeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
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
        <Button variant="contained" color="primary" onClick={resizeImage}>
          Resize Image
        </Button>
        <Button variant="contained" color="secondary" onClick={thumbnailsShow}>
          Show Thumbnails
        </Button>
        {thumbnails.map((thumbnail: string, index: number) => (
          <img key={index} src={thumbnail} alt={`Thumbnail ${index}`} />
        ))}
      </header>
    </div>
  );
}

export default App;
