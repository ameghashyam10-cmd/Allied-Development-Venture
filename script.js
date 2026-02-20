/* =====================================================
   Allied Development Venture - Main Script
   Safe | Lightweight | Dependency-Free
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     MOBILE MENU
  --------------------------------*/
  const mobileToggle = document.getElementById("mobileToggle");
  const mobilePanel = document.getElementById("mobilePanel");

  mobileToggle?.addEventListener("click", () => {
    mobilePanel?.classList.toggle("hidden");
  });


  /* -------------------------------
     RESPONSIVE NAV RESET
  --------------------------------*/
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobilePanel?.classList.add("hidden");
    }
  });


  /* -------------------------------
     STICKY HEADER SCROLL EFFECT
  --------------------------------*/
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 80) {
      header?.classList.add("scroll-down");
      header?.classList.remove("scroll-up");
    } else {
      header?.classList.remove("scroll-down");
      header?.classList.add("scroll-up");
    }

    lastScrollTop = Math.max(scrollTop, 0);
  });


  /* -------------------------------
     SMOOTH SCROLL NAVIGATION
  --------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        e.preventDefault();

        const headerOffset = 72;
        const elementPosition =
          target.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: "smooth"
        });

        mobilePanel?.classList.add("hidden");
      }
    });
  });


  /* -------------------------------
     SCROLL REVEAL ANIMATION
  --------------------------------*/
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal")
    .forEach(el => revealObserver.observe(el));


  /* -------------------------------
     CONTACT FORM HANDLER
     (Replace later with API)
  --------------------------------*/
  const form = document.getElementById("contactForm");

  form?.addEventListener("submit", e => {
    e.preventDefault();

    const name =
      document.getElementById("name")?.value.trim() || "Doctor";
    const email =
      document.getElementById("email")?.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // FUTURE:
    // fetch("/api/contact", { method:"POST", body:FormData })

    alert(
      `Thank you ${name}. Our healthcare operations team will contact you shortly.`
    );

    form.reset();
  });


  /* -------------------------------
     FOOTER YEAR AUTO UPDATE
  --------------------------------*/
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

});
