let messageCount = 0;
export function printText(message, messageWrapper, timer) {
    messageWrapper.innerHTML = message.substring(0, messageCount);
    if (messageCount === message.length) {
        clearInterval(timer);
    } else {
        messageCount++;
    }
}