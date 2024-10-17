const form = document.getElementById("sign-up");

const usernameContainer = document.getElementById("username");
const usernameInput = document.getElementById("username-input");

const emailContainer = document.getElementById("email");
const emailInput = document.getElementById("email-input");

const passwordContainer = document.getElementById("password");
const passwordInput = document.getElementById("password-input");
    
const confirmPasswordContainer = document.getElementById("confirm-password");
const confirmPasswordInput = document.getElementById("confirm-password-input");
   
   

function showError (input, message) {
    // input element
    const inputContainer = input.closest(".input-container");

    // add the error class
    inputContainer.classList.remove('success');
    inputContainer.classList.add('error');

    // show the error message
    const error = inputContainer.querySelector('p');
    error.innerText = message;
};


function showSuccess(input){
    // get the form-field element
    const inputContainer = input.closest(".input-container");

    // remove the error class
    inputContainer.classList.remove('error');
    inputContainer.classList.add('success');

    // hide the error message
    const error = inputContainer.querySelector('p');
    error.innerText = '';
};


function isAlphanumeric(str) {
    for (let i = 0; i < str.length; i++) {
        const charCheck = str.charCodeAt(i);
        if (!(charCheck >= 65 && charCheck <= 90) &&  
                !(charCheck >= 97 && charCheck <= 122) && 
                !(charCheck >= 48 && charCheck <= 57)){  
                        return false;
            }
    }
    return true;
}

function isNumeric(str){
    for (let i = 0; i < str.length; i++) {
        const charCheck = str.charCodeAt(i);
        if ((charCheck >= 48 && charCheck <= 57)){  
            return true;
        }
    }
    return false;
}


function validateUsername(value){
    let msg;
    if(value.length === 0){
        msg = "Username cannot be empty";
    }

    else if(value.length > 12 || value.length < 5){
        msg = "Username must be between 5 and 12 characters long";  
    }

    else if(value.toLowerCase() === "username"){
        msg = "Username can't be used";
    }

    else if(value.includes(' ')){
        msg = "Spaces are not allowed in username";   
    }

    else if(!isAlphanumeric(value)){
        msg = "Username should only contain alphanumeric characters";
    }
    else{
        showSuccess(usernameInput);
        return true;
    }

    showError (usernameInput, msg);
    console.log("Name:", value, false);
    return false;
}

function validateEmail(value){
    let msg;
    if(value.length === 0){
        msg = ("Email cannot be empty");
    }
    else if (!value.includes('@') || !value.split('@')[1].includes('.')) {
        msg = "Please enter a valid email address.";
    }
    else{
        showSuccess(emailInput);
        return true;
    }

    showError (emailInput, msg);
    console.log("Email:", value, false);
    return false;
}

function validatePassword(value){
    let msg;
    if(value.length === 0){
        msg = "Password cannot be empty";
    }
    if(value.length > 26 || value.length < 8 ){
        msg = "Password must be between 8 and 26 characters long";
    }
    else{
        showSuccess(passwordInput);
        return true;
    }

    showError (passwordInput, msg);
    console.log("Password:", value, false);
    return false;
}

    function validateConfirmPassword(value, passwordValue = null) {
        let msg;
        if (passwordValue === null) {
            msg = "Please set your password";
        } 
        else if (value.length === 0) {
            msg = "Please confirm your password";
        }
        else if (value != passwordValue) {
            msg = "Passwords do not match";
        } 
        else {
            showSuccess(confirmPasswordInput);
            return true;
        }

        showError(confirmPasswordInput, msg);
        console.log("Confirm Password:",value , false);
        return false;
    }

function handleSubmit(event){

    event.preventDefault();
    
    const isUsernameValid = validateUsername(usernameInput.value);
    const isEmailValid = validateEmail(emailInput.value);
    const isPasswordValid = validatePassword(passwordInput.value);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPasswordInput.value, passwordInput.value);

    const isValid = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

    if(isValid){
        console.log("Form Submitted !");
        console.log(
            "Name: ",
            nameInput.value,
            "\nusername : ", 
            usernameInput.value , 
            "\nEmail:",
            emailInput.value,
            "\nPassword:",
            passwordInput.value);
    }
}

togglePass.addEventListener("click", function () {
    // toggle the type attribute
    const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
    confirmPasswordInput.setAttribute("type", type);
    
    // toggle the icon
    this.classList.toggle("fa-eye");
});

form.addEventListener("submit", handleSubmit);

