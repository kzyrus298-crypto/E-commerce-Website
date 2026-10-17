var loginForm = document.getElementById('loginForm');
var emailInput = document.getElementById('userEmail');
var passInput = document.getElementById('userPassword');
var emailFeedback = document.getElementById('emailFeedback');
var passFeedback = document.getElementById('passFeedback');
var emailStatusIcon = document.getElementById('emailStatusIcon');

var toggleEyeBtn = document.getElementById('toggleEyeBtn');
var capsWarning = document.getElementById('capsWarning');
var strengthWrapper = document.getElementById('strengthWrapper');
var strengthBar = document.getElementById('strengthBar');
var strengthLabel = document.getElementById('strengthLabel');

var hoorayModal = document.getElementById('hoorayModal');
var closeHoorayBtn = document.getElementById('closeHoorayBtn');
var displayUserEmail = document.getElementById('displayUserEmail');

function checkGmail(email) {
    var str = email.trim();

    if (str === "") {
        return { valid: false, msg: "⚠️ Pakilagay ang iyong Gmail address." };
    }

    if (!str.includes('@')) {
        return { valid: false, msg: "❌ Mali: Ang email ay dapat may '@' symbol (e.g. name@gmail.com)!" };
    }

    var parts = str.split('@');
    if (parts[0].length === 0) {
        return { valid: false, msg: "❌ Mali: Walang username bago ang '@' symbol!" };
    }

    if (parts[1].toLowerCase() !== 'gmail.com') {
        return { valid: false, msg: "❌ Mali: Dapat nagtatapos sa '@gmail.com' ang email mo!" };
    }

    return { valid: true, msg: "✅ Valid Gmail address!" };
}

if (emailInput) {
    emailInput.addEventListener('input', function() {
        var val = emailInput.value;

        if (val.trim() === "") {
            emailInput.classList.remove('valid', 'invalid');
            emailFeedback.textContent = "";
            if (emailStatusIcon) emailStatusIcon.textContent = "";
            return;
        }

        var res = checkGmail(val);

        if (res.valid) {
            emailInput.classList.remove('invalid');
            emailInput.classList.add('valid');
            emailFeedback.className = "feedback-msg success";
            emailFeedback.textContent = res.msg;
            if (emailStatusIcon) emailStatusIcon.textContent = "✓";
        } else {
            emailInput.classList.remove('valid');
            emailInput.classList.add('invalid');
            emailFeedback.className = "feedback-msg error";
            emailFeedback.textContent = res.msg;
            if (emailStatusIcon) emailStatusIcon.textContent = "✕";
        }
    });
}

if (toggleEyeBtn && passInput) {
    toggleEyeBtn.addEventListener('click', function() {
        if (passInput.type === 'password') {
            passInput.type = 'text';
            toggleEyeBtn.textContent = '🙈';
        } else {
            passInput.type = 'password';
            toggleEyeBtn.textContent = '👁️';
        }
    });
}

if (passInput && capsWarning) {
    ['keydown', 'keyup'].forEach(function(evt) {
        passInput.addEventListener(evt, function(e) {
            if (e.getModifierState && e.getModifierState('CapsLock')) {
                capsWarning.style.display = 'block';
            } else {
                capsWarning.style.display = 'none';
            }
        });
    });
}

if (passInput && strengthWrapper && strengthBar && strengthLabel) {
    passInput.addEventListener('input', function() {
        var val = passInput.value;

        if (val.length === 0) {
            strengthWrapper.style.display = 'none';
            passFeedback.textContent = "";
            return;
        }

        strengthWrapper.style.display = 'flex';

        if (val.length < 6) {
            strengthBar.style.width = '30%';
            strengthBar.style.backgroundColor = '#ff5252';
            strengthLabel.textContent = "Weak (minimum 6 characters required)";
            strengthLabel.style.color = '#ff5252';
        } else if (val.length >= 6 && val.length < 10) {
            strengthBar.style.width = '65%';
            strengthBar.style.backgroundColor = '#ffb74d';
            strengthLabel.textContent = "Medium strength password";
            strengthLabel.style.color = '#ffb74d';
        } else {
            strengthBar.style.width = '100%';
            strengthBar.style.backgroundColor = '#4cd964';
            strengthLabel.textContent = "Strong password! 🔒";
            strengthLabel.style.color = '#4cd964';
        }
    });
}

window.prefillGoogle = function() {
    var sample = prompt("Simulate Google Sign-in: Ilagay ang iyong Gmail:", "juan.delacruz@gmail.com");
    if (sample && emailInput) {
        emailInput.value = sample;
        emailInput.dispatchEvent(new Event('input'));
    }
};

window.handleForgot = function() {
    alert("🔑 Password Recovery:\nIsang reset link ang ipapadala sa iyong Gmail.");
};

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var emailVal = emailInput.value;
        var passVal = passInput.value;
        var checkRes = checkGmail(emailVal);

        if (!checkRes.valid) {
            emailInput.classList.add('invalid');
            emailFeedback.className = "feedback-msg error";
            emailFeedback.textContent = checkRes.msg;
            emailInput.focus();
            return;
        }

        if (passVal.trim().length < 6) {
            passInput.classList.add('invalid');
            passFeedback.className = "feedback-msg error";
            passFeedback.textContent = "❌ Password must be at least 6 characters!";
            passInput.focus();
            return;
        } else {
            passInput.classList.remove('invalid');
            passFeedback.textContent = "";
        }

        if (displayUserEmail) {
            displayUserEmail.textContent = emailVal;
        }

        if (hoorayModal) {
            hoorayModal.classList.add('active');
        }
    });
}

if (closeHoorayBtn && hoorayModal) {
    closeHoorayBtn.addEventListener('click', function() {
        hoorayModal.classList.remove('active');
        if (loginForm) loginForm.reset();
        if (emailInput) emailInput.classList.remove('valid');
        if (passInput) passInput.classList.remove('valid');
        if (emailFeedback) emailFeedback.textContent = "";
        if (passFeedback) passFeedback.textContent = "";
        if (strengthWrapper) strengthWrapper.style.display = 'none';
        if (emailStatusIcon) emailStatusIcon.textContent = "";
    });
}

if (hoorayModal) {
    hoorayModal.addEventListener('click', function(e) {
        if (e.target === hoorayModal) {
            hoorayModal.classList.remove('active');
        }
    });
}