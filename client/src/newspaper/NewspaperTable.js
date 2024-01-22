import React from 'react';
import { useState } from 'react';

const NewspaperTable = ({ items, handleDelete , onUpdate }) => {

  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState('');
  const [editing, setEditing] = useState(false);

  const handleEdit = (id,name,category) => {
    setEditing(id);
    setEditedName(name);
    setEditedCategory(category);
  }
  
  const handleUpdate = (id) =>{
    if(editedName !=='' && editedCategory !==''){
      const editedItem = {
        name: editedName,
        category: editedCategory
      }
      onUpdate(editedItem,id);
      setEditedName('');
      setEditedCategory('');
      setEditing(false);
    }else{
      setEditing(false);
      setEditedName('');
      setEditedCategory('');
      alert("Please fill all input fields!")
    }
  }

  const handleCancel = () =>{
    setEditing(false);
  }

  return (
    <div className='table'>
      <h2 className='tableTitle'>Newspaper Table</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Publication Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map( (item) => {

              if(editing && editing === item.id){

                return (
                  <tr  key={item.id}>
                  <td>
                    <input
                      type='text'
                      className='editInput'
                      required
                      id='newName'
                      placeholder={item.name}
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      className='editInput'
                      required
                      id='newCategory'
                      placeholder={item.category}
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                    />
                  </td>
                  <td>{item.publication_date}</td>
                  <td className='buttonCell'>
                    <button className='Button' style={{backgroundColor:"#95A78D"}} onClick={() => handleUpdate(item.id)}>Save</button> 
                    <button className='Button' style={{backgroundColor:"#F87666"}} onClick={() => handleCancel(item.id)}>Cancel</button>
                  </td>
                </tr>
                )
              } 
                else {

                  return (
                    <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.publication_date}</td>
                  <td className='buttonCell'>
                    <button
                      style={{ backgroundColor: '#BD897E' }}
                      className='Button'
                      onClick={() => handleEdit(item.id,item.name,item.category)}
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
  );
};

export default NewspaperTable;