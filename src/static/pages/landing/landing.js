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
const heroes =  document.querySelector('.pick-side__heroes');
const villains =  document.querySelector('.pick-side__villains');


heroes.addEventListener('mouseover', () => {
    backgroundRoot.style.transform = 'translateX(25%)';
});

villains.addEventListener('mouseover', () => {
    backgroundRoot.style.transform = 'translateX(-25%)';
});

heroes.addEventListener('mouseout', () => {
    backgroundRoot.style.transform = 'translateX(0%)';
});

villains.addEventListener('mouseout', () => {
    backgroundRoot.style.transform = 'translateX(0%)';
});



