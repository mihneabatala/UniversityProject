import React from 'react'
import Homepage from './home/Homepage'
import Newspaper from './newspaper/Newspaper'
import Subscriber from './subscriber/Subscriber'
import Subscription from './subscription/Subscription'
import Navbar from './Navbar'
import {  Routes,Route} from 'react-router-dom'
const App = () => {
  
  return (
    <>
      
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/newspaper' element={<Newspaper/>} />
          <Route path='/subscriber' element={<Subscriber/>} />
          <Route path='/subscription' element={<Subscription/>} />
        </Routes>
      
    </>
  )
}

export default App;
