import React from 'react'

const SpendersTable = ({spenders}) => {
  return (
    <div className='table homepageTables'>
        <h2 className='tableTitle'>Big Spenders</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Subscriptions</th>
                    <th>Total Spent</th>
                </tr>
            </thead>
            <tbody>
                {
                    spenders.map( (item) => (
                        <tr key={item.id}>
                            <td>{item.subscriber_name}</td>
                            <td>{item.subscription_count}</td>
                            <td>{item.total_spending}$</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default SpendersTable