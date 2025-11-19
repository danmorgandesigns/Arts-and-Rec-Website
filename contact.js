document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const subjectField = document.getElementById('subject');

  form.addEventListener('submit', (e) => {
    // Validate form before submission
    if (!form.checkValidity()) {
      e.preventDefault();
      
      // Show validation errors
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (!input.validity.valid) {
          errorSpan.classList.remove('hidden');
          if (input.validity.valueMissing) {
            errorSpan.textContent = 'This field is required';
          } else if (input.validity.typeMismatch) {
            errorSpan.textContent = 'Please enter a valid email address';
          }
          input.classList.add('border-red-500');
        } else {
          errorSpan.classList.add('hidden');
          input.classList.remove('border-red-500');
        }
      });
      return false;
    }

    // Append #gretel tag to subject
    if (subjectField.value && !subjectField.value.includes('#artsrecguide')) {
      subjectField.value = subjectField.value.trim() + ' #artsrecguide';
    }
  });

  // Clear error messages on input
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const errorSpan = input.parentElement.querySelector('.error-message');
      if (input.validity.valid) {
        errorSpan.classList.add('hidden');
        input.classList.remove('border-red-500');
      }
    });
  });
});
