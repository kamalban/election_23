function faizan(){
    $(function () {
    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 'auto',
      spaceBetween: 0,
      centeredSlides: true,
      grabCursor: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

    });
  });

  }