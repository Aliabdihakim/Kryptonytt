import React, { useContext } from 'react'
import { cryptoContext } from '../../App'
import "./Exchanges.css"
import { Link } from 'react-router-dom'

const Exchanges = () => {
    const {cryptoData} = useContext(cryptoContext)
    const {exchangesData} = useContext(cryptoContext)
  
    console.log(exchangesData);

    const testar = (exchangesData).map(item => {
        return(
            <div className='single-grid-container'>
                <h3 className='single-grid-item single-h3'>{exchangesData.indexOf(item)+1}</h3>
                <div className='single-grid-item single-div'>
                    <img className='single-img' src={item.image}/>
                    <h3 className='single-h3'>{item.name}</h3>
                </div>
                <div className='single-grid-item single-div2'>
                    <h3 className='single-grid-item single-h3'>{`${item.year_established}`}</h3>
                    <h3 className='single-grid-item single-h3'>{`${item.country}`}</h3>
                    <h3 className='single-grid-item single-h3'>{`${item.trade_volume_24h_btc}`}</h3>
                    <h3 className='single-grid-item single-h3'>{`${item.trust_score}`}</h3>
                </div>
            </div>
        )
    })

  return (
    <div>
        {testar}
    </div>
  )
}

export default Exchanges
