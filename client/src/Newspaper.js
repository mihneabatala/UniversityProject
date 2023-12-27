import React from 'react'
import Addform from './Addform'
import Table from './Table'

const Newspaper = () => {

  const handleFormSubmit = (inputValues) => {
    console.log(inputValues);
  }
  return (
    <>
    <h1 className='componentInfo'>This is the Newspaper Component</h1>
      <Addform
        numberOfInputs={2}
        labelNames={['Name:', 'Category:']}
        onSubmit={handleFormSubmit}
      />
      <Table/>
    </>
  )
}

export default Newspaper