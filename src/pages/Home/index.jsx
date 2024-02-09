import React from 'react'
import "./index.scss"
import Header from '../../components/Header'
import Carousel from './Carousel'
import moreAbout from '../../assets/more-about.png'

const Home = () => {
  return (
    <div className='Home'>

        <Header />

        <Carousel />

        <div className="MoreAbout">
            <img src={moreAbout} alt="" />
            <div className="text">
                <h2>Lorem ipsum dolor sit amet consectetur</h2>
                <p>Lorem ipsum dolor sit amet consectetur. Nibh sit turpis nunc purus iaculis in tellus. Aliquet morbi arcu mi ante placerat porttitor laoreet at. </p>
                <p>Orci diam et diam libero dapibus. Consectetur pretium sed proin pretium. Sagittis aliquet integer adipiscing facilisis lectus vestibulum accumsan semper commodo.</p>
                <p>Commodo sit vulputate vitae tempus ac et augue. Aliquam ipsum elementum aenean mattis tincidunt massa. Commodo lorem convallis fames egestas sed tincidunt.</p>
            </div>
        </div>
    </div>
  )
}

export default Home