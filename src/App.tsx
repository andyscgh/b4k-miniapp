import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Events'
import Invitations from './pages/Invitations'
import Documents from './pages/Documents'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">🏠 Главная</Link> |{' '}
        <Link to="/events">📅 События</Link> |{' '}
        <Link to="/invitations">📬 Приглашения</Link> |{' '}
        <Link to="/documents">📁 Документы</Link> |{' '}
        <Link to="/profile">👤 Профиль</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/invitations" element={<Invitations />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}
