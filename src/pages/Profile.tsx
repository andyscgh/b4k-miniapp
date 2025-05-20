import React, { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram: any
  }
}

export default function Profile() {
  const [form, setForm] = useState({
    address: '',
    passport: '',
    inn: '',
    skills: [] as string[]
  })

  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

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
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user

    if (!telegramUser?.id) {
      alert('Ошибка: Telegram не найден')
      return
    }

    await fetch('https://your-backend.com/api/employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telegramUser, ...form })
    })

    setSaved(true)
    setLoading(false)
  }

  return (
    <div>
      <h1>👤 Профиль</h1>
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
