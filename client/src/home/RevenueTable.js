import React from 'react'

const RevenueTable = ({revenue}) => {
  return (
    <div className='table homepageTables'>
        <h2 className='tableTitle'>Top Newspapers</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Subscriptions</th>
                    <th>Total Revenue</th>
                </tr>
            </thead>
            <tbody>
                {
                    revenue.map( (item) => (
                        <tr key={item.id}>
                            <td>{item.newspaper_name}</td>
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

export default RevenueTable