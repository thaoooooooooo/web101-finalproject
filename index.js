let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
themeButton.addEventListener("click", toggleDarkMode);

let count = 3; // Initialize signature count

const addSignature = (person) => {
    const newSignature = document.createElement('p');
    newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} (${person.email}) supports this`;
    const signaturesSection = document.querySelector('.signatures'); 
    if (signaturesSection) {
        signaturesSection.appendChild(newSignature);
    } else {
        console.error('Signatures section not found.');
    }

    // Update signature count and display
    count++;
    updateSignatureCount();
}

const updateSignatureCount = () => {
    const oldCounter = document.getElementById('counter');
    if (oldCounter) {
        oldCounter.remove();
    }
    const newCounter = document.createElement('p');
    newCounter.id = 'counter';
    newCounter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;
    const signaturesSection = document.querySelector('.signatures');
    if (signaturesSection) {
        signaturesSection.appendChild(newCounter);
    } else {
        console.error('Signatures section not found.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const signNowButton = document.getElementById('sign-now-button');
    if (signNowButton) {
        signNowButton.removeEventListener('click', addSignature);
        signNowButton.addEventListener('click', validateForm);
    } else {
        console.error('Sign now button not found.');
    }
    updateSignatureCount();
});

const validateForm = () => {
    let containsErrors = false;
    const petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
      name: document.getElementById('nameInput').value,
      hometown: document.getElementById('hometownInput').value,
      email: document.getElementById('emailInput').value
  };
    // Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
      if (petitionInputs[i].value.length < 2) {
          petitionInputs[i].classList.add('error');
          containsErrors = true;
      } else {
          petitionInputs[i].classList.remove('error');
      }
  }
if (!containsErrors) {
        addSignature(person);
        clearForm();
        toggleModal(person);
    }
}
const clearForm = () => {
    const petitionInputs = document.getElementById("sign-petition").elements;
    for (let i = 0; i < petitionInputs.length; i++) {
        petitionInputs[i].value = "";
    }
}
let scaleFactor = 1;
const modalImage = document.getElementById('modal-image');
function scaleImage() {
  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }
  modalImage.style.transform = `scale(${scaleFactor})`;
}

const toggleModal = (person) => {
    const modal = document.getElementById('thanks-modal');
    const modalContent = document.getElementById('thanks-modal-content');
    modal.style.display = 'flex';
  modalContent.textContent = `Thank you, ${person.name}, for signing the petition!`;
  const intervalId = setInterval(scaleImage, 500);
    setTimeout(() => {
        modal.style.display = 'none';
    }, 4000); 
}


let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

function reveal() {
    for (let i = 0; i < revealableContainers.length; i++) {
      let windowHeight = window.innerHeight;
      let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
      if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
         revealableContainers[i].classList.add('active');
      } else {
          revealableContainers[i].classList.remove('active');

    }
}
}
  window.addEventListener('scroll', reveal);

