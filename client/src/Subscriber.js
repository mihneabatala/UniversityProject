import React from 'react'
import Addform from './Addform'
import Table from './Table'

const Subscriber = () => {

  const handleFormSubmit = (inputValues) => {
    console.log(inputValues);
  }
  return (
    <>
    <h1 className='componentInfo'>This is the Subscriber Component</h1>
      <Addform
        numberOfInputs={3}
        labelNames={['Name:', 'Email:','City']}
        onsubmit={handleFormSubmit}
      />
      <Table/>
    </>
  )
}

export default Subscriber