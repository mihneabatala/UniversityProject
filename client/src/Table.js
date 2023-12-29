import React from 'react';

const Table = ({ items, handleEdit, handleDelete ,input3, input4, setInput3, setInput4, editing , handleSave, handleCancel }) => {
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
                      placeholder={item.name}
                      value={input3}
                      onChange={(e) => setInput3(e.target.value)}
                      
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      className='editInput'
                      placeholder={item.name}
                      value={input4}
                      onChange={(e) => setInput4(e.target.value)}
                    />
                  </td>
                  <td>{item.publication_date}</td>
                  <td>
                    <button className='Button' style={{backgroundColor:"green"}} onClick={() => handleSave(item.id)}>Save</button>
                    <button className='Button' style={{backgroundColor:"lightblue"}} onClick={() => handleCancel(item.id)}>Cancel</button>
                  </td>
                </tr>
                  ) : (
                    <tr>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.publication_date}</td>
                  <td className='button_cell'>
                    <button
                      style={{ backgroundColor: 'yellow' }}
                      className='Button'
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: 'red' }}
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


          {/* {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.publication_date}</td>
              <td className='button_cell'>
                <button style={{backgroundColor: 'yellow'}} className='Button' onClick={() => handleEdit(item.id)}>Edit</button>
                <button style={{backgroundColor: 'red'}} className='Button' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table;