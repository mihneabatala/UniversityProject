import React from 'react'
import AddSubscriptionForm from './AddSubscriptionForm'
import SubscriptionTable from './SubscriptionTable'
import { useState, useEffect } from 'react'
import axios from '../api/axios'


const Subscription = () => {
  const [items, setItems] = useState([]);
  
  
  const fetchItems = async() => {
    try{
      const response= await axios.get('/subscription');
      const listItems = await response.data;
      setItems(listItems);
    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchItems(); 
  },[])

  const calculatePrice = (subscription) =>{
    switch (subscription) {
        case 'One week': return 5;
        case 'One month': return 15;
        case 'Six months': return 70;
        case 'One year': return 115;
        default: return 5;
    }
}

  const addItem = async(subscription) => {
    try{
      const response = await axios.post('/subscription',subscription);
      const newItem = response.data;
      const listItems = [...items,newItem];
      setItems(listItems);
    }catch(err){
      alert(err.response.data.message);
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = await axios.delete('/subscription/' + id);
      const listItems = items.filter( (item) => {
        return item.id !== id;
      })
      setItems(listItems);
      alert(response.data.message);
    }catch(err) {
      console.log(err.message);
      alert(err.message);
    } 
  }

  const updateItem = async(editedItem,id) => {
    try{
      const response = await axios.patch('/subscription/' + id, editedItem);
      const updatedList = items.map( item =>{
        if(item.id ===id){
          return {
            ...item,
            type: response.data.type,
            price: response.data.price
          }
        }
        return item;
      })
    
      setItems(updatedList);
      alert("Subscription updated successfully!");

    }catch(err){
      console.log(err.message);
      alert(err.message);
    }
    
  }

  return (
    <>
    <h1 className='componentInfo'>Buy Subscription</h1>
    <div className='newspaperComponent'>
      <AddSubscriptionForm
        onFormSubmit={addItem}
        calculatePrice={calculatePrice}
      />
      <SubscriptionTable
        items={items}
        calculatePrice={calculatePrice}
        handleDelete={handleDelete}
        onUpdate={updateItem}
      />
    </div>
    </>
  )
}

export default Subscription