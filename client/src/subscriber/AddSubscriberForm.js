import React, { useState } from 'react'

const AddSubscriber = ({ onFormSubmit }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const subscriber = {
      name: name,
      email: email,
      city: city
    }
    onFormSubmit(subscriber);
    setName('');
    setEmail('');
    setCity('');
  }

  return (
    <form className = 'addForm biggerForm' onSubmit={handleFormSubmit}>
       <div key={0} className='inputLabel'>
        <label htmlFor='subscriber_name'>Name:</label>
        <input 
          type="text"
          id='subscriber_name'
          autoFocus
          required
          placeholder='Enter...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div key={1} className='inputLabel'>
        <label htmlFor='subscriber_email'>Email:</label>
        <input 
          type="email"
          id='subscriber_email'
          required
          placeholder='Enter...'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div key={2} className='inputLabel'>
        <label htmlFor='subscriber_city'>City:</label>
        <input 
          type="text"
          id='subscriber_city'
          required
          placeholder='Enter...'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
  )
}

export default AddSubscriber