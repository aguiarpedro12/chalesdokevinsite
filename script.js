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

const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('verMaisBtn');
const closeModalButton = document.querySelector('.close');

const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImage = document.getElementById('fullscreenImg');
const closeFullscreenButton = document.querySelector('.close-fullscreen');

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
}

function closeModal() {
  if (!modal) return;

  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');

  if (!fullscreenModal?.classList.contains('show')) {
    document.body.style.overflow = '';
  }
}

function openFullscreenImage(imageSrc, imageAlt) {
  if (!fullscreenModal || !fullscreenImage) return;

  clearTextSelection();

  fullscreenImage.src = imageSrc;
  fullscreenImage.alt = imageAlt || 'Imagem ampliada dos Chalés do Kevin';
  fullscreenImage.setAttribute('draggable', 'false');

  fullscreenModal.classList.add('show');
  fullscreenModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeFullscreen() {
  if (!fullscreenModal || !fullscreenImage) return;

  fullscreenModal.classList.remove('show');
  fullscreenModal.setAttribute('aria-hidden', 'true');
  fullscreenImage.src = '';

  if (!modal?.classList.contains('show')) {
    document.body.style.overflow = '';
  }
}

openModalButton?.addEventListener('click', openModal);
closeModalButton?.addEventListener('click', closeModal);
closeFullscreenButton?.addEventListener('click', closeFullscreen);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

fullscreenModal?.addEventListener('click', (event) => {
  if (event.target === fullscreenModal) {
    closeFullscreen();
  }
});

function makeImageClickableWithoutSelection(selector) {
  document.querySelectorAll(selector).forEach((image) => {
    image.setAttribute('draggable', 'false');

    image.addEventListener('mousedown', (event) => {
      event.preventDefault();
      clearTextSelection();
    });

    image.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });

    image.addEventListener('click', (event) => {
      event.preventDefault();
      clearTextSelection();
      openFullscreenImage(image.src, image.alt);
    });
  });
}

/*
  Imagens da galeria completa.
*/
makeImageClickableWithoutSelection('.imgmodal');

/*
  As 4 imagens principais da galeria inicial também abrem em tela cheia.
*/
makeImageClickableWithoutSelection('.gallery-grid img');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeFullscreen();
    closeModal();
  }
});