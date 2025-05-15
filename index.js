    const form = document.getElementById('registrationForm');
    const tableBody = document.getElementById('tableBody');

    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    const dobEl = document.getElementById('dob');
    const termsEl = document.getElementById('terms');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const dobError = document.getElementById('dobError');
    const termsError = document.getElementById('termsError');

    function calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Clear previous errors
      nameError.textContent = '';
      emailError.textContent = '';
      passwordError.textContent = '';
      dobError.textContent = '';
      termsError.textContent = '';

      let isValid = true;

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const password = passwordEl.value.trim();
      const dob = dobEl.value;
      const termsAccepted = termsEl.checked;

      const age = calculateAge(dob);

      // Validation
      if (name === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Enter a valid email address.';
        isValid = false;
      }

      if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters.';
        isValid = false;
      }

      if (!dob || age < 18 || age > 55) {
        dobError.textContent = 'Age must be between 18 and 55.';
        isValid = false;
      }

      if (!termsAccepted) {
        termsError.textContent = 'You must accept the terms.';
        isValid = false;
      }

      if (!isValid) return;

      // Add data to table
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${dob}</td>
        <td>${termsAccepted ? 'Yes' : 'No'}</td>
      `;

      tableBody.appendChild(row);
      form.reset();
    });