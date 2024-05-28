// Зчитування даних форми та збереження їх у LocalStorage
function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const surveyData = {};
  for (let [key, value] of formData.entries()) {
      surveyData[key] = value;
  }
  saveToLocalStorage(surveyData);
}

//Збереження даних у LocalStorage, зчитування існуючих даних, додавання нових та збереження все назад
function saveToLocalStorage(data) {
  let surveys = JSON.parse(localStorage.getItem('surveys')) || [];
  surveys.push(data);
  localStorage.setItem('surveys', JSON.stringify(surveys));
}

  document.getElementById('partnerSurvey').addEventListener('submit', handleSubmit);

// Фільтри
// Отримання результатів фільтрації
const surveysData = JSON.parse(localStorage.getItem('surveys')) || [];
const renaissanceLovers = JSON.parse(localStorage.getItem('surveys')).filter(survey => {
  return survey['favorite-style'] === 'Renaissance';
});
console.log(renaissanceLovers);

const notBuyingCourse = JSON.parse(localStorage.getItem('surveys')).filter(survey => {
  return survey['course'] === 'no';
});
console.log(notBuyingCourse);

const gothicFans = JSON.parse(localStorage.getItem('surveys')).filter(survey => {
  return survey['style'].includes('Gothic');
});
console.log(gothicFans);

// Пошук контейнера для відображення результатів
const resultsContainer2 = document.getElementById('filteredResults');

// Очистка контейнера перед відображенням нових результатів
resultsContainer2.innerHTML = '';

// Створення та відображення списку результатів для кожного фільтру
function displayResults(results) {
  const resultList = document.createElement('ul');
  results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = `${result.name} - ${result.email}`;
      resultList.appendChild(listItem);
  });
  resultsContainer2.appendChild(resultList);
}

// Відображення результатів для кожного фільтру
displayResults(renaissanceLovers);
displayResults(notBuyingCourse);
displayResults(gothicFans);

//коміт 2
//Функція для адаптації навігаційного меню на різних розмірах екранів
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        localStorage.setItem('surveyResults', JSON.stringify(data));

        alert('Результати опитування збережено у LocalStorage.');
    });
});



 