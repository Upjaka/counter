const form = document.querySelector('.counter__form');
const age = form.querySelector('#age');
const height = form.querySelector('#height');
const weight = form.querySelector('#weight');
const activityList = form.querySelector('.radios-group');
const resetButton = form.querySelector('.form__reset-button');
const submitButton = form.querySelector('.form__submit-button');
const counterResult = document.querySelector('.counter__result');

// Настройки по умолчанию
age.value = '';
height.value = '';
weight.value ='';
resetButton.disabled = true;
submitButton.disabled = true;
form.querySelector('#activity-minimal').checked = true;
form.querySelector('#gender-male').checked = true;

function checkParams() {
  if (age.value.length > 0 || height.value.length || weight.value.length) {
    resetButton.disabled = false;
  }
  if (age.value.length > 0 && height.value.length && weight.value.length) {
    submitButton.disabled = false;
  }
}

// Активация кнопок Submit и Reset
age.addEventListener('input', checkParams);
height.addEventListener('input', checkParams);
weight.addEventListener('input', checkParams);

resetButton.addEventListener('click', () => {
  resetButton.disabled = true;
  counterResult.classList.add('counter__result--hidden');
  submitButton.disabled = true;
});

// Расчет числовых значений по нажатию на кнопку
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  counterResult.classList.remove('counter__result--hidden');

  let activityCoef = 1.2;
  switch (activityList.querySelector(':checked').value) {
    case 'min':
      activityCoef = 1.2;
      break;
    case 'low':
      activityCoef = 1.375;
      break;
    case 'medium':
      activityCoef = 1.55;
      break;
    case 'high':
      activityCoef = 1.725;
      break;
    case 'max':
      activityCoef = 1.9;
      break;
  }
  const N = (form.querySelector(':checked').value === 'male') ?
    (10 * weight.value) + (6.25 * height.value) - (5 * age.value) + 5 :
    (10 * weight.value) + (6.25 * height.value) - (5 * age.value) - 161;
  counterResult.querySelector('#calories-norm').textContent = (N * activityCoef).toFixed(0);
  counterResult.querySelector('#calories-minimal').textContent = (0.85 * N * activityCoef).toFixed(0);
  counterResult.querySelector('#calories-maximal').textContent = (1.15 * N * activityCoef).toFixed(0);
});
