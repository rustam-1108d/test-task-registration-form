document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-confirm');
  const birthDay = document.getElementById('birth-day');
  const submitButton = document.getElementById('form-button');

  const firstNameError = document.getElementById('first-name-error');
  const lastNameError = document.getElementById('last-name-error');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');
  const passwordConfirmError = document.getElementById('password-confirm-error');
  const birthDayError = document.getElementById('birth-day-error');
  const successMessage = document.getElementById('success-message');

  const namePattern = /^[A-Za-zА-Яа-яЁёIV\- .',()]{1,50}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

  const showErrorMessage = (element, message) => {
    const el = element;
    el.textContent = message;
    el.style.display = 'block';
  };

  const hideErrorMessage = (element) => {
    const el = element;
    el.style.display = 'none';
  };

  const validateField = (field, pattern, errorElement, emptyMessage, errorMessage) => {
    if (!field.value.trim()) {
      field.classList.remove('valid');
      field.classList.add('invalid');
      showErrorMessage(errorElement, emptyMessage);
    } else if (!pattern.test(field.value)) {
      field.classList.remove('valid');
      field.classList.add('invalid');
      showErrorMessage(errorElement, errorMessage);
    } else {
      field.classList.remove('invalid');
      field.classList.add('valid');
      hideErrorMessage(errorElement);
    }
  };

  const validatePassword = (field, pattern, errorElement, emptyMessage, errorMessage) => {
    if (!field.value) {
      field.classList.remove('valid');
      field.classList.add('invalid');
      showErrorMessage(errorElement, emptyMessage);
    } else if (!pattern.test(field.value)) {
      field.classList.remove('valid');
      field.classList.add('invalid');
      showErrorMessage(errorElement, errorMessage);
    } else {
      field.classList.remove('invalid');
      field.classList.add('valid');
      hideErrorMessage(errorElement);
    }
  };

  const validatePasswordMatch = () => {
    if (!passwordConfirm.value) {
      passwordConfirm.classList.remove('valid');
      passwordConfirm.classList.add('invalid');
      showErrorMessage(passwordConfirmError, 'Подтвердите пароль');
    } else if (password.value !== passwordConfirm.value) {
      passwordConfirm.classList.remove('valid');
      passwordConfirm.classList.add('invalid');
      showErrorMessage(passwordConfirmError, 'Пароли должны совпадать');
    } else if (!passwordPattern.test(password.value)) {
      passwordConfirm.classList.remove('valid');
      passwordConfirm.classList.add('invalid');
      showErrorMessage(passwordConfirmError, 'Пароль не соответствует требованиям');
    } else {
      passwordConfirm.classList.remove('invalid');
      passwordConfirm.classList.add('valid');
      hideErrorMessage(passwordConfirmError);
    }
  };

  const validateAge = () => {
    if (!birthDay.value.trim()) {
      birthDay.classList.remove('valid');
      birthDay.classList.add('invalid');
      showErrorMessage(birthDayError, 'Введите дату рождения');
    } else {
      const birthDate = new Date(birthDay.value);
      const minDate = new Date('1900-01-01');
      const today = new Date();
      today.setHours(23, 59, 59);

      if (birthDate < minDate || birthDate > today) {
        birthDay.classList.remove('valid');
        birthDay.classList.add('invalid');
        showErrorMessage(birthDayError, 'Введите корректную дату рождения');
      } else {
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age -= 1;
        }
        if (age >= 18) {
          birthDay.classList.remove('invalid');
          birthDay.classList.add('valid');
          hideErrorMessage(birthDayError);
        } else {
          birthDay.classList.remove('valid');
          birthDay.classList.add('invalid');
          showErrorMessage(birthDayError, 'Возраст должен быть не менее 18 лет');
        }
      }
    }
  };

  const validateAgeOnInput = () => {
    if (!birthDay.value.trim()) {
      return false;
    }

    const birthDate = new Date(birthDay.value);
    const minDate = new Date('1900-01-01');
    const today = new Date();
    today.setHours(23, 59, 59);

    if (birthDate < minDate || birthDate > today) {
      return false;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }

    if (age >= 18) {
      return true;
    }
    return false;
  };

  // const checkFormValidity = () => {
  //   const isValid = [...form.elements].every((element) => {
  //     if (element.tagName.toLowerCase() === 'button') return true; // пропустить кнопку
  //     return element.classList.contains('valid');
  //   });
  //   submitButton.disabled = !isValid;
  // };

  firstName.addEventListener('blur', () => {
    const emptyNameMsg = 'Введите Имя';
    const invalidNameMsg = 'Введите корректное Имя';
    validateField(firstName, namePattern, firstNameError, emptyNameMsg, invalidNameMsg);
    // checkFormValidity();
  });

  lastName.addEventListener('blur', () => {
    const emptyLastNameMsg = 'Введите Фамилию';
    const invalidLastNameMsg = 'Введите корректную Фамилию';
    validateField(lastName, namePattern, lastNameError, emptyLastNameMsg, invalidLastNameMsg);
    // checkFormValidity();
  });

  email.addEventListener('blur', () => {
    const emptyEmailMsg = 'Введите Email';
    const invalidEmailMsg = 'Введите корректный Email';
    validateField(email, emailPattern, emailError, emptyEmailMsg, invalidEmailMsg);
    // checkFormValidity();
  });

  password.addEventListener('focus', () => {
    document.getElementById('password-hint').style.display = 'block';
  });

  password.addEventListener('blur', () => {
    document.getElementById('password-hint').style.display = 'none';
    const emptyPasswordMsg = 'Укажите пароль';
    const invalidPassordMsg = 'Пароль не соответствует требованиям';
    validatePassword(password, passwordPattern, passwordError, emptyPasswordMsg, invalidPassordMsg);
    validatePasswordMatch();
    // checkFormValidity();
  });

  passwordConfirm.addEventListener('blur', () => {
    validatePasswordMatch();
    // checkFormValidity();
  });

  birthDay.addEventListener('blur', () => {
    validateAge();
    // checkFormValidity();
  });

  form.addEventListener('input', () => {
    if (namePattern.test(firstName.value)
    && namePattern.test(lastName.value)
    && emailPattern.test(email.value)
    && passwordPattern.test(password.value)
    && (passwordConfirm.value === password.value)
    && validateAgeOnInput()) {
      form.classList.add('valid');
      form.classList.remove('invalid');
      submitButton.disabled = false;
    } else {
      form.classList.remove('valid');
      form.classList.add('invalid');
      submitButton.disabled = true;
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.textContent = 'Регистрация прошла успешно!';
    successMessage.style.display = 'block';
    form.reset();
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 2000);
    setTimeout(() => {
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }, 3000);
  });
});
