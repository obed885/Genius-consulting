// =========================================
// TAILWIND CONFIGURATION
// =========================================
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          mendo: {
            gold: '#C29B53',
            'gold-dark': '#A37D35',
            'gold-light': '#D8B87A',
            'gold-subtle': '#F4EDE0',
            cream: '#FAF7F2',
            'cream-light': '#FDFBF7',
            sand: '#EFE7DA',
            charcoal: '#1A1817',
            muted: '#66605A'
          }
        },
        fontFamily: {
          serif: ['"Playfair Display"', 'Georgia', 'serif'],
          display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
          sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        }
      }
    }
  };
}

// =========================================
// CAROUSEL SCRIPT (TEAM SECTION)
// =========================================
function scrollTeam(direction) {
  const carousel = document.getElementById('teamCarousel');
  if (carousel) {
    carousel.scrollBy({
      left: direction * carousel.offsetWidth,
      behavior: 'smooth'
    });
  }
}
window.scrollTeam = scrollTeam;

// =========================================
// MOBILE MENU SCRIPT
// =========================================
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!mobileMenuButton || !mobileMenu || !menuIcon) return;

  let menuOpen = false;

  mobileMenuButton.addEventListener("click", () => {
    menuOpen = !menuOpen;
    mobileMenuButton.setAttribute("aria-expanded", menuOpen);

    if (menuOpen) {
      // Open menu
      mobileMenu.classList.remove(
        "scale-x-0",
        "opacity-0",
        "pointer-events-none"
      );
      mobileMenu.classList.add(
        "scale-x-100",
        "opacity-100"
      );

      // Change icon
      menuIcon.classList.remove("fa-bars-staggered");
      menuIcon.classList.add("fa-xmark", "rotate-90");
    } else {
      // Close menu
      mobileMenu.classList.remove(
        "scale-x-100",
        "opacity-100"
      );
      mobileMenu.classList.add(
        "scale-x-0",
        "opacity-0",
        "pointer-events-none"
      );

      // Change icon
      menuIcon.classList.remove("fa-xmark", "rotate-90");
      menuIcon.classList.add("fa-bars-staggered");
    }
  });

  // Close menu after clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuOpen = false;
      mobileMenuButton.setAttribute("aria-expanded", "false");

      mobileMenu.classList.remove("scale-x-100", "opacity-100");
      mobileMenu.classList.add(
        "scale-x-0",
        "opacity-0",
        "pointer-events-none"
      );

      menuIcon.classList.remove("fa-xmark", "rotate-90");
      menuIcon.classList.add("fa-bars-staggered");
    });
  });
}

// =========================================
// ANIMATED STATS COUNTER
// =========================================
function initStatsCounter() {
  const counterElements = document.querySelectorAll(".stat-counter, [data-counter]");
  if (!counterElements.length) return;

  counterElements.forEach((el) => {
    const target = parseFloat(el.getAttribute("data-target")) || 0;
    const prefix = el.getAttribute("data-prefix") || "";
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = parseInt(el.getAttribute("data-duration"), 10) || 2000;
    const hasDecimal = target % 1 !== 0;

    let startTime = null;

    // Reset initial text to 0
    el.textContent = `${prefix}0${suffix}`;

    function animateCount(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Smooth cubic ease out
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = easeOutProgress * target;

      let formattedNumber;
      if (hasDecimal) {
        formattedNumber = currentValue.toFixed(1);
      } else {
        formattedNumber = Math.floor(currentValue).toLocaleString('fr-FR');
      }

      el.textContent = `${prefix}${formattedNumber}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        // Ensure final exact value
        const finalFormatted = hasDecimal ? target.toFixed(1) : Math.floor(target).toLocaleString('fr-FR');
        el.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    }

    // Launch count animation on page reload
    requestAnimationFrame(animateCount);
  });
}
window.initStatsCounter = initStatsCounter;

// =========================================
// CONTACT FORM SUBMISSION ENHANCEMENT
// =========================================
function initContactForm() {
  const contactForm = document.querySelector("#contact form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Demande envoyée avec succès !",
        text: "Merci de nous avoir contactés. Un de nos directeurs associés vous recontactera sous 24 heures ouvrées.",
        icon: "success",
        confirmButtonColor: "#C29B53",
        confirmButtonText: "Parfait"
      });
      contactForm.reset();
    } else {
      alert("Merci pour votre message ! Un conseiller Genius Consulting vous répondra dans les plus brefs délais.");
      contactForm.reset();
    }
  });
}

// Initialize when DOM is ready
function initApp() {
  initMobileMenu();
  initStatsCounter();
  initContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Ensure counters rerun when page is reloaded or restored from cache
window.addEventListener("pageshow", () => {
  initStatsCounter();
});
window.addEventListener("load", () => {
  initStatsCounter();
});


// Scroll




