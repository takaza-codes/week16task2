const form = document.forms.registrationForm;
const userNameInput = form.elements.username;
const emailInput = form.elements.email;
const ageInput = form.elements.userAge;
const genderInput = form.elements.gender;
const jobInput = form.elements.jobs;
const passwordInput = form.elements.userPassword;
const agreeTermsCheckbox = form.elements.agreeTerms;

const userNameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const userAgeError = document.getElementById('userAgeError');
const passwordError = document.getElementById('passwordError');
const termsError = document.getElementById('termsError');

const submitBtn = document.getElementById('submitBtn');
submitBtn.classList.add('disabled');
submitBtn.disabled = true;

function validateCheckbox() {
  if (agreeTermsCheckbox.checked) {
      termsError.style.display = 'none';
      submitBtn.classList.remove('disabled');
      submitBtn.disabled = false;
  } else {
      termsError.textContent = 'Необходимо согласие с условиями.';
      termsError.style.display = 'block';
      submitBtn.classList.add('disabled');
      submitBtn.disabled = true;
  }
}

agreeTermsCheckbox.addEventListener('change', validateCheckbox);

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  let hasError = false;

  userNameError.style.display = 'none';
  emailError.style.display = 'none';
  userAgeError.style.display = 'none';
  passwordError.style.display = 'none';
  termsError.style.display = 'none';
  

  if ((userNameInput.value.trim() === '') || (validateUsername(userNameInput.value) === false)) {
    userNameError.textContent = 'Укажите имя пользователя.';
    userNameError.style.display = 'block';
    hasError = true;
  }

  if (validateEmail(emailInput.value) === false) {
    emailError.textContent = 'Укажите корректный email.';
    emailError.style.display = 'block';
    hasError = true;
  }

  if ((ageInput.value.trim() === '') || (ageInput.value < 18) || (ageInput.value >= 90)) {
    userAgeError.textContent = 'Укажите корректный возраст.';
    userAgeError.style.display = 'block';
    hasError = true;
  }

  if (!passwordInput.value.trim()) {
    passwordError.textContent = 'Введите пароль.';
    passwordError.style.display = 'block';
    hasError = true;
  } else if (passwordInput.validity.patternMismatch) {
      passwordError.textContent = 'Ваш пароль должен состоять из минимум 8 символов и содержать минимум одну строчную и одну заглавную букву, а также минимум одну цифру.';
      passwordError.style.display = 'block';
      hasError = true;
  }

  validateCheckbox();
    if (agreeTermsCheckbox.checked === false) {
        hasError = true;
    }

  if (hasError === false) {
    const userInfo = [userNameInput.value, emailInput.value, ageInput.value, genderInput.value, jobInput.value];
    alert('Форма успешно отправлена!');
    console.log(userInfo);
    userNameInput.value = '';
    emailInput.value = '';
    ageInput.value = '';
    jobInput.selectedIndex = 0;
    passwordInput.value = '';
    agreeTermsCheckbox.checked = false;
  }
});

agreeTermsCheckbox.addEventListener('change', function () {
  if (agreeTermsCheckbox.checked) {
      termsError.style.display = 'none';
      submitBtn.classList.remove('disabled');
      submitBtn.disabled = false;
  } else {
      submitBtn.classList.add('disabled');
      submitBtn.disabled = true;
  }
});

function validateEmail(email) {
  let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return regex.test(email);
}

function validateUsername(name) {
    let regex = /^[а-яА-Я ]+$/;
    return regex.test(name);
}