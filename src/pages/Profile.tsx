import React, { useEffect, useState } from 'react'

type ProfileData = {
  name: string
  address: string
  passport: string
  inn: string
  skills: string[]
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userId = (window.Telegram.WebApp.initDataUnsafe?.user?.id ?? '').toString()
    if (!userId) return

    fetch(`https://your-backend.com/api/employee?telegram_id=${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(data => {
        setProfile(data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <p>Загрузка...</p>

  if (!profile) return <p>Вы не зарегистрированы в системе.</p>

  return (
    <div>
      <h1>👤 Профиль сотрудника</h1>
      <p><b>ФИО:</b> {profile.name}</p>
      <p><b>Адрес:</b> {profile.address}</p>
      <p><b>Паспорт:</b> {profile.passport}</p>
      <p><b>ИНН:</b> {profile.inn}</p>
      <p><b>Навыки:</b> {profile.skills.join(', ')}</p>
    </div>
  )
}
