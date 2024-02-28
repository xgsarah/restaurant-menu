import React from 'react'

import Menu from '../components/Menu'
import Header from '../components/Header'
import ActionMenu from '../components/ActionMenu'

const Dashboard = () => {
  return (
    <div>
      <Header name="Menu Items" action={<ActionMenu />} />
      <Menu />
    </div>
  )
}

export default Dashboard
