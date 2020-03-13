import {toggleTheme} from "../../shared/utils/toggleTheme";

const servermanDarkThemedClasses = ['superhero', 'superhero__blockquote', 'superhero__story',
  'profile', 'profile__entry', 'connections', 'theme-toggle__icon'];

const themeToggle = document.querySelector('.theme-toggle__button');

themeToggle.addEventListener('click', () => {
    toggleTheme('dark', servermanDarkThemedClasses);
});
