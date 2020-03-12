import ParticleNetwork from "../../shared/components/particle-network/particle-network";
import AOS from "aos";
import "aos/dist/aos.css";
import { activeLink } from "../../shared/utils/active-link-style";

AOS.init();
AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 300, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

activeLink();

import { getFraction } from "../../shared/utils/getFraction";
import { decimalToPercent } from "../../shared/utils/decimalToPercent";
import { toggleElementGently } from "../../shared/utils/toggleElementGently";
import {
    heroPickerMessage,
    heroResultMessage,
    villainPickerMessage,
    villainResultMessage
} from "../../shared/globals/constants";
/*Timer*/

export let timer = setInterval(function() {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let countDown = new Date("June 01, 2020 00:00:00").getTime();

  let now = new Date().getTime();
  let distance = countDown - now;

  document.getElementById("days").innerText = Math.floor(distance / day);
  document.getElementById("hours").innerText = Math.floor(
    (distance % day) / hour
  );
  document.getElementById("minutes").innerText = Math.floor(
    (distance % hour) / minute
  );
  document.getElementById("seconds").innerText = Math.floor(
    (distance % minute) / second
  );

  if (distance < 0) {
    clearInterval(timer);
    const deadlineWrapper = document.getElementsByClassName("deadline")[0];
    document.body.removeChild(deadlineWrapper);
  }
}, 1000);

/*Print text*/

let messageCount = 0;

const deadlineTitleMessage = "Will they make it before the deadline?";
const deadlineTitle = document.getElementsByClassName("deadline__title")[0];
let timerDeadlineTitle;

export function printText(message, messageWrapper, timer) {
  messageWrapper.innerHTML = message.substring(0, messageCount);
  if (messageCount === message.length) {
    clearInterval(timer);
  } else {
    messageCount++;
  }
}

window.addEventListener("scroll", function() {
  let messageTop = deadlineTitle.getBoundingClientRect().top;

  if (timerDeadlineTitle) {
    return;
  }

  if (messageTop <= 250) {
    timerDeadlineTitle = setInterval(
      () => printText(deadlineTitleMessage, deadlineTitle, timerDeadlineTitle),
      90
    );
  }
});

/* Go to About page */
const teamPageButton = document.querySelector(".team__button--clicked");

teamPageButton.addEventListener("click", function() {
  window.location.pathname = "/about";
});


window.onload = function() {
  const canvasDiv = document.getElementById("particle_canvas");

  const options = {
    particleColor: "#6cd1eb",
    background: "",
    interactive: true,
    speed: "medium",
    density: "high",
  };

  new ParticleNetwork(canvasDiv, options);
};

// /*Background-gradient animation*/
const backgroundRoot =  document.querySelector('.pick-side__background-root');
const [heroesSection, villainsSection] =  document.querySelectorAll('.pick-side__side');

const moveGradientToHeroes = () => {
    backgroundRoot.style.transform = 'translateX(25%)';
};

const moveGradientToVillains = () => {
    backgroundRoot.style.transform = 'translateX(-25%)';
};

const returnGradient = () => {
    backgroundRoot.style.transform = 'translateX(0%)';
};


heroesSection.addEventListener('mouseover', moveGradientToHeroes);
villainsSection.addEventListener('mouseover', moveGradientToVillains);

heroesSection.addEventListener('mouseout', returnGradient);
villainsSection.addEventListener('mouseout', returnGradient);

//===============
// Poll bar state

const heroesAlliesCount = 143;
const bugmanAlliesCount = 28;
const heroesFraction = getFraction(heroesAlliesCount, bugmanAlliesCount);
const pollBar = document.querySelector('.meter__level');

pollBar.style.width = decimalToPercent(heroesFraction);

const heroesAlliesCounter = document.querySelector('.poll__heroes-allies');
const bugmanAlliesCounter = document.querySelector('.poll__bugman-allies');

heroesAlliesCounter.innerText = heroesAlliesCount;
bugmanAlliesCounter.innerText = bugmanAlliesCount;

//Poll bar toggle

const heroesButton = document.querySelector('.pick-side__side-button--heroes');
const villainsButton = document.querySelector('.pick-side__side-button--villains');
const messageContainer = document.querySelector('.pick-side__message');

const pollBlock = document.querySelector('.poll');

const showMessage = (element, text) => {
    toggleElementGently(element);
    element.innerText = text;
};

let clickedButton;

heroesButton.addEventListener('click', function() {
    clickedButton = this;

    toggleElementGently(form);
    toggleElementGently(villainsButton);
    form.style.zIndex = '20';


    heroesSection.removeEventListener('mouseout', returnGradient);
    villainsSection.removeEventListener('mouseover', moveGradientToVillains);
    villainsSection.removeEventListener('mouseout', returnGradient);

    this.style.left = '100%';
    this.style.bottom = '50%';
    this.style.transform = 'translateX(-50%)';
    this.disabled = true;

    showMessage(messageContainer, heroPickerMessage)
});

villainsButton.addEventListener('click', function() {
    clickedButton = this;

    toggleElementGently(heroesButton);
    toggleElementGently(form);
    form.style.zIndex = '20';

    villainsSection.removeEventListener('mouseout', returnGradient);
    heroesSection.removeEventListener('mouseover', moveGradientToHeroes);
    heroesSection.removeEventListener('mouseout', returnGradient);

    this.style.right = '100%';
    this.style.bottom = '50%';
    this.style.transform = 'translateX(-50%)';
    this.disabled = true;

    showMessage(messageContainer, villainPickerMessage)
});

const okButton = document.querySelector('.pick-side__ok');
const cancelButton = document.querySelector('.pick-side__cancel');
const form = document.querySelector('.pick-side__form');

cancelButton.addEventListener('click', () => {
    toggleElementGently(form);
    form.style.zIndex = '-1';
    clickedButton.setAttribute('style', '');
    toggleElementGently(messageContainer);

    if (clickedButton === heroesButton) {
        toggleElementGently(villainsButton);

        heroesSection.addEventListener('mouseout', returnGradient);
        villainsSection.addEventListener('mouseover', moveGradientToVillains);
        villainsSection.addEventListener('mouseout', returnGradient);

    } else {
        toggleElementGently(heroesButton);

        villainsSection.addEventListener('mouseout', returnGradient);
        heroesSection.addEventListener('mouseover', moveGradientToHeroes);
        heroesSection.addEventListener('mouseout', returnGradient);
    }

    clickedButton.disabled = false;
});

okButton.addEventListener('click', (e) => {
    let message;

    if (clickedButton === heroesButton) {
        message = heroResultMessage;
    } else {
        message = villainResultMessage;
    }

    e.preventDefault();
    toggleElementGently(pollBlock);
    toggleElementGently(form);
    form.style.zIndex = '20';

    messageContainer.innerText = message;
});


