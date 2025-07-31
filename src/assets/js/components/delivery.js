document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const selectedOption = document.querySelector('.selected-option');

  toggleButton.addEventListener('click', function() {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
  });

  // Обработка выбора опции
  dropdownMenu.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', function() {
      selectedOption.textContent = this.textContent;
      toggleButton.setAttribute('aria-expanded', 'false');
      // Здесь можно добавить обработку выбора, например, сохранение значения
    });
  });

  // Закрытие выпадающего списка при клике вне его
  document.addEventListener('click', function(event) {
    if (!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
});