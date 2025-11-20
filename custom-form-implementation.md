# Custom Contact Form Implementation with Thank You Modal

## Overview
This contact form uses Formspree for backend handling but implements a custom client-side flow to prevent Formspree's default confirmation page. Instead, it shows a styled modal and redirects users to the home page.

## Implementation Flow

### 1. Form Submission Process
1. User fills out and submits the contact form
2. JavaScript intercepts submission with `e.preventDefault()`
3. Form validation runs (shows inline errors if needed)
4. Subject field gets `#artsrecguide` tag appended (for email filtering)
5. Form data submitted to Formspree via `fetch()` API
6. On success: custom modal displays, form resets
7. On error: existing error message div shows

### 2. Modal Display
- Custom thank you modal appears with:
  - Green checkmark icon
  - "Thank You!" heading
  - Success message
  - Blue OK button (#007aff)
- Modal uses existing `.modal` and `.modal-content` classes from site styles

### 3. Modal Dismissal & Redirect
- User clicks OK button
- Modal closes
- Automatic redirect to `index.html` (home page)

## Key Code Sections

### HTML (contact.html)
```html
<!-- Thank You Modal (lines 130-154) -->
<div id="thankYouModal" class="modal">
  <div class="modal-content" style="max-width: 500px;">
    <div class="modal-body" style="text-align: center; padding: 2rem;">
      <div style="margin-bottom: 1.5rem;">
        <i class="fas fa-check-circle" style="font-size: 4rem; color: #10b981;"></i>
      </div>
      <h2 style="font-size: 1.75rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">
        Thank You!
      </h2>
      <p style="font-size: 1.125rem; color: #6b7280; margin-bottom: 2rem;">
        Your message has been sent successfully. We'll get back to you as soon as possible.
      </p>
      <button id="modalOkButton" class="text-white font-semibold py-3 px-8 rounded-full transition duration-200"
        style="background-color: #007aff;">
        OK
      </button>
    </div>
  </div>
</div>
```

### JavaScript (contact.js)
```javascript
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const subjectField = document.getElementById('subject');
  const thankYouModal = document.getElementById('thankYouModal');
  const modalOkButton = document.getElementById('modalOkButton');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Intercept default submission

    // Validate form
    if (!form.checkValidity()) {
      // Show inline validation errors
      return false;
    }

    // Append tracking tag to subject
    if (subjectField.value && !subjectField.value.includes('#artsrecguide')) {
      subjectField.value = subjectField.value.trim() + ' #artsrecguide';
    }

    // Submit via fetch
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // Show custom modal instead of Formspree's page
        thankYouModal.classList.add('active');
        form.reset();
      } else {
        // Show error message div
        document.getElementById('errorMessage').classList.remove('hidden');
      }
    } catch (error) {
      document.getElementById('errorMessage').classList.remove('hidden');
    }
  });

  // Modal OK button handler
  modalOkButton.addEventListener('click', () => {
    thankYouModal.classList.remove('active');
    window.location.href = 'index.html'; // Redirect to home
  });
});
```

## Key Features
- ✅ Prevents Formspree's default confirmation page
- ✅ Custom modal styled to match site design
- ✅ Form resets after successful submission
- ✅ Email subject gets tracking tag (`#artsrecguide`)
- ✅ Automatic redirect to home page on modal dismissal
- ✅ Inline form validation with error messages
- ✅ Error handling for failed submissions

## Customization Points
To adapt this for another site, modify:
1. **Tracking tag**: Change `#artsrecguide` to your preferred tag
2. **Modal styling**: Adjust colors, fonts, and layout in HTML modal
3. **Redirect URL**: Change `index.html` to your desired destination
4. **Formspree endpoint**: Update `form.action` attribute with your Formspree URL
5. **Modal content**: Customize heading and message text as needed

## Dependencies
- Formspree account and form endpoint
- Font Awesome (for checkmark icon)
- Tailwind CSS (for utility classes)
- Existing site `.modal` styles in CSS
