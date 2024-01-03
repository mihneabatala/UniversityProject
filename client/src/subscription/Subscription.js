import React from 'react'
import AddSubscriptionForm from './AddSubscriptionForm'
import SubscriptionTable from './SubscriptionTable'
import { useState, useEffect } from 'react'
import axios from '../api/axios'


const Subscription = () => {
  const [items, setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [subscriptionType, setSubscriptionType] = useState('');
  const [editedSubscription, setEditedSubscription] = useState();
  const [editing,setEditing] = useState(false);
  
  useEffect(() => {
    const fetchItems = async() => {
      try{
        const response= await axios.get('/subscription');
        const listItems = await response.data;
        setItems(listItems);
      }catch(err){
        alert(err.message);
      }
    }
    fetchItems(); 
  },[])

  const calculatePrice = () =>{
    switch (subscriptionType) {
        case 'One week': return 5;
        case 'One month': return 15;
        case 'Six months': return 70;
        case 'One year': return 115;
        default: return 5;
    }
}

const calculateEditedPrice = () =>{
  switch (editedSubscription) {
      case 'One week': return 5;
      case 'One month': return 15;
      case 'Six months': return 70;
      case 'One year': return 115;
      default: return 5;
  }
}

  const handleFormSubmit = (e) =>{
    e.preventDefault();

    const price = calculatePrice(subscriptionType);

    const subscription = {
      newspaperName: input1,
      subscriberEmail: input2,
      type: subscriptionType,
      price: price
    }
    addItem(subscription)

    setInput1('');
    setInput2('');
    setSubscriptionType('One week');
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

  return (
    <>
    <h1 className='componentInfo'>Buy Subscription</h1>
    <div className='newspaperComponent'>
      <AddSubscriptionForm
        input1={input1}
        input2={input2}
        subscriptionType={subscriptionType}
        setInput1={setInput1}
        setInput2={setInput2}
        setSubscriptionType={setSubscriptionType}
        handleFormSubmit={handleFormSubmit}
        calculatePrice={calculatePrice}
      />
      <SubscriptionTable
        items={items}
        editedSubscription={editedSubscription}
        setEditedSubscription={setEditedSubscription}
        calculatePrice={calculatePrice}
        calculateEditedPrice={calculateEditedPrice}
        handleDelete={handleDelete}
        editing={editing}
      />
    </div>
    </>
  )
}

export default Subscription