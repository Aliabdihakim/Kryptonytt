import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cryptoContext } from '../../App'
import "./DetailCoin.css"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment/moment'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const DetailCoin = () => {

    const [days, setDays] = useState(1)
    const [loading, setLoading] = useState(false)
    const [historyData, setHistoryData] = useState([])
    const {cryptoData} = useContext(cryptoContext)
    const test = useContext(cryptoContext)
    const params = useParams()
    const url_history = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=usd&days=${days}`
    const cryptoDetail = cryptoData.find(coin => coin.id==params.coinId)

    


    function getEveryNth(arr, nth) {
        const result = [];
        for (let i = 0; i < arr.length; i += nth) {
          result.push(arr[i]);
        }
        return result;
      }

    useEffect(()=>{
        axios.get(url_history)
            .then(res => {
                setHistoryData(res.data.prices)
                setLoading(true)
            })
            .catch(err => console.log(err))
     
    },[days])

    const coinChartData = historyData.map(value => {
        return({
            x:value[0],
            y:value[1].toFixed(2)
        })
    })

    const coinChartDataX = days==1 ? coinChartData.map(value => moment(value.x).format('LT')) : getEveryNth(coinChartData.map(value => moment(value.x).format('MMM DD')),10)
    const coinChartDataY = coinChartData.map(val => val.y)

   const options = {
    responsive: true
   }

   const data = {
    labels: coinChartDataX,
    datasets: [
        {
            fill: true,
            data: coinChartDataY,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ]
   }

   console.log();


    if(cryptoData.length==0){
        return (<h1>hej</h1>)
    }
        else{
            return (
                <div className='detailpage-div'>
                    <div className='detail-info-div'>
                        <div className='detail-name-div'>
                            <img src={cryptoDetail.image} className="detail-img detail-name-item"/>
                            <h4 className='detail-name-item'>{cryptoDetail.id}</h4>
                            <h4 className='detail-name-item'>{`(${(cryptoDetail.symbol).toUpperCase()})`}</h4>
                        </div>
                        <div className='detail-price-div'>
                            <h2 className='detail-price-item'>${cryptoDetail.current_price}</h2>
                            <h3 className='detail-price-item' style={{color: cryptoDetail.market_cap_change_percentage_24>0 ? "blue" : "red"}}>
                                {cryptoDetail.market_cap_change_percentage_24h}
                            </h3>
                        </div>
                    </div>
                    <div className='detail-markets-container'>
                        <div className='detail-market-div'>
                            <p>Market Cap</p>
                            <p>{cryptoDetail.market_cap}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>24 Hour Trading Vol</p>
                            <p>{cryptoDetail.market_cap}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Fully diluted valuation</p>
                            <p>{cryptoDetail.fully_diluted_valuation}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Circulating supply</p>
                            <p>{cryptoDetail.circulating_supply}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Total supply</p>
                            <p>{cryptoDetail.total_supply}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Max supply</p>
                            <p>{cryptoDetail.max_supply}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>setDays(1)}>1 Day</button>
                        <button onClick={()=>setDays(30)}>30 Days</button>
                        <button onClick={()=>setDays(90)}>3 Months</button>
                        <button onClick={()=>setDays(365)}>1 Year</button>
                    </div>
                    <Line options={options} data={data}/>
                </div>
              )
        }
  
}

export default DetailCoin
