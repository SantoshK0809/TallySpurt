import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Billing from '../pages/Billing'
import Reports from '../pages/Reports'
import Inventory from '../pages/Inventory'
import Customers from '../pages/Customers'
import DashboardLayout from '../layouts/DashboardLayout'

const App = () => {
  return (
    <div>
    {/* <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/billing" element={<Billing/>} />
      <Route path="/reports" element={<Reports/>} />
      <Route path="/inventory" element={<Inventory/>} />
      <Route path="/customers" element={<Customers/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes> */}
    <DashboardLayout/>
    </div>
  )
}

export default App