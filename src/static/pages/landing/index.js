/*Timer*/

export let timer = setInterval(function () {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    let countDown = new Date('June 01, 2020 00:00:00').getTime();

    let now = new Date().getTime();
    let distance = countDown - now;

    document.getElementById('days').innerText = Math.floor(distance / (day));
    document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour));
    document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute));
    document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);


    if (distance < 0) {
        clearInterval(timer);
        const promoWrapper = document.getElementsByClassName('deadline')[0];
        document.body.removeChild(promoWrapper);
    }
}, 1000);




/*Print text*/
let messageCount = 0;

const deadlineTitleMessage = "Will they make it in time?";
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



window.addEventListener('scroll', function () {
    let messageTop = deadlineTitle.getBoundingClientRect().top;
    if (messageTop >= 240 && messageTop <= 260) {
        timerDeadlineTitle = setInterval("printText(deadlineTitleMessage, deadlineTitle, timerDeadlineTitle)", 150);
    }
});
