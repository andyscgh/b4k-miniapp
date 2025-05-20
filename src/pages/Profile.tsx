
import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram: any
  }
}

export default function Profile() {
  const [profile, setProfile] = useState<any>(null)
  const [form, setForm] = useState({
    address: '',
    passport: '',
    inn: '',
    skills: [] as string[]
  })
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const skillsList = [
    'Режиссер',
    'Оператор',
    'Оператор - постановщик',
    'Старший инженер',
    'Светохудожник',
    'Звукорежиссер',
    'Инженер пультовой',
    'Инженер Resolume',
    'Микрофонный техник',
    'Инженер трансляции'
  ]

  const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user

  useEffect(() => {
    if (!telegramUser?.id) return
    fetch('https://b4k-backend-production.up.railway.app/api/employee?telegram_id=' + telegramUser.id)
      .then(res => {
        if (res.status === 404) {
          setLoading(false)
        } else {
          return res.json().then(data => {
            setProfile(data)
            setLoading(false)
          })
        }
      })
  }, [])

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const save = async () => {
    setLoading(true)

    await fetch('https://b4k-backend-production.up.railway.app/api/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramUser, ...form })
    })

    setSaved(true)
    setLoading(false)
    location.reload()
  }

  if (loading) return <p>Загрузка...</p>

  if (profile && !editMode) return (
    <div>
      <h1>👋 Добро пожаловать, {profile.name}!</h1>
      <p><b>Навыки:</b> {profile.skills.join(', ')}</p>
      <button onClick={() => setEditMode(true)}>Редактировать</button>
      <ul>
        <li><a href="#/documents">📁 Документы</a></li>
        <li><a href="#/invitations">📬 Приглашения</a></li>
        <li><a href="#/events">📅 События</a></li>
      </ul>
    </div>
  )

  return (
    <div>
      <h1>👤 Регистрация</h1>
      <div>
        <label>Адрес:<br/>
          <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        </label>
      </div>
      <div>
        <label>Паспорт:<br/>
          <input value={form.passport} onChange={e => setForm({ ...form, passport: e.target.value })} />
        </label>
      </div>
      <div>
        <label>ИНН:<br/>
          <input value={form.inn} onChange={e => setForm({ ...form, inn: e.target.value })} />
        </label>
      </div>
      <div>
        <p>Навыки:</p>
        {skillsList.map(skill => (
          <label key={skill} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={form.skills.includes(skill)}
              onChange={() => toggleSkill(skill)}
            />
            {skill}
          </label>
        ))}
      </div>
      <button onClick={save} disabled={loading}>
        {loading ? 'Сохранение...' : 'Сохранить'}
      </button>
      {saved && <p>✅ Сохранено!</p>}
    </div>
  )
}
