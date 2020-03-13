export const toggleTheme = (themeName, classNames) => {
    const transitionTime = 300;

    classNames.forEach(className => {
        let elementsWithClassName = [...document.getElementsByClassName(className)];
        elementsWithClassName.forEach((element) => {
            element.style.transition = `background-color ${transitionTime / 1000}s ease-out`;
            element.classList.toggle(className + '--' + themeName);
            setTimeout(() => { element.style.transition = ''; }, transitionTime)
        })
    })
};
