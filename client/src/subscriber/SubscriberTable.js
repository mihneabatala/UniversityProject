import React from 'react'

const SubscriberTable = ({ items, handleEdit, handleDelete ,input4, input5, input6, setInput4, setInput5, setInput6, editing , handleUpdate, handleCancel }) => {
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
            items.map( (item) => (
              <React.Fragment key={item.id}>
                {
                  editing && editing === item.id ? (
                    <tr>
                  <td>
                    <input
                      type='text'
                      className='editInput'
                      id='newName'
                      autoFocus
                      placeholder={item.name}
                      value={input4}
                      onChange={(e) => setInput4(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='email'
                      className='editInput'
                      id='newEmail'                     
                      placeholder={item.email}
                      value={input5}
                      onChange={(e) => setInput5(e.target.value)}
                    />
                  </td>
                  <td>
                    <input 
                      type="text"
                      className='editInput'
                      id='newCity'
                      placeholder={item.city}
                      value={input6}
                      onChange={(e) => setInput6(e.target.value)}
                    />
                  </td>
                  <td className='buttonCell'>
                    <button className='Button' style={{backgroundColor:"#95A78D"}} onClick={() => handleUpdate(item.id)}>Save</button> 
                    <button className='Button' style={{backgroundColor:"#F87666"}} onClick={() => handleCancel(item.id)}>Cancel</button>
                  </td>
                </tr>
                  ) : (
                    <tr>
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
              </React.Fragment>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default SubscriberTable