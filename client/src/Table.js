import React from 'react';

const Table = ({ items, handleEdit, handleDelete }) => {
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
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.publication_date}</td>
              <td className='button_cell'>
                <button style={{backgroundColor: 'yellow'}} className='Button' onClick={() => handleEdit(item.id)}>Edit</button>
                <button style={{backgroundColor: 'red'}} className='Button' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;