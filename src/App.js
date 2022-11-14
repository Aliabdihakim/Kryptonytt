import React, { createContext, useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Exchanges from './pages/Exchanges/Exchanges';
import axios from 'axios';
import "./App.css"
import DetailCoin from './pages/DetailCoin/DetailCoin';
import Navbar from './components/Navbar';
import News from './pages/News/News';


export const cryptoContext = createContext()

const App = () => {

  const [loadin, setLoading] = useState(true)
  const [cryptoData, setCryptoData] = useState([])
  const [exchangesData, setExchangesData] = useState([])
  const [globalData, setGlobalData] = useState([])
  const [trending, setTrending] = useState([])
  const [newsData, setNewsData] = useState([])
  const [page, setPage] = useState(1)


  const url_crypto = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`;
  const url_exchanges = "https://api.coingecko.com/api/v3/exchanges?per_page=10";
  const url_global = "https://api.coingecko.com/api/v3/global";
  const url_trending = "https://api.coingecko.com/api/v3/search/trending"
  const url_news = "https://bing-news-search1.p.rapidapi.com/news"
  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search?q=crypto',
    params: {safeSearch: 'Off', textFormat: 'Raw'},
    headers: {
      'X-BingApis-SDK': 'true',
      'X-RapidAPI-Key': '32782a34c1msh2bd0ff2d84780c7p1b00d9jsn3dfe34a7f1c6',
      'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }
  };


  useEffect(()=>{
    axios.get(url_crypto)
      .then(res => {
        setCryptoData(res.data)
      })
      .catch(err => console.log(err))

      axios.get(url_exchanges)
        .then(res => {
          setExchangesData(res.data)
        })
        .catch(err => console.log(err))

      axios.get(url_global)
        .then(res => {
          setGlobalData(res.data.data)
        })
        .catch(err => console.log(err))

      axios.get(url_trending)
        .then(res => {
          setTrending(res.data.coins)
        })
        .catch(err => console.log(err))

        axios.request(options)
          .then(res => {
            setNewsData(res.data.value)
          })
          .catch(err => console.log(err))
  },[])

  console.log(newsData);

  return (
    <div>
      <cryptoContext.Provider value={{cryptoData, exchangesData, globalData, trending, newsData}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:coinId" element={<DetailCoin />}/>
          <Route path="/borser" element={<Exchanges />}/>
          <Route path="/nyheter" element={<News />}/>
        </Routes>
      </cryptoContext.Provider>
    </div>
  )
}

export default App
