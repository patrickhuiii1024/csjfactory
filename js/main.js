/* CSJ site - shared interactions */
/* 全局 Worker 地址：部署在线询盘 Worker 后在此填写（main.js 与 chat-widget.js 共用） */
window.CF_WORKER_URL = "https://inquiry.csjfactory.com";

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

  /* Inquiry form - submit to Cloudflare Worker */
  var form = document.getElementById("inquiry-form");
  if (form) {
    var WORKER_URL = window.CF_WORKER_URL || "";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.getElementById("form-status");
      var btn = form.querySelector("button[type=submit]");
      var getMsg = function (key, fallback) {
        try {
          if (window.I18N && window.csjLang && window.I18N[window.csjLang][key]) {
            return window.I18N[window.csjLang][key];
          }
        } catch (err) {}
        return fallback;
      };

      if (!WORKER_URL) {
        if (status) {
          status.textContent = getMsg("ct.form.error", "Form not configured yet.");
        }
        return;
      }

      var payload = {
        interest: (form.querySelector("#interest") || {}).value || "",
        firstName: (form.querySelector("#first-name") || {}).value || "",
        lastName: (form.querySelector("#last-name") || {}).value || "",
        company: (form.querySelector("#company") || {}).value || "",
        email: (form.querySelector("#email") || {}).value || "",
        phone: (form.querySelector("#phone") || {}).value || "",
        comments: (form.querySelector("#comments") || {}).value || ""
      };

      if (btn) btn.disabled = true;
      if (status) status.textContent = "...";

      fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok && data.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            if (status) {
              status.textContent = getMsg(
                "ct.form.status",
                "Thank you. Your inquiry has been noted - we will reply within 24 hours."
              );
            }
            form.reset();
          } else {
            if (status) {
              status.textContent = getMsg(
                "ct.form.error",
                "Sorry, something went wrong. Please try again."
              );
            }
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = getMsg(
              "ct.form.error",
              "Sorry, something went wrong. Please try again."
            );
          }
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  }
})();
