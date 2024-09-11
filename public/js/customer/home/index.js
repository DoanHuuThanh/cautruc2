const sliderTrack = document.getElementById('sliderTrack');
const images = document.querySelectorAll('.slider-image');
let currentIndex = 0;

function showSlide(index) {
  if (index >= images.length) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = images.length - 1;
  } else {
    currentIndex = index;
  }
  const offset = -currentIndex * 100;
  sliderTrack.style.transform = `translateX(${offset}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

// Auto-slide every 5 seconds
setInterval(() => {
  showSlide(currentIndex + 1);
}, 5000);
