// HEADER BTN
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Smooth scrolling
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  const href = link.getAttribute("href");

  // Jeśli to link wewnętrzny, dodaj scroll i blokuj domyślne
  if (href && href.startsWith("#")) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll back to top
      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll do sekcji
      else {
        const sectionEl = document.querySelector(href);
        const yOffset = -160;
        const y =
          sectionEl.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }

      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    });
  }
});

// CAROUSEL
const partners = document.querySelectorAll(".partner");
let currentIndex = 0;

function showNextpartner() {
  // Usuń klasę active z wszystkich
  partners.forEach((el) => el.classList.remove("active"));

  // Dodaj do aktualnego
  partners[currentIndex].classList.add("active");

  // Zwiększ indeks
  currentIndex = (currentIndex + 1) % partners.length;
}

// Start od pierwszego
showNextpartner();

// Zmieniaj co 3 sekundy
setInterval(showNextpartner, 3000);

//TEXTAREA

const textarea = document.querySelector(".message");

const now = new Date();

const future = new Date(now);
future.setFullYear(future.getFullYear() + 1);
future.setMonth(future.getMonth() + 1);

if (future.getMonth() > 11) {
  future.setMonth(future.getMonth() - 12);
  future.setFullYear(future.getFullYear() + 1);
}

const dayStart = 27;
const dayEnd = 28;

const monthName = future.toLocaleString("pl-PL", { month: "long" });
const year = future.getFullYear();

const dateStr = `${dayStart}-${dayEnd} ${monthName} ${year} r.`;

textarea.placeholder = `Dzień dobry, chciałabym zapytać o dostępność nalewaków w terminie ${dateStr}`;

// FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// STICKY NAV
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    } else {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

let hasPlayed = false;
let userScrolledDown = false;

const heroBtn = document.querySelector(".hero-btn");
const preSection = document.querySelector(".section-pre");
const preTextContainer = document.getElementById("preText");
const progressBar = document.getElementById("progressBar");
const sectionAbout = document.querySelector(".section-about");

function showText() {
  preTextContainer.classList.add("visible");
}

function triggerAnimation() {
  if (hasPlayed) return;
  hasPlayed = true;

  showText(); // pokazuje tekst płynnie
  progressBar.style.width = "100%"; // startuje progress bar

  setTimeout(() => {
    if (!userScrolledDown) {
      const yOffset = -160; // 10rem = 160px
      const y =
        sectionAbout.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, 11000);
}

// Kliknięcie przycisku
heroBtn.addEventListener("click", () => {
  preSection.scrollIntoView({ behavior: "smooth" });
  setTimeout(triggerAnimation, 1000); // po scrollu
});

// Scroll detection (Intersection Observer)
const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      triggerAnimation();
    }
  },
  { threshold: 0.6 } // >60% widoczności
);

observer.observe(preSection);

// Wykrycie samodzielnego scrolla przez użytkownika
const aboutObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      userScrolledDown = true;
    }
  },
  {
    threshold: 0.3,
  }
);

aboutObserver.observe(sectionAbout);

const aboutTitle = document.querySelector(".about-title");
const aboutBox = document.querySelector(".about-box");

const animateAboutSection = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;

    // Pokaż tytuł
    aboutTitle.classList.add("visible");

    // Po 1s pokaż resztę
    setTimeout(() => {
      aboutBox.classList.add("visible");
    }, 1000);

    observer.unobserve(entry.target);
  },
  {
    threshold: 0.4,
  }
);

animateAboutSection.observe(sectionAbout);

function animateChildrenSequentially(containerSelector, childSelector) {
  const container = document.querySelector(containerSelector);
  const children = container.querySelectorAll(childSelector);

  children.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 300); // opóźnienie np. 0.3s między elementami
  });
}

// Profits
const profitsObserver = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      animateChildrenSequentially(".profit-box", ".profit");
      observer.unobserve(entry.target);
    }
  },
  { threshold: 0.3 }
);

profitsObserver.observe(document.querySelector(".section-profits"));

// Bundles
const bundlesObserver = new IntersectionObserver(
  (entries, observer) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      animateChildrenSequentially(".bundles-box", ".bundle");
      observer.unobserve(entry.target);
    }
  },
  { threshold: 0.3 }
);

bundlesObserver.observe(document.querySelector(".section-bundles"));

// Lazy loading - pomijamy section-pre i section-about
const lazySections = document.querySelectorAll(".lazy-section");

const lazyObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

lazySections.forEach((section) => {
  lazyObserver.observe(section);
});

// MODAL

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
