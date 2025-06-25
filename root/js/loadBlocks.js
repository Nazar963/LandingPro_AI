function loadBlock(blockId, variantPath) {
  const container = document.getElementById(`${blockId}-container`);

  if (!container) {
    console.warn(`Контейнер для блока "${blockId}" не найден.`);
    return;
  }

  // Загружаем HTML
  fetch(`${variantPath}/${blockId}.html`)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;

      // Подключаем CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = `${variantPath}/${blockId}.css`;
      document.head.appendChild(link);

      // Подключаем JS (необязательно)
      const scriptPath = `${variantPath}/${blockId}.js`;
      
      fetch(scriptPath).then(res => {
        if (res.ok) {
          const script = document.createElement('script');
          script.src = scriptPath;
          script.defer = true;
          document.body.appendChild(script);
        }
      });
    })
    .catch(err => {
      console.error(`Ошибка при загрузке блока "${blockId}" из "${variantPath}":`, err);
    });
}
