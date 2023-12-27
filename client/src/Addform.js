import React from 'react'
import { useState } from 'react'

const Addform = ({ numberOfInputs, labelNames, onSubmit }) => {

  const [inputValues, setInputValues] = useState(Array(numberOfInputs).fill(''));

  const handleInputChange = (index, value) =>{
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValues);
    setInputValues(Array(numberOfInputs).fill(''));
  }

  const inputs = [];

  for (let i = 0; i < numberOfInputs; i++) {
    const label = labelNames[i];
    inputs.push(
      <div key={i} className='input_label'>
        <label htmlFor={label}>{label}</label>
        <input 
          type="text"
          id={label}
          required
          placeholder='Enter...'
          value={inputValues[i]}
          onChange={(e) => handleInputChange(i, e.target.value)}
        />
      </div>
    );
  }
  
  return (
    <form className = 'addForm' style={{height: numberOfInputs*150}} onSubmit={handleSubmit}>
      {inputs}
      <button type="submit" className='formSubmit'>Submit</button>
    </form>
    
  )
}

export default Addform