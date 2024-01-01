import React from 'react';

const NewspaperTable = ({ items, handleEdit, handleDelete ,input3, input4, setInput3, setInput4, editing , handleUpdate, handleCancel }) => {
  return (
    <div className='table'>
      <h2 className='table_title'>Newspaper Table</h2>
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
                      placeholder={item.name}
                      value={input3}
                      onChange={(e) => setInput3(e.target.value)}
                      
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      className='editInput'
                      id='newCategory'
                      placeholder={item.category}
                      value={input4}
                      onChange={(e) => setInput4(e.target.value)}
                    />
                  </td>
                  <td>{item.publication_date}</td>
                  <td className='buttonCell'>
                    <button className='Button' style={{backgroundColor:"#95A78D"}} onClick={() => handleUpdate(item.id)}>Save</button> 
                    <button className='Button' style={{backgroundColor:"#F87666"}} onClick={() => handleCancel(item.id)}>Cancel</button>
                  </td>
                </tr>
                  ) : (
                    <tr>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.publication_date}</td>
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
              </React.Fragment>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default NewspaperTable;