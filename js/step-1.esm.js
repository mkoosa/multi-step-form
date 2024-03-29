import Loader from "./Loader.esm.js";
import Storage from "./Storage.esm.js";


console.log('step1');
//validation form
const NUMBER_LENGTH = 8;
const NAME_INPUT_ID = "formName";
const PHONE_INPUT_ID = "phoneNumber";
const EMAIL_INPUT_ID = "formEmail";
const LOADER_ID = "loaderId";
const WRAPPER_ID = "wrapper";
const NEXT_PAGE = `html/step-2.html`;
const INPUTS = document.querySelectorAll(".form-control");
const NUMBER_INPUT = document.getElementById(PHONE_INPUT_ID);
const EMAIL_INPUT = document.getElementById(EMAIL_INPUT_ID);
const NAME_INPUT = document.getElementById(NAME_INPUT_ID);
const WRAPPER = document.getElementById(WRAPPER_ID);
const DISPLAY = "display";
const BLUR = "blur";
const KEY = "stepOne";

let nameFlag = false;
let emailFlag = false;
let numberFlag = false;

const getNumber = () => {
  return new Promise((res, rej) => {
    res(document.getElementById(PHONE_INPUT_ID));
  });
};
(function () {
  let forms = document.querySelectorAll(".needs-validation");
  let comment;
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (checkInputsFlags()) {
          nextStep();
        }
        removeImgFromInputs(INPUTS);
        getNumber().then((data) => {
          if (!validatePhoneNumber(data.value)) {
            comment = data.nextSibling.nextElementSibling;
            validateComment(comment, false);
            event.preventDefault();
            return;
          } else {
            getNumber().then((data) => {
              comment = data.nextSibling.nextElementSibling;
              validateComment(comment, true);
            });
          }
        });
        if (!form.checkValidity()) {
          event.stopPropagation();
        }
        form.classList.add("was-validated");
        event.preventDefault();
      },
      true
    );
  });
})();

//validation inputs
function validateName(name) {
  return name.trim() ? true : false;
}

function validatePhoneNumber(input_str) {
  let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/;
  return re.test(input_str);
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validateComment(element, value) {
  showHideComment(element, value);
  showHideBorder(element, value);
}

function checkName(e) {
  if (validateName(e.target.value)) {
    nameFlag = true;
    validateComment(e.target.nextElementSibling, true);
  } else {
    nameFlag = false;
    validateComment(e.target.nextElementSibling, false);
  }
}

function checkEmail(e) {
  if (!!validateEmail(e.target.value)) {
    emailFlag = true;
    validateComment(e.target.nextElementSibling, true);
  } else {
    emailFlag = false;
    validateComment(e.target.nextElementSibling, false);
  }
}

function checkNumber(e) {
  if (
    e.target.value.length - 1 === NUMBER_LENGTH &&
    validatePhoneNumber(e.target.value)
  ) {
    numberFlag = true;
    validateComment(e.target.nextElementSibling, true);
  } else {
    numberFlag = false;
    validateComment(e.target.nextElementSibling, false);
  }
}

if (NUMBER_INPUT && EMAIL_INPUT && NAME_INPUT) {
  NUMBER_INPUT.addEventListener("keyup", (e) => {
    console.log;
    checkNumber(e);
    checkInputsFlags();
  });
  EMAIL_INPUT.addEventListener("keyup", (e) => {
    checkEmail(e);
    checkInputsFlags();
  });
  NAME_INPUT.addEventListener("keyup", (e) => {
    checkName(e);
    checkInputsFlags();
  });
}

function showHideComment(element, value) {
  if (!value) {
    element.style.display = "block";
    return;
  }
  element.style.display = "none";
}

function showHideBorder(element, value) {
  if (!value) {
    element.previousElementSibling.style.borderColor = "red";
    return;
  }
  element.previousElementSibling.style.borderColor = "green";
}

function removeImgFromInputs(elements) {
  elements.forEach((element) => (element.style.backgroundImage = "none"));
}

function clearInputs() {
  INPUTS.forEach((input) => {
    input.value = "";
  });
}

// is next step allow
function checkInputsFlags() {
  return nameFlag && emailFlag && numberFlag ? true : false;
}

let storage = new Storage();
const nextStep = () => {
  console.log('next');
  storage.createStorage(KEY, createUser());
  WRAPPER.classList.add(BLUR);
  const loader = new Loader(LOADER_ID);
  loader.addClass(DISPLAY);
  setTimeout(() => {
    window.location.href = NEXT_PAGE;
    loader.removeClass(DISPLAY);
    clearInputs();
    WRAPPER.classList.remove(BLUR);
  }, 2000);
};

function createUser() {
  return {
    email: EMAIL_INPUT.value,
    name: NAME_INPUT.value,
    number: NUMBER_INPUT.value,
  };
}

(function fillInputs() {
  const values = storage.getItemFromStorage(KEY);
  if (!values) return;
  const { email, name, number } = values;
  autoFillInTheForm(email, name, number);
  if (!values) return;
})();

function autoFillInTheForm(email, name, number) {
  nameFlag = true;
  emailFlag = true;
  numberFlag = true;
  EMAIL_INPUT.value = email;
  NAME_INPUT.value = name;
  NUMBER_INPUT.value = number;
}
