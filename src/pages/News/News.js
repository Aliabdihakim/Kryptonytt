import React, { useContext } from 'react'
import "./News.css"
import { cryptoContext } from '../../App'

const News = () => {

    const {newsData} = useContext(cryptoContext)
    console.log(newsData);

    const renderNews = newsData.map(item => {
        console.log(item);
        return(
            <a href={item.url} style={{textDecoration:"none"}}>
                <div className='newsitem-div'>
                    <img className='newsitem-img' src={item.image.thumbnail.contentUrl}/>
                    <h4 className='newsitem-title'>{item.name}</h4>
                </div>
            </a>
        )
    })
    return (
        <div>
            <div className='news-container'>
                {renderNews}
            </div>
        </div>
    )
}

export default News
