document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const usernameInput = document.getElementById('id_username'); // Use the actual ID from your Django form
    const emailInput = document.getElementById('id_email');       // Use the actual ID from your Django form
    const passwordInput = document.getElementById('id_password1'); // Use the actual ID from your Django form
    const confirmPasswordInput = document.getElementById('id_password2'); // Use the actual ID
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessages = document.querySelectorAll('.error-message'); // Select all error message elements

    function updatePasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) strength += 25; // Check for special characters

        strengthBar.style.width = strength + '%';

        let strengthTextContent = "";
        let strengthBarColor = "";

        if (strength < 25) {
            strengthTextContent = 'Very Weak';
            strengthBarColor = '#ef4444'; // Red
        } else if (strength < 50) {
            strengthTextContent = 'Weak';
            strengthBarColor = '#f59e0b'; // Amber/Orange
        } else if (strength < 75) {
            strengthTextContent = 'Fair';
            strengthBarColor = '#10b981'; // Teal/Green
        } else if (strength < 100) {
            strengthTextContent = 'Good';
            strengthBarColor = '#059669'; // Emerald Green
        } else {
            strengthTextContent = 'Strong';
            strengthBarColor = '#047857'; // Darker Green
        }

        strengthText.textContent = strengthTextContent;
        strengthBar.style.backgroundColor = strengthBarColor;
    }


    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });

    // Password confirmation check
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value !== passwordInput.value) {
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
        } else {
            confirmPasswordInput.setCustomValidity(""); // Clear the error message
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous error messages
        errorMessages.forEach(message => message.style.display = 'none');

        // Check for client-side errors (e.g., empty fields, password mismatch)
        if (!form.checkValidity()) {
            form.classList.add('was-validated'); // Trigger Bootstrap's validation styles
            return; // Stop form submission
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        // Simulate form submission (replace with actual AJAX or form submission)
        setTimeout(() => {
            successMessage.style.display = 'block';
            form.style.display = 'none'; // Hide the form after successful submission

            // Redirect after a delay (optional)
            setTimeout(() => {
                window.location.href = "{% url 'login' %}";  // Replace with your actual redirect URL
            }, 2000); // 2 seconds delay
        }, 2000); // Simulate 2 seconds processing time
    });

    // Initially hide all error messages
    errorMessages.forEach(message => message.style.display = 'none');


});