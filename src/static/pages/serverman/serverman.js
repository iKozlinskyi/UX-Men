import {toggleTheme} from "../../shared/utils/toggleTheme";
const servermanNightPhoto = require('../../images/heroes/serverman-night-photo.png');
const servermanDayPhoto = require('../../images/heroes/serverman-hp.png');

const servermanDarkThemedClasses = ['superhero', 'superhero__blockquote', 'superhero__story',
  'profile', 'profile__entry', 'connections', 'theme-toggle__icon', 'introduction'];

const themeToggle = document.querySelector('.theme-toggle__button');

let isNightMode = false, imageToSet;

themeToggle.addEventListener('click', () => {
    toggleTheme('dark', servermanDarkThemedClasses);
    imageToSet = isNightMode ? servermanDayPhoto : servermanNightPhoto;
    isNightMode = !isNightMode;

    //Change image
    const image = document.querySelector('.superhero__image');
    image.setAttribute('src', imageToSet);

});

