import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <h1 className='title'><Link to='/'>Online Newspapers</Link></h1>
    <hr />
        <ul className='navbar'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/newspaper'>Newspaper</Link></li>
            <li><Link to='/subscriber'>Subscriber</Link></li>
            <li><Link to='/subscription'>Subscription</Link></li>
        </ul>
        <hr />
    </>
  )
}

export default Navbar