import React from 'react'

const AddSubscriber = ({input1, input2 , input3, setInput1, setInput2, setInput3, handleFormSubmit}) => {
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
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
        />
      </div>
      <div key={1} className='inputLabel'>
        <label htmlFor='subscriber_email'>Email:</label>
        <input 
          type="email"
          id='subscriber_email'
          required
          placeholder='Enter...'
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <div key={2} className='inputLabel'>
        <label htmlFor='subscriber_city'>City:</label>
        <input 
          type="text"
          id='subscriber_city'
          required
          placeholder='Enter...'
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
      </div>
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
  )
}

export default AddSubscriber