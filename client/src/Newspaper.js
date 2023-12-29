import React, { useEffect, useState } from 'react'
import Addnewspaper from './Addnewspaper'
import Table from './Table'
import axios from './api/axios.js'
const Newspaper = () => {
  const [items,setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [editing, setEditing] = useState(false);

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

  const handleEdit = (id) => {
    setEditing(id);
  }


  const handleSave = () =>{
    
    const editItem = {
      name: input3,
      category: input4
    }
  }

  const handleCancel = (e) =>{
    setEditing(false);
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
        input3={input3}
        input4={input4}
        setInput3={setInput3}
        setInput4={setInput4}
        editing={editing}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
      </div>
    </>
  )
}

export default Newspaper