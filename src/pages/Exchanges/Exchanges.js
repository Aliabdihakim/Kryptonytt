import React, { useContext } from 'react'
import { cryptoContext } from '../../App'
import "./Exchanges.css"
import { Link } from 'react-router-dom'

const Exchanges = () => {
    const {cryptoData} = useContext(cryptoContext)
    const {exchangesData} = useContext(cryptoContext)
    console.log(cryptoData);
    let country;
    const bitcoinPrice = cryptoData.length>0 ? cryptoData[0].current_price : 10

    if(exchangesData.length>0){
        const testar = (exchangesData).map(item => {
           
            console.log(item);
            country = (item.country)
            return(
                <div key={item.id} className='exchange-grid-container'>
                    <h3 className='exchange-grid-item exchange-h3'>{exchangesData.indexOf(item)+1}</h3>
                    <div className='exchange-grid-item exchange-div'>
                        <img className='exchange-img' src={item.image}/>
                        <h3 className='exchange-h3'>{item.name}</h3>
                    </div>

                    <div className='exchange-grid-item exchange-div2'>
                        <h3 className='exchange-grid-item exchange-h3'>{`${item.year_established}`}</h3>
                        {(item.country)!=null && <h3 className='exchange-grid-item exchange-h3'>{`${(country)}`}</h3>}
                        {(item.country)===null && <h3 className='exchange-grid-item exchange-h3'>{`-`}</h3>}
                        <h3 className='exchange-grid-item exchange-h3'>{`${Intl.NumberFormat('en-US').format((bitcoinPrice*item.trade_volume_24h_btc).toFixed(0))}kr`}</h3>
                        <h3 className='exchange-grid-item exchange-h3'>{`${item.trust_score}`}</h3>
                    </div>
                </div>
            )
        }) 
    
      return (
        <div>
            <div style={{textAlign:"center", padding:"20px"}}>
                <h1>Populära börser</h1>
                <p>Se vart du kan köpa kryptovalutor</p>
            </div>
            <div className='exchange-grid-container-scroll'>
                <div className='exchange-grid-container'>
                        <h3 className='exchange-grid-item exchange-h3'>#</h3>
                        <div className='exchange-grid-item exchange-div'>
                            <img className='exchange-img'/>
                            <h3 className='exchange-h3'>Namn</h3>
                        </div>

                        <div className='exchange-grid-item exchange-div2'>
                            <h3 className='exchange-grid-item exchange-h3'>År</h3>
                            <h3 className='exchange-grid-item exchange-h3'>Land</h3>
                            <h3 className='exchange-grid-item exchange-h3'>Volym(24h)</h3>
                            <h3 className='exchange-grid-item exchange-h3'>Betyg</h3>
                        </div>
                    </div>
                {testar}
            </div>
        </div>
      )
    }

    
}

export default Exchanges
