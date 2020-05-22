document.addEventListener("DOMContentLoaded", () => {
  // Humburger event
  document.querySelector('.menu__btn').addEventListener('click', (event) => {
    event.currentTarget.classList.toggle('menu__btn_active');
  });

  // Reduse header
  window.addEventListener("scroll", () => {

    if (window.pageYOffset > 120) {
      document.querySelector('.header').classList.add('header_tiny');
    } else {
      document.querySelector('.header').classList.remove('header_tiny');
    }
  });
  window.addEventListener("touchmove", () => {

    if (window.pageYOffset > 120) {
      document.querySelector('.header').classList.add('header_tiny');
    } else {
      document.querySelector('.header').classList.remove('header_tiny');
    }
  });

  /**
   * Glider.js
   * 
   * @see  {@link https://nickpiscitelli.github.io/Glider.js/}
   */

  new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    dots: '.dots',
    draggable: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });

});