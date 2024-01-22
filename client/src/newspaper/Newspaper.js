import React, { useEffect, useState } from 'react'
import NewspaperTable from './NewspaperTable.js'
import axios from '../api/axios.js'
import AddNewspaperForm from './AddNewspaperForm.js'
const Newspaper = () => {

  const [items,setItems] = useState([]);
  
  const fetchItems = async() => {
    try{
      const response= await axios.get('/newspaper');
      const listItems = await response.data;
      setItems(listItems);
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchItems(); 
  },[])

  const handleFormSubmit = (item) => {
    addItem(item);
  }

  const addItem = async (item) => {
    try{
      const response = await axios.post('/newspaper',item);
      const newItem= response.data;
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

  const handleUpdate = (editedItem,id) =>{
      updateItem(editedItem,id);
  }

  const updateItem = async (newspaper,id) =>{
    try{
      const response = await axios.patch('/newspaper/'+ id, newspaper);
      const updatedList = items.map( item => {
        if(item.id === response.data.id){
         return {
          id: response.data.id,
          name: response.data.name,
          publication_date:response.data.publication_date,
          category: response.data.category
        }
        }
        return item;
    })

    setItems(updatedList);
    alert('Newspaper updated successfully!')

    }catch(err){
      console.log(err.message);
      alert(err.message);
    }
    
  }
  
  return (
    <>
    <h1 className='componentInfo'>Add Newspaper</h1>
    <div className='newspaperComponent'>
      <AddNewspaperForm
       onFormSubmit={handleFormSubmit}
      />
      <NewspaperTable
        items={items}
        onUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      </div>
    </>
  )
}

export default Newspaper