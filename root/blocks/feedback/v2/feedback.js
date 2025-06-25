(function() {
  const heroSection = document.querySelector('.feedback-v2');
  if (!heroSection) return;

  const parallaxBg = heroSection.querySelector('.feedback-parallax-bg');
  const parallaxElements = heroSection.querySelectorAll('[data-parallax]');

  function updateParallax() {
    const scrollY = window.scrollY;
    const sectionTop = heroSection.offsetTop;
    const sectionScroll = scrollY - sectionTop;

    if (parallaxBg) {
      parallaxBg.style.transform = `translateY(${sectionScroll * 0.3}px)`;
    }

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax);
      el.style.transform = `translateY(${sectionScroll * speed}px)`;
    });
  }

  window.addEventListener('scroll', updateParallax);
  updateParallax();
})();