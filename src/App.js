import React, { createContext, useEffect, useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Exchanges from './pages/Exchanges/Exchanges';
import axios from 'axios';
import "./App.css"


export const cryptoContext = createContext()
export const exchangesData = createContext()

const App = () => {

  const [cryptoData, setCryptoData] = useState([])
  const [exchangesData, setExchangesData] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
  const url2 = "https://api.coingecko.com/api/v3/exchanges?per_page=10";

  useEffect(()=>{
    axios.get(url)
      .then(res => {
        setCryptoData(res.data)
      })
      .catch(err => {
        console.log(err);
      })
      axios.get(url2)
        .then(res => {
          setExchangesData(res.data)
        })
        .catch(err => {
          console.log(err);
        })
  },[])


  return (
    <div>
      <cryptoContext.Provider value={{cryptoData, exchangesData}}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/borser" element={<Exchanges />}/>
        </Routes>
      </cryptoContext.Provider>
    </div>
  )
}

export default App
