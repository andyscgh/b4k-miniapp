import { useEffect, useState } from "react";
import { API_URL } from "../shared/constants";

interface FormData {
  name: string;
  phone: string;
  skills: string[];
}

const allSkills = [
  "Режиссер", "Оператор", "Оператор - постановщик", "Старший инженер",
  "Светохудожник", "Звукорежиссер", "Инженер пультовой", "Инженер Resolume",
  "Микрофонный техник", "Инженер трансляции"
];

export default function Profile() {
  const [form, setForm] = useState<FormData>({ name: "", phone: "", skills: [] });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const tg = (window as any).Telegram.WebApp;
      const telegramId = tg.initDataUnsafe.user?.id;
      const payload = { ...form, telegramId };

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) setSubmitted(true);
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
    }
  };

  if (submitted) {
    return <div>Данные успешно отправлены. Спасибо!</div>;
  }

  return (
    <div>
      <h2>Регистрация</h2>
      <input
        placeholder="Имя"
        value={form.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        placeholder="Телефон"
        value={form.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <div>
        {allSkills.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              checked={form.skills.includes(skill)}
              onChange={(e) =>
                handleChange(
                  "skills",
                  e.target.checked
                    ? [...form.skills, skill]
                    : form.skills.filter((s) => s !== skill)
                )
              }
            />
            {skill}
          </label>
        ))}
      </div>
      <button onClick={handleSubmit}>Сохранить</button>
    </div>
  );
}
