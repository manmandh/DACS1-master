
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarSupportedContent");

  navbarToggler.addEventListener("click", () => {
    navbarCollapse.classList.toggle("show");
  });
  function prevSlide() {
    $('#my_slider').carousel('prev');
  }

  function nextSlide() {
    $('#my_slider').carousel('next');
  }
  var myCarousel = document.querySelector('#carouselExampleIndicators');
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 3000 // thời gian chuyển đổi giữa các slide (tính bằng mili giây)
});