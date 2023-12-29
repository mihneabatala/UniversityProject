import React, { useEffect, useState } from 'react'
import Addnewspaper from './Addnewspaper'
import Table from './Table'
import axios from './api/axios.js'
const Newspaper = () => {
  const [items,setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  useEffect(() => {
    const fetchItems = async() => {
      try{
        const response= await axios.get('/newspaper');
        const listItems = await response.data;
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
      alert(err.response.data.message);
    }
  }

  const handleEdit = () =>{

  }

  const handleDelete = async (id) => {
    try{
      const response = await axios.delete('/newspaper/' + id);
      const listItems = items.filter( (item) => {
        return item.id !== id;
      })
      setItems(listItems);
      alert(response.data.name + " was deleted! ")
    }catch(err) {
      console.log(err.message);
      alert(err.message);
    }
    
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