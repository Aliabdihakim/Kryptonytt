import React, { useContext } from 'react'
import { cryptoContext } from '../App'
import "./SingleCrypto.css"
import { Link } from 'react-router-dom'

const SingleCrypto = () => {

    const {cryptoData} = useContext(cryptoContext)
    console.log(cryptoData);

    const testar = cryptoData.map(item => {
        return(
            <div key={item.id} className='single-grid-container'>
                <h3 className='single-grid-item single-h3'>{cryptoData.indexOf(item)+1}</h3>
                <div className='single-grid-item single-div'>
                    <img className='single-img' src={item.image}/>
                    <h3 className='single-h3'>{item.name}</h3>
                    <h3 className='single-h3' style={{fontWeight:"600"}}>{(item.symbol).toUpperCase()}</h3>
                </div>
                <div className='single-grid-item single-div2'>
                    <h3 className='single-grid-item single-h3'>{`$${item.current_price}`}</h3>
                    <h3 className='single-grid-item single-h3'>{`${item.market_cap_change_percentage_24h}%`}</h3>
                    <h3 className='single-grid-item single-h3'>{`$${item.market_cap}`}</h3>
                    <h3 className='single-grid-item single-h3'>{`$${item.total_volume}`}</h3>
                    <h3 className='single-grid-item single-h3'>{`${item.circulating_supply}`}</h3>
                </div>
            </div>
        )
    })

  return (
    <div>
        <div className='single-grid-container'>
                <h3 className='single-grid-item single-h3 single-header'>#</h3>
                <div className='single-grid-item single-div'>
                    <img className='single-img'/>
                    <h3 className='single-h3 single-header'>Name</h3>
                    <h3 className='single-h3' style={{fontWeight:"600"}}></h3>
                </div>
                <div className='single-grid-item single-div2'>
                    <h3 className='single-grid-item single-h3 single-header'>Price</h3>
                    <h3 className='single-grid-item single-h3 single-header'>24h%</h3>
                    <h3 className='single-grid-item single-h3 single-header'>MarketCap</h3>
                    <h3 className='single-grid-item single-h3 single-header'>Volume(24h)</h3>
                    <h3 className='single-grid-item single-h3 single-header' >Circulatingsupply</h3>
                </div>
            </div>
        {testar}
    </div>
  )
}

export default SingleCrypto