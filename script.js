 document.addEventListener("DOMContentLoaded", () => {

  /* ========================
     DARK MODE TOGGLE
  ======================== */
  const modeToggle = document.getElementById("mode-toggle");
  const body = document.body;

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    if (modeToggle) modeToggle.textContent = "☀️";
  } else {
    if (modeToggle) modeToggle.textContent = "🌙";
  }

  modeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    modeToggle.textContent = isDark ? "☀️" : "🌙";
  });

  /* ========================
     MOBILE NAV TOGGLE
  ======================== */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  navToggle?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* ========================
     FAQ TOGGLE (CLICK ONLY)
  ======================== */
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      q.classList.toggle("active");
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });
  });

  /* ========================
     HERO SLIDE ANIMATION
  ======================== */
  const hero = document.getElementById("heroSlide");
  const titleEl = hero?.querySelector(".slide-title");
  const textEl = hero?.querySelector(".slide-text");

  if (hero && titleEl && textEl) {
    const slides = [
      {
        bg: "#007bff",
        title: "One Brand. Complete Tech Solutions.",
        text: "Expert phone & laptop repairs, professional website development, and trusted device sales — all in one place."
      },
      {
        bg: "#28a745",
        title: "Fast Phone Repairs",
        text: "Screen replacement, battery issues, charging ports, and software fixes — done professionally."
      },
      {
        bg: "#6f42c1",
        title: "Laptop Repair Experts",
        text: "Hardware and software troubleshooting for all laptop brands."
      },
      {
        bg: "#fd7e14",
        title: "Phones & Laptops for Sale",
        text: "Quality brand-new and fairly-used devices, tested and guaranteed."
      },
      {
        bg: "#17a2b8",
        title: "Trusted & Certified Engineers",
        text: "Professional tools, genuine parts, and customer satisfaction."
      }
    ];

    let index = 0;

    setInterval(() => {
      hero.style.opacity = "0";
      setTimeout(() => {
        hero.style.background = slides[index].bg;
        titleEl.textContent = slides[index].title;
        textEl.textContent = slides[index].text;
        hero.style.opacity = "1";
        index = (index + 1) % slides.length;
      }, 800);
    }, 9000);
  }

  /* ========================
     BEFORE / AFTER SLIDER (HORIZONTAL)
  ======================== */
  const slider = document.querySelector(".slider-wrapper");

  if (slider) {
    const afterLayer = slider.querySelector(".after-layer");
    const handle = slider.querySelector(".handle");
    const divider = slider.querySelector(".divider-line");
    let dragging = false;

    function moveSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let pos = clientX - rect.left;
      pos = Math.max(0, Math.min(pos, rect.width));
      const percent = (pos / rect.width) * 100;

      afterLayer.style.width = percent + "%";
      handle.style.left = percent + "%";
      divider.style.left = percent + "%";
    }

    slider.addEventListener("mousedown", e => {
      dragging = true;
      moveSlider(e.clientX);
    });

    window.addEventListener("mousemove", e => {
      if (dragging) moveSlider(e.clientX);
    });

    window.addEventListener("mouseup", () => dragging = false);

    slider.addEventListener("touchstart", e => {
      dragging = true;
      moveSlider(e.touches[0].clientX);
    });

    slider.addEventListener("touchmove", e => {
      if (dragging) moveSlider(e.touches[0].clientX);
    });

    slider.addEventListener("touchend", () => dragging = false);
  }

/* ========================
     WHATSAPP CONTACT FORM
  ======================== */
  const contactForm = document.getElementById("contactForm");

  contactForm?.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const message = document.getElementById("message")?.value || "";

    const text = `Hello, my name is ${name}. Phone: ${phone}. Message: ${message}`;
    window.open(
      `https://wa.me/2347040363679 ?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  });

});

 

document.addEventListener("DOMContentLoaded", function() {
  fetch('slide.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('slider-container').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading slider:', error);
    });
});
