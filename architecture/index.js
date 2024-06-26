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



 const quizData = {
    "questions": [
      {
        "question": "З чим пов'язували термін «готика», коли він з’явився?",
        "answers": [
          "з деструктивністю та варварством",
          "з вампірами",
          "з котами",
          "з моторошними будівлями"
        ],
        "correctAnswer": "з деструктивністю та варварством"
      },
      {
        "question": "В якому році перші християни вірили, що станеться апокаліпсис?",
        "answers": [
          "1000",
          "1765",
          "2014",
          "2026"
        ],
        "correctAnswer": "1000"
      },
      {
        "question": "Коли вперше дізналися про Помпею?",
        "answers": [
          "в XV–XVI столітті Європою знову прокотився тренд на римську архітектуру",
          "в 1200",
          "в 2000",
          "в XVII столітті"
        ],
        "correctAnswer": "в XV–XVI столітті Європою знову прокотився тренд на римську архітектуру"
      },
      {
        "question": "Який стиль дуже декоративний та динамічний?",
        "answers": [
          "Романський стиль",
          "Європейський стиль",
          "Бароко",
          "Відродження"
        ],
        "correctAnswer": "Бароко"
      },
      {
        "question": "В якому стилі архітектори втомились від бароко з усіма його прикрасами та почали шукати щось простіше?",
        "answers": [
          "Ренесанс",
          "Ар-нуво",
          "Готика",
          "Класицизм"
        ],
        "correctAnswer": "Класицизм"
      }
    ]
  };

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submitBtn');

  function buildQuiz() {
    const output = [];
    quizData.questions.forEach((question, index) => {
      const answers = [];
      question.answers.forEach((answer, ansIndex) => {
        answers.push(
          `<label>
            <input type="radio" name="question${index}" value="${answer}">
            ${answer}
          </label>`
        );
      });
      output.push(
        `<div class="question">
          <div>${question.question}</div>
          <div class="answers">${answers.join('')}</div>
        </div>`
      );
    });
    quizContainer.innerHTML = output.join('');
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      const answerContainer = answerContainers[index];
      const selector = `input[name=question${index}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === question.correctAnswer) {
        correctAnswers++;
        answerContainer.style.color = 'green';
      } else {
        answerContainer.style.color = 'red';
      }
    });
    resultsContainer.innerHTML = `${correctAnswers} з ${quizData.questions.length} питань відповідно`;
  }

  buildQuiz();
  submitButton.addEventListener('click', showResults);