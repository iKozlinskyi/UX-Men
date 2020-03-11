/*Add new elements*/

const story = document.getElementsByClassName('superhero__story')[0];
story.classList.add('superhero__story-blackWindow');

const storyDescription = document.createElement('p');
storyDescription.classList.add('superhero__story-description');
story.appendChild(storyDescription);

const cursor = document.createElement('div');
cursor.classList.add('superhero__story-cursor');
story.appendChild(cursor);





/*Print text*/

let messageCount = 0;

const storyDescriptionMessage = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, placeat necessitatibus deserunt in ut cupiditate consequatur magnam alias earum ex sint officia, quae numquam quo! Natus veritatis repellendus fuga animi iure vel in eum, dolorem fugit aliquid error voluptatibus tempore sed reiciendis dignissimos numquam nostrum sint repellat cupiditate. Expedita eaque.";
let timerStoryDescription;


function printText(message, messageWrapper, timer) {
    messageWrapper.innerHTML = message.substring(0, messageCount);
    if (messageCount === message.length) {
        clearInterval(timer);
    } else {
        messageCount++;
    }
}


window.addEventListener('scroll', function () {
    let messageTop = storyDescription.getBoundingClientRect().top;
    if (messageTop <=250) {
        timerStoryDescription = setInterval(() => printText(storyDescriptionMessage, storyDescription, timerStoryDescription), 250);
    }
});
