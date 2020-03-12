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

const storyDescriptionMessage = `I exist at all computers. To find me just search 'cmd' and I will appear.
It's definitely a magic.
Do you have any errors and don’t know how to fix them?
Don't worry, I am always here to help. No errors can hide from me. I will find all of them and even print them in red.
You can always rely on me. But just don’t ignore the errors and you will have code without bugs.`;

let timerStoryDescription;

window.addEventListener('scroll', function () {
    let messageTop = storyDescription.getBoundingClientRect().top;

    if (timerStoryDescription) {
        return;
    }

    if (messageTop <=350) {
        timerStoryDescription = setInterval(() =>
            printText(storyDescriptionMessage, storyDescription, timerStoryDescription), 80);
    }
});