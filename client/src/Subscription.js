import React from 'react'
import Addform from './Addform'
import Table from './Table'

const Subscription = () => {
  
  const handleFormSubmit = (inputValues) => {
    console.log(inputValues);
  }

  return (
    <>
    <h1 className='componentInfo'>This is the Subscription Component</h1>
      <Addform
        numberOfInputs={2}
        labelNames={['Type:', 'Price:']}
        onsubmit={handleFormSubmit}
      />
      <Table/>
    </>
  )
}

export default Subscription