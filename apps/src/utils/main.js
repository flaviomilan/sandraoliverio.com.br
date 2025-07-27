// Inicializando o lazy loading
import { setupLazyLoading } from './lazyLoading.js';

document.addEventListener('DOMContentLoaded', function() {
  // Configurando o lazy loading
  setupLazyLoading();

  // Elementos DOM
  const header = document.querySelector('header');
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-close');
  const body = document.body;

  // Verificar se os elementos existem antes de adicionar listeners
  if (header) {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Esconde/mostra o header em scroll
      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        header.classList.add('header-hidden');
      } else {
        header.classList.remove('header-hidden');
      }
      
      lastScrollY = window.scrollY;
    });
  }

  // Função para alternar o menu mobile
  function toggleMobileMenu() {
    if (mobileMenu && mobileOverlay && body) {
      mobileMenu.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      body.classList.toggle('no-scroll');
    }
  }

  // Adicionar event listeners para ações de menu
  if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', toggleMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

  // Fechar menu ao clicar em links
  const mobileLinks = document.querySelectorAll('.mobile-menu a');
  if (mobileLinks.length > 0 && mobileMenu && mobileOverlay && body) {
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
      });
    });
  }
});
