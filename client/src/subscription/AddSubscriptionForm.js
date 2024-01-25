import React from 'react'
import { useState } from 'react';

const AddSubscriptionForm = ({onFormSubmit, calculatePrice}) => {

  const [newspaperName, setNewspaperName] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('One week');

  const handleFormSubmit = (e) =>{
    e.preventDefault();

    const price = calculatePrice(subscriptionType);

    const subscription = {
      newspaperName: newspaperName,
      subscriberEmail: subscriberEmail,
      type: subscriptionType,
      price: price
    }
    onFormSubmit(subscription);

    setNewspaperName('');
    setSubscriberEmail('');
    setSubscriptionType('One week');
  }


  return (
    <form className = 'addForm subscriptionForm' onSubmit={handleFormSubmit}>
       <div key={0} className='inputLabel'>
        <label htmlFor='newspaper_name'>Newspaper:</label>
        <input 
          type="text"
          id='newspaper_name'
          autoFocus
          required
          placeholder='Enter...'
          value={newspaperName}
          onChange={(e) => setNewspaperName(e.target.value)}
        />
      </div>
      <div key={1} className='inputLabel'>
        <label htmlFor='subscriber_email'>Subscriber Email:</label>
        <input 
          type="email"
          id='subscriber_email'
          required
          placeholder='Enter...'
          value={subscriberEmail}
          onChange={(e) => setSubscriberEmail(e.target.value)}
        />
      </div>
      <div key={2} className='selectLabel'>
        <label htmlFor="subscription_type">Period:</label>
        <select id='subscription_type' value={subscriptionType} onChange={(e) => setSubscriptionType(e.target.value)}>
            <option value="One week">One week</option>
            <option value="One month">One month</option>
            <option value="Six months">Six months</option>
            <option value="One year">One year</option>
        </select>
      </div>
      <div key={3} className='priceLabel'>
        <label className='price'>Price:</label>
        <p className='priceTag'>{calculatePrice(subscriptionType)}$</p>
      </div>
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
  )
}

export default AddSubscriptionForm