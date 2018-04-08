
// ----------- MODAL -----------
// MODAL JavaScript was adapted from the Udacity's Web Accessibility Course: https://classroom.udacity.com/courses/ud891/lessons/7962031279/concepts/79621414230923#



// Holds Previously focused element
//var focusedElementBeforeModal;

// Find the modal and it's overlay
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');

var modalToggle = document.querySelector('.modal-toggle');
modalToggle.addEventListener('click', openModal);

function openModal() {
  //Save current focus
  focusedElementBeforeModal = document.activeElement;

  // Listen for and trap the keyboard
  modal.addEventListener('keydown', trapTabKey);

  // Listen for indicators to close modal
  modalOverlay.addEventListener('click', closeModal);

  // Sign Up button
  var signUpBtn = modal.querySelector('#signUp');
  signUpBtn.addEventListener('click', closeModal);

  //Find all focusable children
  var focusableElementString = "button:not([disabled])";

  var focusableElements = modal.querySelectorAll(focusableElementString);

  // Convert NodeList to Array
  focusableElements = Array.prototype.slice.call(focusableElements);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length -1];

  //Show modal and overlay
  modal.style.display = 'block';
  modalOverlay.style.display = 'block';

  //Focus first child
  firstTabStop.focus();

  function trapTabKey(e){
    console.log('trapTabKey');
    if (e.keyCode === 9) {

      //Shift + Tab
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

      // Tab
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // Escape key
    if (e.keyCode === 27) {
      closeModal();
    }
  }
}

function closeModal() {
  // Hide modal and overlay
  modal.style.display = 'none';
  modalOverlay.style.display = 'none';

  // Set focus back to element user was on before modal opened
  focusedElementBeforeModal.focus();
}



// ----------- FORM -----------

var submitBtn = document.querySelector('.submit-form');
var messageInput =  document.querySelector('.message-input');
var errorAlert = document.querySelector('.error-alert');
submitBtn.addEventListener('click', validateForm);

function validateForm() {
  event.preventDefault();

  if (messageInput.value == null || messageInput.value == "") {
    errorAlert.style.display = "block";
    messageInput.setAttribute("aria-invalid", "true");
    messageInput.focus();
  } else {
    messageInput.setAttribute("aria-invalid", "false");
    errorAlert.style.display = "none";
    alert("Your form has been submitted");
  }
}
