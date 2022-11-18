import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import { cryptoContext } from '../App'
import { FaAngleUp,FaAngleDown } from "react-icons/fa";

const Navbar = () => {

    const {globalData} = useContext(cryptoContext)
    
    const prc = Math.round(globalData.market_cap_change_percentage_24h_usd * 10) / 10
    
    if(globalData.length==0){
        console.log("");
    } else{
        return(
            <>
                <div className='navbar-info'>
                    <p >Valutor: <span className='navbar-info-data'>{globalData.active_cryptocurrencies}</span></p>
                    <p>Börser: <span className='navbar-info-data'>{globalData.markets}</span></p>
                    <div></div>
                    <span >Tot kryptovärde: 
                        <span className='navbar-info-data'> 
                            {Intl.NumberFormat('en-US').format(globalData.total_market_cap.sek.toFixed(0))}kr 
                            <span style={{color: prc<0 ? "red" : "green"}}>{prc}%</span>
                        </span>
                    </span>
                    <p>24h Vol: <span className='navbar-info-data'>{Intl.NumberFormat('en-US').format(globalData.total_volume.sek.toFixed(0))}kr</span></p>
                    <p></p>
                </div>

                <div className='navbar-div'>
                    <Link className='navbar-header' to="/">
                    <h1><span style={{color:"gold"}}>K</span>rypto <span style={{color:"gold"}}>S</span>verige</h1>
                    </Link>
                    <div className='navbar-links-div'>
                        <Link className='navbar-link' to="/">Kryptovalutor</Link>
                        <Link className='navbar-link' to="/borser">Börser</Link>
                        <Link className='navbar-link' to="/nyheter">Nyheter</Link>
                    </div>
                </div>
                
            </>
        )
    }
}

export default Navbar
