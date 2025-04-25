/* Created the entire form*/

const phoneRegex = /^(\+\d{1,3}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;
const emailRegex = /^[\w.-]+@[\w.-]+\.(com|gov|edu|io|net)$/;
const zipRegex = /^\d{5}(-\d{4})?$/;

const stateAbbreviations = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA',
  'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
  'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
  'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'
];

function initValidation(selector){
    const form = document.querySelector(selector);

    form.addEventListener("submit", function(e){
        e.preventDefault();

        const isValid = validateForm(form)
        if (isValid){
            form.classList.add("hidden");
            const thankYou = document.getElementById("thank-you");
            if(thankYou){
                thankYou.classList.remove("hidden")
            }
        }else{
            console.log('Form is invalid. Submission is stopped.')
        }
    });

    const fields = form.querySelectorAll("input, selector, textarea");
    fields.forEach(field => {
        field.addEventListener("input", function(){
            validateField(field);
        });
    });
}

function validateField(input){
    const id= input.id;

    switch(id){
        case "fname":
        case "lname":
        case "address":
        case "city":
        case "email":
        case "zip":
        case "phone":
            checkRequired(input.form, id, "This field is required.");
            break
        case "state":
            checkRequired(input.form, id, "State is required.");
            validateState(id, "Invalid state abbreviation.");
            break;
        
    }
}
function validateForm(form){
    let isValid = true;

    const errorMsgs = form.querySelectorAll(".errorMsg");
    errorMsgs.forEach((el) => (el.textContent = ""));

    

    if (!checkRequired(form, "fname", "First name is required.")) isValid=false;
    if (!checkRequired(form, "lname", "Last name is required.")) isValid=false;
    if (!checkRequired(form, "address", "Address is required.")) isValid=false;
    if (!checkRequired(form, "city", "City is required.")) isValid=false;
    if (!checkRequired(form, "state", "State is required."))isValid = false;
    else if (!validateState("state", "Invalid state abbreviation.")) isValid=false;
    if (!checkRequired(form, "zip", "ZIP code must be 5 digits.", zipRegex)) isValid=false;
    if (!checkRequired(form, "email", "Please enter a valid email.", emailRegex)) isValid=false;
    if (!checkRequired(form, "phone", "Please enter a valid phone number.", phoneRegex)) isValid=false;
    
    if (!validateReferral(form)) isValid = false;
    return isValid
}

 function checkRequired(form, fieldId, errorMsg, pattern = null){
    const input = form.querySelector(`#${fieldId}`);
    if (!input) return false;

    const value = input.value.trim();

    if (!value){
        showError(input, errorMsg);
        return false;
    }

    if (pattern && !pattern.test(value)){
        showError(input, errorMsg);
        return false;
    }
    clearError(input);
    return true;
}

function validateState(id, message){
    const input = document.getElementById(id);
    const stateAbbr = input?.value.trim().toUpperCase();
    const isValid = stateAbbreviations.includes(stateAbbr);
    setElementValidity(id, isValid, message);
    return isValid;
}

function validateReferral(form){
    const checked = document.querySelectorAll("input[name='referral']:checked");
    const errorDiv = form.querySelector("#referral-error");
    if (checked.length ===0){
        if (errorDiv) errorDiv.textContent = "Please select at least one option.";
        return false;
    }

    if (errorDiv) errorDiv.textContent = "";
    return true;
}

 function setElementValidity(id, valid, message){
    const input = document.getElementById(id);

    if(!input) return;
    if (!valid){
        showError(input, message);
    }else{
        clearError(input);
    }
}

function showError(inputEl, message){
    const error = inputEl.nextElementSibling;
    if (error && error.classList.contains('errorMsg')){
        error.textContent= message;
    }
    inputEl.classList.add("invalid");
}

function clearError(inputEl){
    

    const error = inputEl.nextElementSibling;
    if (error && error.classList.contains('errorMsg')){
        error.textContent= "";
    }
    inputEl.classList.remove('invalid');
}