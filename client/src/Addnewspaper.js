import React from 'react'

const Addnewspaper = ({ input1, input2, setInput1, setInput2, handleFormSubmit }) => {

  return (
    <form className = 'addForm' onSubmit={handleFormSubmit}>
       <div key={0} className='input_label'>
        <label htmlFor='newspaper_name'>Name:</label>
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
      <div key={1} className='input_label'>
        <label htmlFor='newspaper_category'>Category:</label>
        <input 
          type="text"
          id='newspaper_category'
          required
          placeholder='Enter...'
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
      </div>
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
    
  )
}

export default Addnewspaper