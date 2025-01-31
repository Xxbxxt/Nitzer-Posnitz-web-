document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    function validateUsername() {
        const value = username.value.trim();
        const error = document.getElementById('usernameError');
        
        if (value.length < 3) {
            showError(username, error, 'Username must be at least 3 characters long');
            return false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            showError(username, error, 'Username can only contain letters, numbers, and underscores');
            return false;
        }
        
        hideError(username, error);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();
        const error = document.getElementById('emailError');
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            showError(email, error, 'Please enter a valid email address');
            return false;
        }
        
        hideError(email, error);
        return true;
    }

    function validatePassword() {
        const value = password.value;
        const error = document.getElementById('passwordError');
        
        if (value.length < 8) {
            showError(password, error, 'Password must be at least 8 characters long');
            return false;
        }
        
        hideError(password, error);
        return true;
    }

    function validateConfirmPassword() {
        const error = document.getElementById('confirmPasswordError');
        
        if (confirmPassword.value !== password.value) {
            showError(confirmPassword, error, 'Passwords do not match');
            return false;
        }
        
        hideError(confirmPassword, error);
        return true;
    }

    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }

    function hideError(input, errorElement) {
        input.classList.remove('error');
        errorElement.style.display = 'none';
    }

    function updatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength += 25;
        if (password.match(/[a-z]/)) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        
        strengthBar.style.width = strength + '%';
        
        if (strength <= 25) {
            strengthBar.style.backgroundColor = '#ef4444';
            strengthText.textContent = 'Weak password';
        } else if (strength <= 50) {
            strengthBar.style.backgroundColor = '#f59e0b';
            strengthText.textContent = 'Fair password';
        } else if (strength <= 75) {
            strengthBar.style.backgroundColor = '#10b981';
            strengthText.textContent = 'Good password';
        } else {
            strengthBar.style.backgroundColor = '#059669';
            strengthText.textContent = 'Strong password';
        }
    }

    // Event listeners
    username.addEventListener('input', validateUsername);
    email.addEventListener('input', validateEmail);
    password.addEventListener('input', function() {
        validatePassword();
        updatePasswordStrength(this.value);
    });
    confirmPassword.addEventListener('input', validateConfirmPassword);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = validateUsername() && 
                      validateEmail() && 
                      validatePassword() && 
                      validateConfirmPassword();

        if (isValid) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Creating account...';
            
            // Simulate form submission
            setTimeout(() => {
                successMessage.style.display = 'block';
                setTimeout(() => {
                    window.location.href = "{% url 'login' %}";
                }, 2000);
            }, 1500);
        }
    });
});