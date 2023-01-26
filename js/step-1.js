//validation form

const NUMBER_LENGTH = 8;
const PHONE_INPUT_ID = "phoneNumber";
const INPUTS = document.querySelectorAll(".input");
const NUMBER_INPUT = document.getElementById(PHONE_INPUT_ID);

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
        removeBgImgFromINPUTS(INPUTS);
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
      false
    );
  });
})();

function validatePhoneNumber(input_str) {
  let re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{3})$/;
  return re.test(input_str);
}

function validateComment(element, value) {
  if (!value) {
    element.style.display = "block";
    element.previousElementSibling.style.borderColor = "red";
    return;
  }
  element.style.display = "none";
  element.previousElementSibling.style.borderColor = "green";
}

function removeBgImgFromINPUTS(elements) {
  elements.forEach((element) => (element.style.backgroundImage = "none"));
}

NUMBER_INPUT.addEventListener("keyup", (e) => {
  if (
    e.target.value.length - 1 === NUMBER_LENGTH &&
    validatePhoneNumber(e.target.value)
  ) {
    validateComment(e.target.nextElementSibling, true);
  } else {
    validateComment(e.target.nextElementSibling, false);
  }
});
