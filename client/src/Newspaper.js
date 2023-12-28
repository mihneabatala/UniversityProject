import React, { useEffect, useState } from 'react'
import Addnewspaper from './Addnewspaper'
import Table from './Table'
import axios from './api/axios.js'
const Newspaper = () => {
  const API_URL = "http://localhost:5000/newspaper";
  const [items,setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  useEffect(() => {
    const fetchItems = async() => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw new Error('Did not receive expected data!')
        const listItems = await response.json();
        setItems(listItems);
      }catch(err){
        alert(err.message);
      }
    }

    fetchItems(); 
  },[])
  

  const addItem = async (item) => {
    try{
      const response = await axios.post('/newspaper',item);
      const newItem= response.data[0];
      const listItems = [...items,newItem];
      
      setItems(listItems);

    } catch(err){
      alert(err.message);
    }
  }

  const handleEdit = () =>{

  }

  const handleDelete = () => {

  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const item = {
      name: input1,
      category: input2
    }
    addItem(item);
    setInput1('');
    setInput2('');
  }
  return (
    <>
    <h1 className='componentInfo'>Add Newspaper</h1>
    <div className='newspaper_component'>
      <Addnewspaper
       input1={input1}
       input2={input2}
       setInput1={setInput1}
       setInput2={setInput2}
       handleFormSubmit={handleFormSubmit}
      />
      <Table
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      </div>
    </>
  )
}

export default Newspaper