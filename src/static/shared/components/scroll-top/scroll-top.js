export function scrollTop() {
  const buttonScrollTop = document.querySelector('.button-go-top');
  buttonScrollTop.style.display = 'none';

  window.addEventListener('scroll', function () {

    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
      buttonScrollTop.style.display = 'block';
    } else {
      buttonScrollTop.style.display = 'none';
    }
  });

  buttonScrollTop.addEventListener('click', function () {
    scrollToTop(900);
  });


  function scrollToTop(scrollDuration) {

    const scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function(){

        if ( window.scrollY !== 0 ) {
          window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
      },15);
  }
}