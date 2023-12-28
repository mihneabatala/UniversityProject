import React from 'react'
import Addform from './Addnewspaper'
import Table from './Table'

const Subscriber = () => {

  const handleFormSubmit = (inputValues) => {
    console.log(inputValues);
  }
  return (
    <>
    <h1 className='componentInfo'>Add Subscriber </h1>
      <Addform
        numberOfInputs={3}
        labelNames={['Name:', 'Email:','City']}
        onSubmit={handleFormSubmit}
      />
      <Table/>
    </>
  )
}

export default Subscriber