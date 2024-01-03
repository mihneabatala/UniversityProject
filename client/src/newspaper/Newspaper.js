import React, { useEffect, useState } from 'react'
import NewspaperTable from './NewspaperTable.js'
import axios from '../api/axios.js'
import AddNewspaperForm from './AddNewspaperForm.js'
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

  const handleEdit = (id,name,category) => {
    setEditing(id);
    setInput3(name);
    setInput4(category);
  }

  const handleUpdate = (id) =>{
    if(input3 !=='' && input4 !==''){
      const editedItem = {
        name: input3,
        category: input4
      }
      updateItem(editedItem,id);
      setInput3('');
      setInput4('');
      setEditing(false);
    }else{
      setEditing(false);
      setInput3('');
      setInput4('');
      alert("Please fill all input fields!")
    }
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

  const handleCancel = (e) =>{
    setEditing(false);
  }
  
  return (
    <>
    <h1 className='componentInfo'>Add Newspaper</h1>
    <div className='newspaperComponent'>
      <AddNewspaperForm
       input1={input1}
       input2={input2}
       setInput1={setInput1}
       setInput2={setInput2}
       handleFormSubmit={handleFormSubmit}
      />
      <NewspaperTable
        items={items}
        input3={input3}
        input4={input4}
        setInput3={setInput3}
        setInput4={setInput4}
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

export default Newspaper