const menuButton = document.getElementById('mobile-menu');
const mobileMenu = document.getElementById('mobileMenu');

menuButton?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');

  const isOpen = mobileMenu.classList.contains('open');
  menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

/* ================================
   SLIDERS DOS CHALÉS E FEEDBACKS
   ================================ */

function setupSlider(sliderElement) {
  const images = Array.from(sliderElement.querySelectorAll('.img-chales img'));
  const prevButton = sliderElement.querySelector('.prev');
  const nextButton = sliderElement.querySelector('.next');

  if (images.length === 0) return;

  let currentIndex = images.findIndex((img) => img.classList.contains('active'));

  if (currentIndex < 0) {
    currentIndex = 0;
    images[0].classList.add('active');
  }

  function showImage(index) {
    images.forEach((img) => img.classList.remove('active'));
    images[index].classList.add('active');
  }

  function nextImage() {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
  }

  nextButton?.addEventListener('click', nextImage);
  prevButton?.addEventListener('click', prevImage);
}

document.querySelectorAll('[data-slider]').forEach(setupSlider);

/* ================================
   MODAL DA GALERIA COMPLETA
   ================================ */

const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('verMaisBtn');
const closeModalButton = document.querySelector('.close');

function clearTextSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  }
}

function openModal() {
  if (!modal) return;

  clearTextSelection();

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');

  if (!fullscreenModal?.classList.contains('show')) {
    document.body.style.overflow = '';
  }
}

openModalButton?.addEventListener('click', openModal);
closeModalButton?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

/* ================================
   MODAL CARROSSEL FULLSCREEN
   ================================ */

const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImage = document.getElementById('fullscreenImg');
const closeFullscreenButton = document.querySelector('.close-fullscreen');
const fullscreenPrevButton = document.querySelector('.fullscreen-prev');
const fullscreenNextButton = document.querySelector('.fullscreen-next');

let currentImageGroup = [];
let currentFullscreenIndex = 0;

function updateFullscreenImage() {
  if (!fullscreenImage || currentImageGroup.length === 0) return;

  const currentImage = currentImageGroup[currentFullscreenIndex];

  fullscreenImage.src = currentImage.src;
  fullscreenImage.alt = currentImage.alt || 'Imagem ampliada dos Chalés do Kevin';
  fullscreenImage.setAttribute('draggable', 'false');
}

function openFullscreenCarousel(images, startIndex = 0) {
  if (!fullscreenModal || !fullscreenImage || images.length === 0) return;

  clearTextSelection();

  currentImageGroup = images;
  currentFullscreenIndex = startIndex;

  updateFullscreenImage();

  fullscreenModal.classList.add('show');
  fullscreenModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
  if (!fullscreenModal || !fullscreenImage) return;

  fullscreenModal.classList.remove('show');
  fullscreenModal.setAttribute('aria-hidden', 'true');
  fullscreenImage.src = '';

  currentImageGroup = [];
  currentFullscreenIndex = 0;

  if (!modal?.classList.contains('show')) {
    document.body.style.overflow = '';
  }
}

function showNextFullscreenImage() {
  if (currentImageGroup.length === 0) return;

  currentFullscreenIndex =
    currentFullscreenIndex === currentImageGroup.length - 1
      ? 0
      : currentFullscreenIndex + 1;

  updateFullscreenImage();
}

function showPrevFullscreenImage() {
  if (currentImageGroup.length === 0) return;

  currentFullscreenIndex =
    currentFullscreenIndex === 0
      ? currentImageGroup.length - 1
      : currentFullscreenIndex - 1;

  updateFullscreenImage();
}

closeFullscreenButton?.addEventListener('click', closeFullscreen);
fullscreenNextButton?.addEventListener('click', showNextFullscreenImage);
fullscreenPrevButton?.addEventListener('click', showPrevFullscreenImage);

fullscreenModal?.addEventListener('click', (event) => {
  if (event.target === fullscreenModal) {
    closeFullscreen();
  }
});

/* ================================
   FUNÇÃO PARA TRANSFORMAR IMAGENS EM MODAL/CARROSSEL
   ================================ */

function prepareImageGroup(selector) {
  const images = Array.from(document.querySelectorAll(selector));

  images.forEach((image, index) => {
    image.setAttribute('draggable', 'false');

    image.addEventListener('mousedown', (event) => {
      event.preventDefault();
      clearTextSelection();
    });

    image.addEventListener('touchstart', () => {
      clearTextSelection();
    }, { passive: true });

    image.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });

    image.addEventListener('click', (event) => {
      event.preventDefault();
      clearTextSelection();
      openFullscreenCarousel(images, index);
    });
  });
}

/*
  As 4 imagens principais da galeria inicial.
  Ao abrir uma delas, as setas passam entre essas 4 imagens.
*/
prepareImageGroup('.gallery-grid img');

/*
  Imagens da galeria completa.
  Ao abrir uma delas, as setas passam entre todas as imagens do modal.
*/
prepareImageGroup('.modal-content .imgmodal');

/*
  Imagens do Chalé A.
*/
prepareImageGroup('#acomodacoes .accommodation-card:nth-of-type(1) .img-chales img');

/*
  Imagens do Chalé B.
*/
prepareImageGroup('#acomodacoes .accommodation-card:nth-of-type(2) .img-chales img');

/*
  Imagens do Chalé C.
*/
prepareImageGroup('#acomodacoes .accommodation-card:nth-of-type(3) .img-chales img');

/*
  Feedbacks também ficam navegáveis em tela cheia.
  Se não quiser isso, pode apagar essa linha.
*/
prepareImageGroup('.feedback-images img');

/* ================================
   TECLADO
   ================================ */

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeFullscreen();
    closeModal();
  }

  if (fullscreenModal?.classList.contains('show')) {
    if (event.key === 'ArrowRight') {
      showNextFullscreenImage();
    }

    if (event.key === 'ArrowLeft') {
      showPrevFullscreenImage();
    }
  }
});

/* ================================
   SWIPE NO CELULAR
   ================================ */

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

function handleGalleryTouchStart(event) {
  const touch = event.changedTouches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function handleGalleryTouchEnd(event) {
  const touch = event.changedTouches[0];
  touchEndX = touch.clientX;
  touchEndY = touch.clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;

  /*
    Só troca a imagem se o gesto for realmente horizontal.
    Isso evita trocar foto quando o usuário mexe o dedo um pouco na vertical.
  */
  if (Math.abs(deltaX) < 40) return;
  if (Math.abs(deltaX) < Math.abs(deltaY)) return;

  if (deltaX < 0) {
    showNextFullscreenImage();
  } else {
    showPrevFullscreenImage();
  }
}

/*
  Aplicamos tanto no modal quanto na própria imagem,
  para o gesto funcionar melhor em qualquer área tocada.
*/
[fullscreenModal, fullscreenImage].forEach((element) => {
  element?.addEventListener('touchstart', handleGalleryTouchStart, { passive: true });
  element?.addEventListener('touchend', handleGalleryTouchEnd, { passive: true });
});