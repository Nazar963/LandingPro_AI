// Убедитесь, что элементы существуют в DOM
setTimeout(() => {
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('.hero-nav-links');

  if (!burgerMenu || !navLinks) {
    console.warn('Бургер или меню не найдены в DOM.');
    return;
  }


  // Переключение класса active для показа/скрытия меню
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Закрытие меню при клике на ссылку
  document.querySelectorAll('.hero-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target)) {
      burgerMenu.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}, 0); // Небольшая задержка для гарантии загрузки DOM




// Функция для скрытия/показа навбара при скролле и наведении
function setupNavbarHiding() {
  const navbar = document.querySelector('.hero-navbar');
  let lastScrollY = window.scrollY;
  let isMouseInTopArea = false;
  let hideTimeout;
  const topAreaHeight = 50;
  const scrollThreshold = 100;
  const firstScreenHeight = window.innerHeight; // Высота первого экрана

  // Проверка положения скролла для фона
  function checkScrollForBackground() {
    if (window.scrollY > firstScreenHeight * 0.8) { // 80% высоты первого экрана
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // Показываем/скрываем при скролле
  window.addEventListener('scroll', () => {
    checkScrollForBackground();
    
    if (Math.abs(window.scrollY - lastScrollY) < 5) return;
    
    if (window.scrollY > lastScrollY && window.scrollY > scrollThreshold) {
      if (!isMouseInTopArea) hideNavbar();
    } else {
      showNavbar();
    }
    
    lastScrollY = window.scrollY;
  });

  // Остальной код обработки мыши остается без изменений
  document.addEventListener('mousemove', (e) => {
    if (e.clientY < topAreaHeight) {
      isMouseInTopArea = true;
      showNavbar();
      clearTimeout(hideTimeout);
    } else {
      if (isMouseInTopArea) {
        isMouseInTopArea = false;
        hideTimeout = setTimeout(() => {
          if (!isMouseInTopArea && window.scrollY > scrollThreshold) {
            hideNavbar();
          }
        }, 300);
      }
    }
  });

  function showNavbar() {
    navbar.classList.remove('navbar-hidden');
    navbar.classList.add('navbar-visible');
  }

  function hideNavbar() {
    navbar.classList.remove('navbar-visible');
    navbar.classList.add('navbar-hidden');
  }

  // Инициализация
  checkScrollForBackground();
  if (window.scrollY > scrollThreshold) hideNavbar();
}

document.addEventListener('DOMContentLoaded', setupNavbarHiding);