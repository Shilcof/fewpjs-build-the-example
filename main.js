// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const errorModal = document.querySelector('#modal');
const errorMessage = document.querySelector('#modal-message');

function hideError() {
  errorModal.classList.add("hidden");
};

// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
document.addEventListener('DOMContentLoaded', hideError());

// When a user clicks on an empty heart ("Recognizing events")
const hearts = document.querySelectorAll(".like-glyph");

// Invoke mimicServerCall to simulate making a server request
function updateLikeStatus() {
  mimicServerCall()
    .then((responce) => {
      updateHeart(this)
    })
    .catch((error) => {
      handleError(error);
    })
}

// When the server returns a failure status
// Display the error modal by removing the .hidden class
// Display the server error message in the modal
function handleError(message) {
  errorModal.classList.remove("hidden");
  errorMessage.innerText = message;
  removeError();
}

// Use setTimeout to hide the modal after 5 seconds (add the .hidden class)
function removeError() {
  let timer = setTimeout(function() {
    errorModal.classList.add("hidden");
    errorMessage.innerText = "";
  }, 5e3);
}

function updateHeart(heart) {
  if (heart.innerText === FULL_HEART) {
    heart.innerText = EMPTY_HEART;
    heart.classList.remove("activated-heart");
  } else {
    heart.innerText = FULL_HEART;
    heart.classList.add("activated-heart");
  }
}

hearts.forEach(
  heart => heart.addEventListener("click", updateLikeStatus)
);

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
