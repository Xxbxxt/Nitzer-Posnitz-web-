<div class="register-container">
    <div class="logo-container">
        <div class="logo"></div>
    </div>

    <h1>Create your account</h1>
    <p class="subtitle">Start your 30-day free trial</p>

    {% if form.errors %}
    <div class="alert alert-danger">
        {% for field, errors in form.errors.items %}
        {{ errors }}
        {% endfor %}
    </div>
    {% endif %}

    <form method="POST" id="registerForm">
        {% csrf_token %}
        <div class="form-group">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" name="username" class="form-input" required>
            <div class="error-message" id="usernameError"></div>
        </div>

        <div class="form-group">
            <label for="email" class="form-label">Email address</label>
            <input type="email" id="email" name="email" class="form-input" required>
            <div class="error-message" id="emailError"></div>
        </div>

        <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" name="password" class="form-input" required>
            <div class="password-strength">
                <div class="password-strength-bar" id="strengthBar"></div>
            </div>
            <div class="strength-text" id="strengthText">Password strength</div>
            <div class="error-message" id="passwordError"></div>
        </div>

        <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm password</label>
            <input type="password" id="confirmPassword" name="confirm_password" class="form-input" required>
            <div class="error-message" id="confirmPasswordError"></div>
        </div>

        <button type="submit" class="submit-btn" id="submitBtn">Create account</button>
        <div class="success-message" id="successMessage">Registration successful! Redirecting...</div>
    </form>

    <div class="form-footer">
        Already have an account? <a href="{% url 'login' %}">Sign in</a>
    </div>
</div>

<script src="{% static 'js/register.js' %}"></script> 