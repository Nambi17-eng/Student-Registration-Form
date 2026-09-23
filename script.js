document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const successBanner = document.getElementById('successBanner');
  const summaryList = document.getElementById('summaryList');
  const successName = document.getElementById('successName');
  const resetBtn = document.getElementById('resetBtn');
  const newRegistrationBtn = document.getElementById('newRegistrationBtn');
  const addressField = document.getElementById('address');
  const addressCount = document.getElementById('addressCount');
  const dobField = document.getElementById('dob');

  // Don't allow a date of birth in the future
  const today = new Date().toISOString().split('T')[0];
  dobField.setAttribute('max', today);

  // Live character counter for the address field
  addressField.addEventListener('input', function () {
    addressCount.textContent = addressField.value.length + ' / 150';
  });

  const validators = {
    fullName: function (value) {
      if (!value.trim()) return 'Please enter the full name.';
      if (value.trim().length < 3) return 'Name should be at least 3 characters.';
      if (!/^[A-Za-z\s.]+$/.test(value.trim())) return 'Name should only contain letters.';
      return '';
    },
    rollNumber: function (value) {
      if (!value.trim()) return 'Please enter the roll number.';
      return '';
    },
    email: function (value) {
      if (!value.trim()) return 'Please enter an email address.';
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(value.trim())) return 'Enter a valid email address.';
      return '';
    },
    phone: function (value) {
      if (!value.trim()) return 'Please enter a phone number.';
      if (!/^[6-9]\d{9}$/.test(value.trim())) return 'Enter a valid 10-digit mobile number.';
      return '';
    },
    dob: function (value) {
      if (!value) return 'Please select a date of birth.';
      const selected = new Date(value);
      const now = new Date();
      let age = now.getFullYear() - selected.getFullYear();
      const monthDiff = now.getMonth() - selected.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < selected.getDate())) {
        age--;
      }
      if (age < 15) return 'Student must be at least 15 years old.';
      return '';
    },
    course: function (value) {
      if (!value) return 'Please select a course.';
      return '';
    },
    address: function (value) {
      if (!value.trim()) return 'Please enter an address.';
      if (value.trim().length < 10) return 'Address should be at least 10 characters.';
      return '';
    }
  };

  function showResult(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    errorEl.textContent = message;
    if (message) {
      input.classList.add('invalid');
      input.classList.remove('valid');
    } else {
      input.classList.remove('invalid');
      input.classList.add('valid');
    }
  }

  function validateField(fieldId) {
    const input = document.getElementById(fieldId);
    const message = validators[fieldId](input.value);
    showResult(fieldId, message);
    return message === '';
  }

  function validateGender() {
    const checked = form.querySelector('input[name="gender"]:checked');
    const errorEl = document.getElementById('genderError');
    if (!checked) {
      errorEl.textContent = 'Please select a gender.';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  // Attach live validation to every field as the user types or leaves it
  Object.keys(validators).forEach(function (fieldId) {
    const input = document.getElementById(fieldId);
    const isChangeType = input.tagName === 'SELECT' || input.type === 'date';
    const eventName = isChangeType ? 'change' : 'input';
    input.addEventListener(eventName, function () {
      validateField(fieldId);
    });
    input.addEventListener('blur', function () {
      validateField(fieldId);
    });
  });

  form.querySelectorAll('input[name="gender"]').forEach(function (radio) {
    radio.addEventListener('change', validateGender);
  });

  function clearFormState() {
    form.reset();
    form.querySelectorAll('.invalid, .valid').forEach(function (el) {
      el.classList.remove('invalid', 'valid');
    });
    form.querySelectorAll('.error').forEach(function (el) {
      el.textContent = '';
    });
    addressCount.textContent = '0 / 150';
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let isValid = true;
    Object.keys(validators).forEach(function (fieldId) {
      if (!validateField(fieldId)) isValid = false;
    });
    if (!validateGender()) isValid = false;

    if (!isValid) {
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = {
      'Full Name': document.getElementById('fullName').value.trim(),
      'Roll Number': document.getElementById('rollNumber').value.trim(),
      'Email': document.getElementById('email').value.trim(),
      'Phone': document.getElementById('phone').value.trim(),
      'Date of Birth': document.getElementById('dob').value,
      'Gender': form.querySelector('input[name="gender"]:checked').value,
      'Course': document.getElementById('course').value,
      'Address': document.getElementById('address').value.trim()
    };

    summaryList.innerHTML = '';
    Object.keys(data).forEach(function (key) {
      const dt = document.createElement('dt');
      dt.textContent = key;
      const dd = document.createElement('dd');
      dd.textContent = data[key];
      summaryList.appendChild(dt);
      summaryList.appendChild(dd);
    });

    successName.textContent = data['Full Name'];
    form.hidden = true;
    successBanner.hidden = false;
  });

  resetBtn.addEventListener('click', clearFormState);

  newRegistrationBtn.addEventListener('click', function () {
    clearFormState();
    successBanner.hidden = true;
    form.hidden = false;
  });
});

