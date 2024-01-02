import React from 'react'

const AddSubscriptionForm = ({input1, input2 , subscriptionType, setInput1, setInput2, setSubscriptionType, handleFormSubmit, calculatePrice}) => {

    

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
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div key={1} className='inputLabel'>
        <label htmlFor='subscriber_email'>Subscriber Email:</label>
        <input 
          type="email"
          id='subscriber_email'
          required
          placeholder='Enter...'
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
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
        <p className='priceTag'>{calculatePrice()}$</p>
      </div>
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
  )
}

export default AddSubscriptionForm