import React, { useContext } from 'react'
import { cryptoContext } from '../App'
import "./SingleCrypto.css"
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const SingleCrypto = () => {

    const handleDragStart = (e) => e.preventDefault();

    const {cryptoData, trending} = useContext(cryptoContext)
    console.log(trending);
    const bitcoinPrice = cryptoData.length>0 ? cryptoData[0].current_price : 10

    const responsive = {
        0: {
          items: 2,
        },
        800: {
          items: 4,
        },
      };

    const trendingCoin = trending.map(coin => {
        return(
            <div className='trending-div'>
                    <h4 className='trending-title'>{coin.item.id[0].toUpperCase() + (coin.item.id).substring(1)}</h4>
                    <Link>
                        <img className='trending-img' src={coin.item.small}/>
                    </Link>
                    <p className='trending-rank'>Rank: {coin.item.market_cap_rank}</p>
                    <p className='trending-price'>{(coin.item.price_btc*bitcoinPrice).toFixed(2)}kr</p>
            </div>
        )
    })


    const testar = cryptoData.map(item => {
        return(
            <Link key={item.id} style={{textDecoration:"none", color:"black"}} to={`/${item.id}`}>
                <div key={item.id} className='single-grid-container'>
                    <h3 className='single-grid-item single-h3'>{cryptoData.indexOf(item)+1}</h3>
                    <div className='single-grid-item single-div'>
                        <img className='single-img' src={item.image}/>
                        <h3 className='single-h3'>{item.name}</h3>
                        <h3 className='single-h3' style={{fontWeight:"600"}}>{(item.symbol).toUpperCase()}</h3>
                    </div>
                    <div className='single-grid-item single-div2'>
                        <h3 className='single-grid-item single-h3'>{`${Intl.NumberFormat('en-US').format(item.current_price.toFixed(0))}kr`}</h3>
                        <h3 className='single-grid-item single-h3' style={{color: item.market_cap_change_percentage_24h<0 ? "red" : "green"}}>{`${item.market_cap_change_percentage_24h.toFixed(2)}%`}</h3>
                        <h3 className='single-grid-item single-h3'>{`${Intl.NumberFormat('en-US').format(item.market_cap)}kr`}</h3>
                        <h3 className='single-grid-item single-h3'>{`${Intl.NumberFormat('en-US').format(item.total_volume)}kr`}</h3>
                        <h3 className='single-grid-item single-h3'>{`${Intl.NumberFormat('en-US').format(item.circulating_supply)}`}</h3>
                    </div>
                </div>
            </Link>
        )
    })

  return (
    <div>
        <div style={{backgroundColor:"#28242c", borderRadius:"30px"}}>
            <h1 className='trending-header'>Trendiga valutor</h1>
            <AliceCarousel 
            mouseTracking 
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            autoPlay
            responsive={responsive}
            items={trendingCoin} />
        </div>

        <div className='single-grid-container-scroll'>
                <div className='single-grid-container' style={{borderStyle:"none"}}>
                        <h3 className='single-grid-item single-h3 single-header'>#</h3>
                        <div className='single-grid-item single-div'>
                            <img className='single-img'/>
                            <h3 className='single-h3 single-header'>Namn</h3>
                            <h3 className='single-h3' style={{fontWeight:"600"}}></h3>
                        </div>
                        <div className='single-grid-item single-div2'>
                            <h3 className='single-grid-item single-h3 single-header'>Pris</h3>
                            <h3 className='single-grid-item single-h3 single-header'>24h%</h3>
                            <h3 className='single-grid-item single-h3 single-header'>Marknadsvärde</h3>
                            <h3 className='single-grid-item single-h3 single-header'>Volym(24h)</h3>
                            <h3 className='single-grid-item single-h3 single-header' >Cirkulation</h3>
                        </div>
                    </div>
                {testar}
        </div>
    </div>
  )
}

export default SingleCrypto