document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const subjectField = document.getElementById('subject');
  const thankYouModal = document.getElementById('thankYouModal');
  const modalOkButton = document.getElementById('modalOkButton');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Always prevent default to handle submission manually

    // Validate form before submission
    if (!form.checkValidity()) {
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

    // Append #artsrecguide tag to subject
    if (subjectField.value && !subjectField.value.includes('#artsrecguide')) {
      subjectField.value = subjectField.value.trim() + ' #artsrecguide';
    }

    // Submit form via fetch
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Show custom thank you modal
        thankYouModal.classList.add('active');
        // Reset the form
        form.reset();
        // Hide any success/error messages
        document.getElementById('successMessage').classList.add('hidden');
        document.getElementById('errorMessage').classList.add('hidden');
      } else {
        // Show error message
        document.getElementById('errorMessage').classList.remove('hidden');
        document.getElementById('successMessage').classList.add('hidden');
      }
    } catch (error) {
      // Show error message
      document.getElementById('errorMessage').classList.remove('hidden');
      document.getElementById('successMessage').classList.add('hidden');
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

  // Handle modal OK button click
  modalOkButton.addEventListener('click', () => {
    thankYouModal.classList.remove('active');
    // Redirect to index.html
    window.location.href = 'index.html';
  });
});
