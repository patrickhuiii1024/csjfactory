/* CSJ site - shared interactions */
(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav--mobile-target");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      toggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("is-open") ? "true" : "false"
      );
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Inquiry form (static placeholder - to be connected to Cloudflare Worker) */
  var form = document.getElementById("inquiry-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      if (status) {
        var msg = "Thank you. Your inquiry has been noted - we will reply within 24 hours.";
        try {
          if (window.I18N && window.csjLang && window.I18N[window.csjLang]["ct.form.status"]) {
            msg = window.I18N[window.csjLang]["ct.form.status"];
          }
        } catch (e) {}
        status.textContent = msg;
      }
      form.reset();
    });
  }
})();
