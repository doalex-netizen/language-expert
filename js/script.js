// =========================================================
// Lingua Studio — интерактивность сайта
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // Мобильное меню: открываем и закрываем по нажатию.
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
  });

  // После выбора раздела на мобильном экране закрываем меню.
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Карточка языка заполняет соответствующее поле в форме.
  const languageSelect = document.querySelector("#language-select");
  document.querySelectorAll(".language-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".language-card").forEach(item => item.classList.remove("selected"));
      card.classList.add("selected");
      languageSelect.value = card.dataset.language;
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Кнопки тарифов подставляют выбранный формат в форму заявки.
  const planSelect = document.querySelector("#plan-select");
  document.querySelectorAll(".choose-plan").forEach(button => {
    button.addEventListener("click", () => {
      planSelect.value = button.dataset.plan;
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Актуальный год в подвале.
  document.querySelector("#year").textContent = new Date().getFullYear();
});