import React from 'react'
import { useState } from 'react';

const AddNewspaper = ({ onFormSubmit }) => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');

  const handleFormSubmit = (e) =>{
    e.preventDefault();
    const item = {
      name: name,
      category: category
    };
    onFormSubmit(item);
    setName('');
    setCategory('');
  }

  return (
    <form className = 'addForm' onSubmit={handleFormSubmit}>
       <div key={0} className='inputLabel'>
        <label htmlFor='newspaper_name'>Name:</label>
        <input 
          type="text"
          id='newspaper_name'
          autoFocus
          required
          placeholder='Enter...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div key={1} className='inputLabel'>
        <label htmlFor='newspaper_category'>Category:</label>
        <input 
          type="text"
          id='newspaper_category'
          required
          placeholder='Enter...'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
    
  )
}

export default AddNewspaper