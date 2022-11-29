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
    const url_history = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=sek&days=${days}`
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

    const coinChartDataX = days==1 ? coinChartData.map(value => moment(value.x).format('L')) : getEveryNth(coinChartData.map(value => moment(value.x).format('MMM DD')),10)
    const coinChartDataY = coinChartData.map(val => val.y)

   const options = {
    responsive: true
   }

   const data = {
    labels: coinChartDataX,
    datasets: [
        {
            label: 'Pris',
            fill: true,
            data: coinChartDataY,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ],
    options: {
        plugins: {
           legend: {
              display: false
           }
        }
      }
   }


    if(cryptoData.length==0){
        console.log("");
    }
        else{
            console.log(cryptoData);
            let maxSupply = cryptoDetail.max_supply==null ? <h1>-</h1> : cryptoDetail.max_supply; 
            return (
                <div className='detailpage-div'>
                    <div className='detail-info-div'>
                        <div className='detail-name-div'>
                            <img src={cryptoDetail.image} className="detail-img detail-name-item"/>
                            <h4 className='detail-name-item'>{cryptoDetail.id}</h4>
                            <h4 className='detail-name-item'>{`(${(cryptoDetail.symbol).toUpperCase()})`}</h4>
                        </div>
                        <div className='detail-price-div'>
                            <h2 className='detail-price-item'>{Intl.NumberFormat('en-US').format(cryptoDetail.current_price)}kr</h2>
                            <h3 className='detail-price-item' style={{color: cryptoDetail.market_cap_change_percentage_24>0 ? "blue" : "red"}}>
                                {(cryptoDetail.market_cap_change_percentage_24h).toFixed(3)}%
                            </h3>
                        </div>
                    </div>
                    <div className='detail-markets-container'>
                        <div className='detail-market-div'>
                            <p>Marknadsvärde</p>
                            <p>{Intl.NumberFormat('en-US').format(cryptoDetail.market_cap)} kr</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>24h högsta värde</p>
                            <p>{Intl.NumberFormat('en-US').format(cryptoDetail.high_24h)} kr</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Helt utspätt marknadsvärde</p>
                            <p>{Intl.NumberFormat('en-US').format(cryptoDetail.fully_diluted_valuation)} kr</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Cirkulation</p>
                            <p>{Intl.NumberFormat('en-US').format(cryptoDetail.circulating_supply)}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Omlopp</p>
                            <p>{Intl.NumberFormat('en-US').format(cryptoDetail.total_supply)}</p>
                        </div>
                        <div className='detail-market-div'>
                            <p>Max omlopp</p>
                            <p>{Intl.NumberFormat('en-US').format(maxSupply)}</p>
                        </div>
                    </div>

                    <div className='detail-button-div'>
                        <div>
                            <button className='detail-graph-button' 
                            style={{backgroundColor:"#33465f"}}>
                                Pris
                            </button>
                        </div>
                        <div className='detail-graph-button-div'>
                            <button className='detail-graph-button' onClick={()=>setDays(1)}>1 Dag</button>
                            <button className='detail-graph-button' onClick={()=>setDays(30)}>30 Dagar</button>
                            <button className='detail-graph-button' onClick={()=>setDays(90)}>3 Månader</button>
                            <button className='detail-graph-button' onClick={()=>setDays(365)}>1 År</button>
                        </div>
                    </div>
                    <Line options={options} data={data}/>
                </div>
              )
        }
  
}

export default DetailCoin
