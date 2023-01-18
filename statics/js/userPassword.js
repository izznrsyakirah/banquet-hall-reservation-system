var myInput = document.getElementById("registerPassword");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

var repeatPasswordMessage = document.getElementById("repeatPasswordMessage");
var registerRepeatPassword = document.getElementById("registerRepeatPassword");

var signUpButton = document.getElementById("signUpButton");

// When the user clicks on the password field, show the message box
/*myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}
 
// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}*/

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

    if (letter.classList.contains("valid") && capital.classList.contains("valid") &&
        number.classList.contains("valid") && length.classList.contains("valid") &&
        repeatPasswordMessage.classList.contains("valid")) {
            signUpButton.disabled = false;
    } else {
        signUpButton.disabled = true;
    }
}

registerRepeatPassword.onkeyup = function () {
    if (myInput.value == registerRepeatPassword.value) {
        repeatPasswordMessage.classList.remove("invalid");
        repeatPasswordMessage.classList.add("valid");
    } else {
        repeatPasswordMessage.classList.remove("valid");
        repeatPasswordMessage.classList.add("invalid");
        signUpButton.disabled = true;
    }

    if (letter.classList.contains("valid") && capital.classList.contains("valid") &&
        number.classList.contains("valid") && length.classList.contains("valid") &&
        repeatPasswordMessage.classList.contains("valid")) {
            signUpButton.disabled = false;
    } else {
        signUpButton.disabled = true;
    }
}


