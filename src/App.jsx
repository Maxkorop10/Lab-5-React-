import { useState } from 'react'
import './styles/App.css'
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  

  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const urlPattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
      '((\\d{1,3}\\.){3}\\d{1,3}))'+
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
      '(\\?[;&a-z\\d%_.~+=-]*)?'+
      '(\\#[-a-z\\d_]*)?$','i');
    if (!urlPattern.test(url)) {
      setError('Incorrect URL');
      return;
    }

    try {
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      const response = await axios.post(`${CORS_PROXY}https://cleanuri.com/api/v1/shorten`, { url });
      setShortenedUrl(response.data.result_url);
      setError('');
    } catch (error) {
      console.error('Error during URL shortening:', error);
      setError('Error during URL shortening');
    }
  };

  return (
    <div>
      <h1 className='mt-[120px] font-semibold text-4xl mb-5'>Shortener URL</h1>
      <form onSubmit={handleSubmit}>
        <input className='border-[#8c8c8c] rounded-[8px] border-2' type="text" value={url} onChange={handleChange} placeholder="Paste URL address" />
        <button className='ml-[10px] border-[#8c8c8c] rounded-[8px] border-2 w-[70px]' type="submit">Create</button>
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
      {shortenedUrl && (
        <div className='mt-4 text-blue-600'>
          <p className='text-black'>Short URL:</p>
          <a className='text-blue-600' href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
        </div>
      )}
    </div>
  );
}

export default App
