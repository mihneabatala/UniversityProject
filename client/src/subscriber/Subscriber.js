import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../api/axios'
import AddSubscriberForm from './AddSubscriberForm'
import SubscriberTable from './SubscriberTable'


const Subscriber = () => {
  const [items,setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchItems = async() => {
      try{
        const response= await axios.get('/subscriber');
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
      email: input2,
      city: input3
    }

    addItem(item);

    setInput1('');
    setInput2('');
    setInput3('');
  }

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

  const handleEdit = (id,name,email,city) => {
    setEditing(id);
    setInput4(name);
    setInput5(email);
    setInput6(city);
  }

  const handleUpdate = (id) =>{
    if(input4 !== '' && input5 !== '' && input6 !== ''){
      const editedItem = {
        name: input4,
        email: input5,
        city: input6
      }
      updateItem(editedItem,id);
      setInput4('');
      setInput5('');
      setInput6('');
      setEditing(false);
    }
    else{
      setEditing(false);
      setInput4('');
      setInput5('');
      setInput6('');
      alert("Please fill all input fields!")
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

  const handleCancel = (e) =>{
    setEditing(false);
  }

  return (
    <>
    <h1 className='componentInfo'>Add Subscriber </h1>
    <div className='newspaperComponent'>
    <AddSubscriberForm
      input1={input1}
      input2={input2}
      input3={input3}
      setInput1={setInput1}
      setInput2={setInput2}
      setInput3={setInput3}
      handleFormSubmit={handleFormSubmit}
    />
    <SubscriberTable
      items={items}
      input4={input4}
      input5={input5}
      input6={input6}
      setInput4={setInput4}
      setInput5={setInput5}
      setInput6={setInput6}
      editing={editing}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      handleCancel={handleCancel}
    />
    </div>
    </>
  )
}

export default Subscriber