import React from 'react'
import { useState } from 'react';

const SubscriptionTable = ({ items, onUpdate, handleDelete, calculatePrice }) => {

  const [editedSubscription, setEditedSubscription] = useState('One week');
  const [editing,setEditing] = useState(false);

  const handleEdit = (id) => {
    setEditing(id);
    setEditedSubscription('One week');
  }

  const handleUpdate = (id) => {
    const editedItem = {
      type: editedSubscription,
      price: calculatePrice(editedSubscription)
    }
    onUpdate(editedItem,id);
    setEditing(false);
  }

  const handleCancel = () => {
    setEditing(false);
    setEditedSubscription('One week');
  }

  return (
    <div className='table'>
      <h2 className='tableTitle'>Subscription Table</h2>
      <table>
        <thead>
          <tr>
            <th>Newspaper</th>
            <th>Subscriber Email</th>
            <th>Start Date</th>
            <th>Period</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map( (item) => {
              if(editing && editing === item.id){
                return (
                  <tr key={item.id}>
                  <td>{item.newspaperName}</td>
                  <td>{item.subscriberEmail}</td>
                  <td>{item.start_date}</td>
                  <td>
                  <select id='subscription_type' className='editSelect' value={editedSubscription} onChange={(e) => setEditedSubscription(e.target.value)}>
                      <option value="One week">One week</option>
                      <option value="One month">One month</option>
                      <option value="Six months">Six months</option>
                      <option value="One year">One year</option>
                  </select>
                  </td>
                  <td>{calculatePrice(editedSubscription)}$</td>
                  <td className='buttonCell'>
                    <button className='Button' style={{backgroundColor:"#95A78D"}} onClick={() => handleUpdate(item.id)}>Save</button> 
                    <button className='Button' style={{backgroundColor:"#F87666"}} onClick={() => handleCancel()}>Cancel</button>
                  </td>
                </tr>
                )
              } else {
                return (
                  <tr key={item.id}>
                  <td>{item.newspaperName}</td>
                  <td>{item.subscriberEmail}</td>
                  <td>{item.start_date}</td>
                  <td>{item.type}</td>
                  <td>{item.price}$</td>
                  <td className='buttonCell'>
                    <button
                      style={{ backgroundColor: '#BD897E' }}
                      className='Button'
                      onClick={() => handleEdit(item.id)}
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

export default SubscriptionTable