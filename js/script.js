// =========================================================
// Lingua Studio — интерактивность сайта
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------
  // Мобильное меню: открываем и закрываем по нажатию.
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // Карточка языка заполняет соответствующее поле в форме.
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // Hero: фразы в заголовке меняются каждые 3 секунды.
  // ---------------------------------------------------------
  const rotator = document.querySelector("#rotator-text");
  if (rotator) {
    const phrases = [
      "свобода в путешествиях",
      "живое общение без барьеров",
      "карьера в международных компаниях",
      "уверенность в любой стране"
    ];
    const FADE_MS = 450;   // должно совпадать с transition в CSS (.rotator-text)
    const PERIOD_MS = 3000;
    let index = 0;

    const nextPhrase = () => {
      rotator.classList.add("is-out");                 // плавно уходит вверх
      setTimeout(() => {
        index = (index + 1) % phrases.length;
        rotator.textContent = phrases[index];
        rotator.classList.remove("is-out");
        rotator.classList.add("is-pre");               // ставим под строку без анимации
        void rotator.offsetWidth;                      // принудительный reflow
        rotator.classList.remove("is-pre");            // и плавно выезжаем на место
      }, FADE_MS);
    };

    setInterval(() => {
      if (!document.hidden) nextPhrase();              // не крутим в фоновой вкладке
    }, PERIOD_MS);
  }

  // ---------------------------------------------------------
  // Плавный выезд блоков при прокрутке (Intersection Observer).
  // [селектор, направление выезда]
  // ---------------------------------------------------------
  const revealTargets = [
    [".hero-copy", "left"],
    [".hero-visual", "right"],
    [".section-heading"],
    [".language-card"],
    [".about-image-wrap", "left"],
    [".about-copy", "right"],
    [".stats-row > div"],
    [".method-card"],
    [".price-card"],
    [".form-panel"],
    [".review-card"],
    [".centered-note"],
    [".cta-inner"]
  ];

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        observer.unobserve(el);
        el.classList.add("is-visible");

        // После анимации снимаем служебные классы и задержку,
        // чтобы они не мешали hover-эффектам карточек и кнопок.
        const delay = parseFloat(el.style.getPropertyValue("--d")) || 0;
        setTimeout(() => {
          el.classList.remove("reveal", "is-visible", "from-left", "from-right");
          el.style.removeProperty("--d");
        }, (0.8 + delay) * 1000 + 100);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

    revealTargets.forEach(([selector, direction]) => {
      document.querySelectorAll(selector).forEach(el => {
        // Ступенчатая задержка для соседних элементов (карточки выезжают по очереди).
        const siblings = [...el.parentElement.children].filter(child => child.matches(selector));
        const order = siblings.indexOf(el);
        el.style.setProperty("--d", `${Math.min(order, 5) * 0.1}s`);

        el.classList.add("reveal");
        if (direction) el.classList.add(`from-${direction}`);
        observer.observe(el);
      });
    });
  }

  // ---------------------------------------------------------
  // Актуальный год в подвале.
  // ---------------------------------------------------------
  document.querySelector("#year").textContent = new Date().getFullYear();
});
