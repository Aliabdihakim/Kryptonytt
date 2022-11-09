import React, { createContext, useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Exchanges from './pages/Exchanges/Exchanges';
import axios from 'axios';
import "./App.css"
import DetailCoin from './pages/DetailCoin/DetailCoin';
import Navbar from './components/Navbar';


export const cryptoContext = createContext()

const App = () => {

  const [loadin, setLoading] = useState(true)
  const [cryptoData, setCryptoData] = useState([])
  const [exchangesData, setExchangesData] = useState([])
  const [globalData, setGlobalData] = useState([])
  const [trending, setTrending] = useState([])


  const url_crypto = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=sek&order=market_cap_desc&per_page=1000&page=1&sparkline=false";
  const url_exchanges = "https://api.coingecko.com/api/v3/exchanges?per_page=10";
  const url_global = "https://api.coingecko.com/api/v3/global";
  const url_trending = "https://api.coingecko.com/api/v3/search/trending"


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
  },[])


  return (
    <div>
      <cryptoContext.Provider value={{cryptoData, exchangesData, globalData, trending}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/:coinId" element={<DetailCoin />}/>
          <Route path="/borser" element={<Exchanges />}/>
        </Routes>
      </cryptoContext.Provider>
    </div>
  )
}

export default App
