import React from 'react'
import Addform from './Addnewspaper'
import Table from './Table'

const Subscription = () => {
  
  const handleFormSubmit = (inputValues) => {
    console.log(inputValues);
  }

  return (
    <>
    <h1 className='componentInfo'>Buy Subscription</h1>
      <Addform
        numberOfInputs={4}
        labelNames={['Subscriber Email:','Newspaper:','Type:', 'Price:']}
        onSubmit={handleFormSubmit}
      />
      <Table/>
    </>
  )
}

export default Subscription