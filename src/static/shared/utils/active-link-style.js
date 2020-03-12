export function activeLink() {

    /*navLink*/
    const navItem = document.getElementsByClassName('nav__item');
    const navLink = document.getElementsByClassName('nav__link');
    let isActiveLink = false;

    for (let i = 0; i < navLink.length; i++) {
        if (window.location.pathname === navLink[i].getAttribute('href')) {
            navItem[i].classList.add('nav__item-active');
            isActiveLink = true;
        }
    }

    if (!isActiveLink) {
        navItem[2].classList.add('nav__item-active');
    }

    /*navLinkDropdown*/
    const navLinkDropdown = document.getElementsByClassName('nav-dropdown__link');
    for (let i = 0; i<navLinkDropdown.length; i++) {
        if (window.location.pathname === navLinkDropdown[i].getAttribute('href')) {
            navLinkDropdown[i].style.color = '#6cd1eb';
        }
    }
}