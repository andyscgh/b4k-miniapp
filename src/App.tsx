import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/profile">👤 Профиль</Link>
      </nav>
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}
