export function setupLazyLoading() {
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

  // Função otimizada para verificar viewport (sem getBoundingClientRect)
  function isInViewportOptimized(element) {
    const rect = element.getBoundingClientRect();
    const threshold = 100; // 100px margin for preloading
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) + threshold && 
      rect.bottom >= -threshold
    );
  }

  // Usar IntersectionObserver quando disponível (browsers modernos) - preferencial
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          lazyImageObserver.unobserve(entry.target);
        }
      });
    }, {
      // Reduce forced reflows by adding margin for early loading
      rootMargin: '100px'
    });

    const lazyImages = document.querySelectorAll('img[data-src], div[data-background-image]');
    lazyImages.forEach(image => {
      lazyImageObserver.observe(image);
    });
  } else {
    // Minimal fallback - only use requestAnimationFrame to batch DOM reads
    let ticking = false;
    
    function processLazyImages() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const lazyImages = document.querySelectorAll('img[data-src], div[data-background-image]');
          lazyImages.forEach(image => {
            if (isInViewportOptimized(image)) {
              loadImage(image);
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    }

    // Throttled event listeners
    document.addEventListener('scroll', processLazyImages, { passive: true });
    window.addEventListener('resize', processLazyImages, { passive: true });
    window.addEventListener('orientationchange', processLazyImages, { passive: true });

    // Process initially
    processLazyImages();
  }
}

// Exportar função principal
export default setupLazyLoading;
