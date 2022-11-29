import React, { useContext } from 'react'
import "./News.css"
import { cryptoContext } from '../../App'

const News = () => {

    const {newsData} = useContext(cryptoContext)

    if(newsData.length!=0){
        const renderNews = newsData.map(item => {
            console.log(item);
            return(
                <a href={item.url} style={{textDecoration:"none", margin:"0"}} >
                    <div className='newsitem-div'>
                        {/*<img className='newsitem-img' src={item.image.thumbnail.contentUrl}/>*/}
                        <h4 className='newsitem-title'>{item.name}</h4>
                    </div>
                </a>
            )
        })
    
        return (
            <div>
                <div style={{textAlign:"center", padding:"20px"}}>
                    <h1>Senaste kryptonyheter</h1>
                    <p>Läs det senaste om krypto.</p>
                </div>
                <div className='news-container'>
                    {renderNews}
                </div>
            </div>
        )
    } else{
        console.log("hej");
    }

    
}

export default News
