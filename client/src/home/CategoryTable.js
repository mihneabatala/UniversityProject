import React from 'react'

const CategoryTable = ({category}) => {
    
    const tableHeight = category.length * 70;

  return (
    <div className='table homepageTables' style={{height: tableHeight}}>
        <h2 className='tableTitle'>Categories and Revenue</h2>
        <table>
            <thead>
                <tr>
                    <th>Newspaper Category</th>
                    <th>Subscriptions</th>
                    <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                {
                    category.map( (item) => (
                        <tr key={item.id}>
                            <td>{item.newspaper_category}</td>
                            <td>{item.total_subscriptions}</td>
                            <td>{item.total_revenue}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default CategoryTable