import React from 'react'

import DataGrid from '../components/DataGrid'
import Header from '../components/Header'
import ActionMenu from '../components/ActionMenu'

const Dashboard = () => {
  return (
    <div>
      <Header name="Menu Items" action={<ActionMenu />} />
      <DataGrid />
    </div>
  )
}

export default Dashboard
