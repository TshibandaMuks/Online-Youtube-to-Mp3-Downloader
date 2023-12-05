import React, { useRef, useState } from "react"
import './styling/App.css'
import axios from 'axios'
import { youtube_parser } from './idParsing'

const App = () =>{

  const inputUrlRef = useRef()
  const [urlResult, setUrlResult] = useState(null)
  const [downloadReady,setDownloadReady] = useState('nothing to download enter a valid link')

  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const youtubeID = youtube_parser(inputUrlRef.current.value)
    console.log(youtubeID)
    
  
    const options = {
      method: 'GET',
      url: 'https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/',
      params: {
        url: inputUrlRef.current.value
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp3-downloader2.p.rapidapi.com'
      }
    };
    
    axios(options)
    .then(res => { setUrlResult(res.data.link)
                   console.log(`response is ${res.data.link}`)
                   setDownloadReady('Ready! Click here to download')})
                  .catch(err => console.log(err))

    inputUrlRef.current.value = ''
  }

  return(
    <div className="mainPage">
    <div className="content">
    <h1 className="title">YouTube to MP3</h1>
    <form onSubmit = {handleSubmit} className="dataForm">
      <label for="searchUrl">Please insert a valid YouTube video URL</label>
      <input ref={inputUrlRef} id="searchUrl" type="text" placeholder="youtube.com/watch?v=dQw4w9WgXcQ"></input>
      <button type="submit" onClick={() => setDownloadReady('Loading, might take a while please wait...')}>Search</button>
    </form>

    
    <a target="_blank" rel="noreferrer" href={urlResult}>
        {downloadReady}
    </a>

    
    </div>
    
    </div>
  )
}
export default App