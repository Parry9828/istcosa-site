


const loginForm = document.querySelector("form.login");

const signupForm = document.querySelector("form.signup");

const loginBtn = document.querySelector("label.login");

const signupBtn = document.querySelector("label.signup");

const signupLink = document.querySelector(".signup-link a");

const loginText = document.querySelector(".title-text .login");

const signupText = document.querySelector(".title-text .signup");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
};

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("step");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("signUpForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("step");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("stepIndicator")[currentTab].className +=
      " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("stepIndicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

var config = {
  cUrl: "https://api.countrystatecity.in/v1/countries",
  ckey: "MTZqVUdLd3hrVmY1dGV4c2lmSEVBdkNaRjVVZ1lINFFhWU94RnNpbw==",
};

var countrySelect = document.querySelector(".country"),
  stateSelect = document.querySelector(".state"),
  citySelect = document.querySelector(".city");

function loadCountries() {
  let apiEndPoint = config.cUrl;

  fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
    .then((Response) => Response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.iso2;
        option.textContent = country.name;
        countrySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading countries:", error));

  stateSelect.disabled = true;
  citySelect.disabled = true;
  stateSelect.style.pointerEvents = "none";
  citySelect.style.pointerEvents = "none";
}

function loadStates() {
  stateSelect.disabled = false;
  citySelect.disabled = true;
  stateSelect.style.pointerEvents = "auto";
  citySelect.style.pointerEvents = "none";

  const selectedCountryCode = countrySelect.value;
  // console.log(selectedCountryCode);
  stateSelect.innerHTML = '<option value="">Select State</option>'; // for clearing the existing states
  citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing city options

  fetch(`${config.cUrl}/${selectedCountryCode}/states`, {
    headers: { "X-CSCAPI-KEY": config.ckey },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((state) => {
        const option = document.createElement("option");
        option.value = state.iso2;
        option.textContent = state.name;
        stateSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error loading countries:", error));
}

function loadCities() {
  citySelect.disabled = false;
  citySelect.style.pointerEvents = "auto";

  const selectedCountryCode = countrySelect.value;
  const selectedStateCode = stateSelect.value;
  // console.log(selectedCountryCode, selectedStateCode);

  citySelect.innerHTML = '<option value="">Select City</option>'; // Clear existing city options

  fetch(
    `${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`,
    { headers: { "X-CSCAPI-KEY": config.ckey } }
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      data.forEach((city) => {
        const option = document.createElement("option");
        option.value = city.iso2;
        option.textContent = city.name;
        citySelect.appendChild(option);
      });
    });
}

window.onload = loadCountries;

// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", () => {
  navbar.classList.toggle("showInput");
  if (navbar.classList.contains("showInput")) {
    searchBox.classList.replace("bx-search", "bx-x");
  } else {
    searchBox.classList.replace("bx-x", "bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function () {
  navLinks.style.left = "0";
};
menuCloseBtn.onclick = function () {
  navLinks.style.left = "-100%";
};

// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function () {
  navLinks.classList.toggle("show1");
};
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function () {
  navLinks.classList.toggle("show2");
};
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function () {
  navLinks.classList.toggle("show3");
};

        