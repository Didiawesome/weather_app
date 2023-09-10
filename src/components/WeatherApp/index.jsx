import React, { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'
import './WeatherApp.css'
import searchIcon from '../assets/search.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'
import axios from 'axios'

const WeatherApp = () => {
  const [text, setText] = useState('')
  const [data, setData] = useState(null)
  const API_KEY = 'a6c38c1ee7440e3af5a652eccf4893d4'
  const search = async () => {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=Metric&appid=${API_KEY}`
    if (!text.trim().length) {
      return
    }
    const response = await axios.get(BASE_URL)
    if (response.statusText === 'OK') {
      const resData = await response.data
      setData(resData)
      console.log(resData)
    }
    setText('')
  }

  useEffect(() => {
    async function fetchLondon() {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=London&units=Metric&appid=${API_KEY}`
      )
      const resData = response.data
      setData(resData)
    }
    fetchLondon()
  }, [])
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="searchIcon" onClick={() => search()}>
          <img src={searchIcon} alt="" />
        </div>
      </div>

      <div className="weatherImg">
        {data ? (
          <img
            src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
            alt=""
          />
        ) : (
          <ContentLoader
            speed={5}
            width={100}
            height={100}
            viewBox="0 0 100 100"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{ marginBottom: '10px' }}
          >
            <rect x="0" y="0" rx="10" ry="10" width="100" height="100" />
          </ContentLoader>
        )}
      </div>
      <div className="weatherTemp">
        {data?.main ? (
          <span>{Math.floor(data?.main?.temp)}°C</span>
        ) : (
          <ContentLoader
            speed={5}
            width={130}
            height={80}
            viewBox="0 0 130 80"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            style={{ marginBottom: '10px' }}
          >
            <rect x="0" y="0" rx="10" ry="10" width="130" height="80" />
          </ContentLoader>
        )}
      </div>
      <div className="weatherLocation">
        {data?.name ? (
          <span> {data?.name}</span>
        ) : (
          <ContentLoader
            speed={5}
            width={100}
            height={40}
            viewBox="0 0 100 40"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="100" height="40" />
          </ContentLoader>
        )}
      </div>
      <div className="dataContainer">
        {data?.main ? (
          <div className="element">
            <img src={humidityIcon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">{data?.main?.humidity}%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
        ) : (
          <ContentLoader
            speed={2}
            width={134}
            height={80}
            viewBox="0 0 134 80"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="134" height="80" />
          </ContentLoader>
        )}

        {data?.wind ? (
          <div className="element">
            <img src={windIcon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">
                {data?.wind?.speed.toFixed(1)} km/h
              </div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        ) : (
          <ContentLoader
            speed={2}
            width={134}
            height={80}
            viewBox="0 0 134 80"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="134" height="80" />
          </ContentLoader>
        )}
      </div>
    </div>
  )
}

export default WeatherApp
