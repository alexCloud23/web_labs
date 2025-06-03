const images = new Map([
  ["space1", "../resources/space 1.jpg"],
  ["space2", "../resources/space 2.jpg"],
  ["space3", "../resources/space 3.jpg"],
  ["space4", "../resources/space 4.jpg"],
  ["space5", "../resources/space 5.jpg"],
  ["space6", "../resources/space 6.jpg"],
  ["space7", "../resources/space 7.jpg"],
  ["space8", "../resources/space 8.jpg"],
  ["space9", "../resources/space 9.jpg"],
  ["space10", "../resources/space 10.webp"],
]);

let interval = 2000; 
let count = 3; 
let current = 0;
let timer = null;
let isRunning = false;
let selectedImages = [];

const slideImage = document.getElementById('slide-image');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const intervalInput = document.getElementById('interval-input');
const countInput = document.getElementById('count-input');
const endMessage = document.getElementById('end-message');

function updateSelectedImages() {
  const allImages = Array.from(images.values());
  const set = new Set();
  while (set.size < Math.min(count, allImages.length)) {
    const idx = Math.floor(Math.random() * allImages.length);
    set.add(allImages[idx]);
  }
  selectedImages = Array.from(set);
}

function showImage(idx) {
  slideImage.style.opacity = 0;
  setTimeout(() => {
    slideImage.src = selectedImages[idx];
    slideImage.style.opacity = 1;
  }, 300);
}

function startSlider() {
  if (isRunning) return;
  isRunning = true;
  endMessage.classList.remove('visible');
  current = 0;
  updateSelectedImages();
  showImage(current);
  timer = setInterval(() => {
    current++;
    if (current >= selectedImages.length) {
      stopSlider();
      showEndMessage();
      return;
    }
    showImage(current);
  }, interval);
}

function stopSlider() {
  isRunning = false;
  if (timer) clearInterval(timer);
}

function showEndMessage() {
  endMessage.classList.add('visible');
}

startBtn.addEventListener('click', () => {
  stopSlider();
  startSlider();
});

stopBtn.addEventListener('click', () => {
  stopSlider();
});

intervalInput.addEventListener('change', (e) => {
  let val = parseInt(e.target.value, 10);
  if (isNaN(val) || val < 1) val = 1;
  interval = val * 1000;
});

countInput.addEventListener('change', (e) => {
  let val = parseInt(e.target.value, 10);
  if (isNaN(val) || val < 1) val = 1;
  count = val;
});

endMessage.addEventListener('click', () => {
  endMessage.classList.remove('visible');
});

updateSelectedImages();
showImage(0); 