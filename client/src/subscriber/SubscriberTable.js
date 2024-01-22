import React from 'react'
import { useState } from 'react';

const SubscriberTable = ({ items, onUpdate, handleDelete }) => {

  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editing, setEditing] = useState(false);

  const handleEdit = (id,name,email,city) => {
    setEditing(id);
    setEditedName(name);
    setEditedEmail(email);
    setEditedCity(city);
  }

  const handleUpdate = (id) =>{
    if(editedName !== '' && editedEmail !== '' && editedCity !== ''){
      const editedItem = {
        name: editedName,
        email: editedEmail,
        city: editedCity
      }
      onUpdate(editedItem,id);

      setEditedName('');
      setEditedEmail('');
      setEditedCity('');
      setEditing(false);
    }
    else{
      setEditing(false);
      setEditedName('');
      setEditedEmail('');
      setEditedCity('');
      alert("Please fill all input fields!")
    }
  }

  const handleCancel = () =>{
    setEditing(false);
  }

  return (
    <div className='table'>
      <h2 className='tableTitle'>Subscriber Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map( (item) => {

                 if(editing && editing === item.id) {

                  return (
                    <tr key={item.id}>
                  <td>
                    <input
                      type='text'
                      className='editInput'
                      id='newName'
                      autoFocus
                      placeholder={item.name}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='email'
                      className='editInput'
                      id='newEmail'                     
                      placeholder={item.email}
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text"
                      className='editInput'
                      id='newCity'
                      placeholder={item.city}
                      value={editedCity}
                      onChange={(e) => setEditedCity(e.target.value)}
                    />
                  </td>
                  <td className='buttonCell'>
                    <button className='Button' style={{backgroundColor:"#95A78D"}} onClick={() => handleUpdate(item.id)}>Save</button> 
                    <button className='Button' style={{backgroundColor:"#F87666"}} onClick={() => handleCancel(item.id)}>Cancel</button>
                  </td>
                </tr>
                  )
                 } else  {
                    return (
                      <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.city}</td>
                      <td className='buttonCell'>
                        <button
                          style={{ backgroundColor: '#BD897E' }}
                          className='Button'
                          onClick={() => handleEdit(item.id,item.name,item.email,item.city)}
                        >
                          Edit
                        </button>
                        <button
                          style={{ backgroundColor: '#F87666' }}
                          className='Button'
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    )
                 }           
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default SubscriberTable