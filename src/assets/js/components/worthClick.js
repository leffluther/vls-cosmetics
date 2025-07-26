document.querySelectorAll('.worth__button').forEach(btn => {
  btn.addEventListener('click', function() {
    const slide = this.closest('.worth__slide');
    const dots = slide.querySelector('.dots');
    const more = slide.querySelector('.more');

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      this.textContent = "Подробнее";
      more.style.display = "none";
    } else {
      dots.style.display = "none";
      this.textContent = "Скрыть";
      more.style.display = "inline";
    }
  });
});
