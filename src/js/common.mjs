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

  // Init main slider
  let slider = new Glider(document.querySelector('.glider'), {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: '.dots',
    draggable: true,
    scrollLock: true,
    rewind: true,
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });

  let autoplayDelay = 5000;
  let element = document.querySelector('.glider');

  let autoplay = setInterval(() => {
    slider.scrollItem('next')
  }, autoplayDelay);

  element.addEventListener('mouseover', (event) => {
    if (autoplay != null) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }, 300);

  element.addEventListener('mouseout', (event) => {
    if (autoplay == null) {
      autoplay = setInterval(() => {
        slider.scrollItem('next')
      }, autoplayDelay);
    }
  }, 300);

  // Init small slider
  new Glider(document.querySelector('.glider-sm'), {
    slidesToShow: 1.5,
    slidesToScroll: 1,
    draggable: true,
    scrollLock: true,
    rewind: true,
    arrows: {
      prev: '.toggle__button-left',
      next: '.toggle__button-right'
    },
    responsive: [{
        // screens greater than >= 375px
        breakpoint: 375,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
        }
      },
      {
        // screens greater than >= 576px
        breakpoint: 576,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 3,
        }
      },
      {
        // screens greater than >= 720px
        breakpoint: 720,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 3.5,
        }
      },
      {
        // screens greater than >= 992px
        breakpoint: 992,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 4.1,
        }
      }
    ]
  });
});