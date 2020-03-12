import { printText } from "../../shared/utils/printText";
import {activeLink} from "../../shared/utils/active-link-style";
activeLink();

/*Add new elements*/

const story = document.getElementsByClassName('superhero__story')[0];
story.classList.add('superhero__story-blackWindow');

const storyDescription = document.createElement('p');
storyDescription.classList.add('superhero__story-description');
story.appendChild(storyDescription);

const cursor = document.createElement('div');
cursor.classList.add('superhero__story-cursor');
story.appendChild(cursor);


const superheroImageContainer = document.getElementsByClassName('superhero__image-container')[0];
superheroImageContainer.classList.add('superhero__image-container-blackWidow');



/*Print text*/

const storyDescriptionMessage = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, placeat necessitatibus deserunt in ut cupiditate consequatur magnam alias earum ex sint officia, quae numquam quo! Natus veritatis repellendus fuga animi iure vel in eum, dolorem fugit aliquid error voluptatibus tempore sed reiciendis dignissimos numquam nostrum sint repellat cupiditate. Expedita eaque.";
let timerStoryDescription;


window.addEventListener('scroll', function () {
    let messageTop = storyDescription.getBoundingClientRect().top;

    if (timerStoryDescription) {
        return;
    }

    if (messageTop <=300) {
        timerStoryDescription = setInterval(() => printText(storyDescriptionMessage, storyDescription, timerStoryDescription), 80);
    }
});