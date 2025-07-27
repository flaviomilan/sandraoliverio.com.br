export function setupLazyLoading() {
  // Função para verificar se a imagem está no campo de visão
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
    );
  }

  // Função para carregar a imagem quando ela entrar no campo de visão
  function loadImage(image) {
    if (image.dataset.src) {
      image.src = image.dataset.src;
      image.removeAttribute('data-src');
    }
    if (image.dataset.srcset) {
      image.srcset = image.dataset.srcset;
      image.removeAttribute('data-srcset');
    }
    if (image.dataset.backgroundImage) {
      image.style.backgroundImage = `url('${image.dataset.backgroundImage}')`;
      image.removeAttribute('data-background-image');
    }
  }

  // Processa todas as imagens com atributo data-src
  function processLazyImages() {
    const lazyImages = document.querySelectorAll('img[data-src], div[data-background-image]');

    lazyImages.forEach(image => {
      if (isInViewport(image)) {
        loadImage(image);
      }
    });
  }

  // Usar IntersectionObserver quando disponível (browsers modernos)
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          lazyImageObserver.unobserve(entry.target);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src], div[data-background-image]');
    lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
    });
  } else {
    // Fallback para browsers antigos
    document.addEventListener('scroll', processLazyImages);
    window.addEventListener('resize', processLazyImages);
    window.addEventListener('orientationchange', processLazyImages);

    // Processar inicialmente
    processLazyImages();
  }
}

// Exportar função principal
export default setupLazyLoading;
