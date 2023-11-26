import React, { useRef, useState } from "react"
import './styling/App.css'
import axios from 'axios'
import { youtube_parser } from './idParsing'

const App = () =>{

  const inputUrlRef = useRef()
  const [urlResult, setUrlResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value)

    console.log(youtubeID)

    const options = {
      method: 'get', 
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: {
        id: youtubeID
      },
      headers: {
        'X-RapidAPI-Key':
         'b06b5f060emsha99de0e5505582ap16b128jsn07c6776f2f9b',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    }
    
   axios(options)
    .then(res => setUrlResult(res.data))
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
      <button type="submit">Search</button>
    </form>

    <a>Download</a>
    
    </div>
    
    </div>
  )
}
export default App