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

