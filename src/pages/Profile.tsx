import React, { useState } from 'react'

export default function Profile() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    passport: '',
    inn: '',
    skills: [] as string[],
    agree: false,
  })

  const toggleSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  return (
    <div>
      <h1>👤 Профиль сотрудника</h1>
      <div>
        <label>ФИО:<br/>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </label>
      </div>
      <div>
        <label>Адрес регистрации:<br/>
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
        <label>Навыки:<br/>
          {['свет', 'звук', 'организация', 'ведение'].map(skill => (
            <label key={skill} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={form.skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              {skill}
            </label>
          ))}
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={form.agree}
            onChange={e => setForm({ ...form, agree: e.target.checked })}
          />
          Согласен на обработку персональных данных
        </label>
      </div>
      <button onClick={() => alert('Профиль сохранён!')}>Сохранить</button>
    </div>
  )
}
