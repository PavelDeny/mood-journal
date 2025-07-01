// DOM elements
const form = document.getElementById("mood-form");
const commentInput = document.getElementById("comment");
const historyList = document.getElementById("history");

// Функція зчитує записи з localStorage
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  historyList.innerHTML = ""; // очистити список
  entries.forEach((entry) => addEntryToDOM(entry));
}

// Додати новий запис у DOM
function addEntryToDOM(entry) {
  const li = document.createElement("li");
  li.textContent = `${entry.date} — ${entry.mood} — ${entry.comment}`;
  historyList.appendChild(li);
}

// Слухач подання форми
form.addEventListener("submit", (e) => {
  e.preventDefault(); // зупинити оновлення сторінки

  const mood = form.mood.value;
  const comment = commentInput.value;
  const date = new Date().toLocaleDateString();

  const entry = { date, mood, comment };

  // Зчитуємо з localStorage
  const entries = JSON.parse(localStorage.getItem("moodEntries")) || [];
  entries.unshift(entry); // додаємо в початок списку
  localStorage.setItem("moodEntries", JSON.stringify(entries));

  // Очистити форму та оновити UI
  form.reset();
  loadEntries();
});

// При завантаженні сторінки
loadEntries();
