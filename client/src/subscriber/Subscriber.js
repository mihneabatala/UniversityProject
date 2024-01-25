import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import AddSubscriberForm from './AddSubscriberForm'
import SubscriberTable from './SubscriberTable'


const Subscriber = () => {
  const [items,setItems] = useState([]);

  const fetchItems = async() => {
    try{
      const response= await axios.get('/subscriber');
      const listItems = await response.data;
      setItems(listItems);
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchItems(); 
  },[])

  const addItem = async (item) => {
    try{
      const response = await axios.post('/subscriber',item);
      const newItem= response.data;
      const listItems = [...items,newItem];
      setItems(listItems);

    } catch(err){
      alert(err.response.data.message);
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = await axios.delete('/subscriber/' + id);
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

  const updateItem = async (subscriber,id) =>{
    try{
      const response = await axios.patch('/subscriber/'+ id, subscriber);
      const updatedList = items.map( item => {
        if(item.id === response.data.id){
         return {
          id: response.data.id,
          name: response.data.name,
          email:response.data.email,
          city: response.data.city
        }
        }
        return item;
    })

    setItems(updatedList);
    alert('Subscriber updated successfully!')

    }catch(err){
      console.log(err.message);
      alert(err.message);
    }
    
  }

  

  return (
    <>
    <h1 className='componentInfo'>Add Subscriber </h1>
    <div className='newspaperComponent'>
    <AddSubscriberForm
      onFormSubmit={addItem}
    />
    <SubscriberTable
      items={items}
      handleDelete={handleDelete}
      onUpdate={updateItem}
    />
    </div>
    </>
  )
}

export default Subscriber