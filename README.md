# Admondo ✨

אפליקציית פרודוקטיביות בעברית (RTL, מצב כהה) עם **עוזר AI אישי** שזוכר אותך.

## מה יש בפנים
- **בית** – ברכה, פעולות מהירות, משימות, פרויקטים וסטטיסטיקות
- **משימות** – פתוחות / היום / הושלמו, הוספה עם פרויקט, תאריך, עדיפות, תגית והערה
- **פרויקטים** – הכל / פעילים / הושלמו, עם פס התקדמות ועריכה
- **טיימר מיקוד** – מיקוד / הפסקה קצרה / ארוכה; זמן המיקוד נספר בסטטיסטיקות
- **סטטיסטיקות** – רצף ימים, שעות מיקוד, משימות שהושלמו, גרף שבועי
- **רעיונות** והגדרות
- **העוזר האישי (✨)** – מבוסס Claude:
  - זוכר את כל השיחה (נשמרת במכשיר) + **זיכרון לטווח ארוך** – עובדות שהוא שומר עליך (אפשר לראות ולמחוק בהגדרות)
  - יכול לפעול באפליקציה: להוסיף/לסמן/למחוק משימות, ליצור ולעדכן פרויקטים, לשמור רעיונות
  - מכיר את המשימות והפרויקטים שלך ועוזר לתכנן את היום

## הרצה
```bash
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # המפתח שלך מ-console.anthropic.com
npm start
```
ואז לפתוח http://localhost:3000 (מומלץ בטלפון / תצוגת מובייל).

משתנים אופציונליים: `PORT`, `CLAUDE_MODEL` (ברירת מחדל `claude-opus-5-5`).

## העלאה ל-Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fadamash000-design%2FAdmondo-2&env=ANTHROPIC_API_KEY&envDescription=Anthropic%20API%20key%20for%20the%20personal%20agent)

1. ייבוא המאגר ב-Vercel (Add New → Project → Admondo-2), בלי לשנות הגדרות build
2. ב-Environment Variables להוסיף `ANTHROPIC_API_KEY`
3. Deploy

## מבנה
- `lib/agent.js` – הסוכן: לולאת הכלים מול Claude, הזיכרון והפעולות
- `api/chat.js` – פונקציית Vercel (`/api/chat`)
- `server.js` – שרת Node להרצה מקומית
- `public/` – האפליקציה (HTML/CSS/JS, ללא build)

הנתונים נשמרים ב-`localStorage` של הדפדפן.
