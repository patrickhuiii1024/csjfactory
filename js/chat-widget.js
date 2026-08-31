/* CSJ site - floating chat inquiry widget (WhatsApp-style) */
(function () {
  "use strict";

  /* Worker 地址（与 main.js 共享，部署后填写） */
  var WORKER_URL = window.CF_WORKER_URL || "";

  /* ---------- 构建并注入悬浮窗 HTML ---------- */
  var widget = document.createElement("div");
  widget.className = "chat-widget";
  widget.id = "chatWidget";
  widget.innerHTML =
    '<button class="chat-widget__fab" id="chatFab" type="button" aria-label="Chat with us" aria-expanded="false">' +
    '  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '    <path d="M12 3C7.03 3 3 6.8 3 11.5c0 1.85.62 3.55 1.68 4.95L3.5 21l4.8-1.5c1.13.52 2.43.8 3.7.8 4.97 0 9-3.8 9-8.5S16.97 3 12 3zm-1.2 5.4c-.25.05-.35.12-.44.62-.1.5-.55 3.5 1.06 5.16 1.62 1.67 3.1 1.58 3.57 1.55.47-.03.56-.28.66-.5.1-.22.6-.5.8-.62.2-.12.42-.2.5.03.12.37.5 1.32.55 1.5.05.18.1.3-.1.5-.25.25-.72.72-1.68.78-1.37.1-2.8-.35-4.5-2-1.25-1.22-2.08-2.7-2.32-3.53-.5-1.68-.5-2.36-.43-2.85.06-.4.4-.9.55-1.06.16-.17.3-.14.42-.08.1.06.44.4.56.5.12.1.18.22.18.32 0 .1-.1.4-.15.5-.05.1-.1.2 0 .34.1.12.5 1 1.05 1.62.73.8 1.33 1.05 1.53 1.18.2.12.32.1.44-.06.12-.17.5-.62.63-.83.13-.2.26-.17.44-.1.18.07 1.14.54 1.33.64.2.1.32.15.36.24.05.1.05.57-.1.9z" />' +
    "  </svg>" +
    "</button>" +
    '<div class="chat-widget__panel" id="chatPanel" aria-hidden="true">' +
    '  <div class="chat-widget__header">' +
    '    <span class="chat-widget__eyebrow" data-i18n="chat.hint">Chat with us</span>' +
    '    <span class="chat-widget__status"><i class="chat-widget__dot" aria-hidden="true"></i><span data-i18n="chat.status">Online - we reply within 24h</span></span>' +
    "  </div>" +
    '  <div class="chat-widget__body">' +
    '    <div class="chat-msg chat-msg--bot" data-i18n="chat.welcome">Hello! How can we help? Send us your inquiry and our team will get back to you within 24 hours.</div>' +
    '    <a class="chat-wa" href="https://wa.me/qr/63LEXANVPAPOG1" target="_blank" rel="noopener">' +
    '      <svg class="chat-wa__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 012.41 5.83c.01 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z"/></svg>' +
    '      <span class="chat-wa__content">' +
    '        <span class="chat-wa__text" data-i18n="chat.whatsapp">Chat on WhatsApp</span>' +
    '        <span class="chat-wa__hint" data-i18n="chat.whatsappHint">Prefer to talk directly? Message us on WhatsApp.</span>' +
    '      </span>' +
    "    </a>" +
    '    <div class="chat-quick" role="group" aria-label="Quick replies">' +
    '      <button class="chat-quick__btn" type="button" data-topic="samples" data-i18n="chat.q.samples">Request Samples</button>' +
    '      <button class="chat-quick__btn" type="button" data-topic="custom" data-i18n="chat.q.custom">Custom Development</button>' +
    '      <button class="chat-quick__btn" type="button" data-topic="quote" data-i18n="chat.q.quote">Get a Quote</button>' +
    "    </div>" +
    '    <div class="chat-msg chat-msg--user chat-msg--hidden" id="chatUserMsg"></div>' +
    '    <div class="chat-msg chat-msg--bot chat-msg--hidden" id="chatReply"></div>' +
    "  </div>" +
    '  <form class="chat-widget__form" id="chatForm" novalidate>' +
    '    <input type="email" id="chatEmail" class="chat-widget__input" autocomplete="email" data-i18n-placeholder="chat.email" placeholder="Your email *" required>' +
    '    <textarea id="chatMessage" class="chat-widget__input chat-widget__input--area" data-i18n-placeholder="chat.message" placeholder="Your message" rows="2" required></textarea>' +
    '    <button type="submit" class="chat-widget__send" data-i18n="chat.send">Send</button>' +
    "  </form>" +
    "</div>";
  document.body.appendChild(widget);

  var fab = document.getElementById("chatFab");
  var panel = document.getElementById("chatPanel");
  var form = document.getElementById("chatForm");
  var emailInput = document.getElementById("chatEmail");
  var msgInput = document.getElementById("chatMessage");
  var userMsg = document.getElementById("chatUserMsg");
  var reply = document.getElementById("chatReply");

  var getMsg = function (key, fallback) {
    try {
      if (window.I18N && window.csjLang && window.I18N[window.csjLang][key]) {
        return window.I18N[window.csjLang][key];
      }
    } catch (e) {}
    return fallback;
  };

  var setText = function (el, key, fallback) {
    if (el) el.textContent = getMsg(key, fallback);
  };

  /* 打开/关闭 */
  function setOpen(open) {
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    fab.setAttribute("aria-expanded", open ? "true" : "false");
  }

  fab.addEventListener("click", function () {
    setOpen(!panel.classList.contains("is-open"));
    if (panel.classList.contains("is-open")) {
      setTimeout(function () {
        emailInput.focus();
      }, 300);
    }
  });

  document.addEventListener("click", function (e) {
    if (
      panel.classList.contains("is-open") &&
      !widget.contains(e.target)
    ) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("is-open")) {
      setOpen(false);
    }
  });

  /* 快捷回复：预填消息方向并聚焦邮箱 */
  var quickBtns = panel.querySelectorAll(".chat-quick__btn");
  quickBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      msgInput.value = getMsg(
        "chat.q." + btn.getAttribute("data-topic"),
        btn.getAttribute("data-topic")
      );
      emailInput.focus();
    });
  });

  /* 提交 */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = emailInput.value.trim();
    var message = msgInput.value.trim();
    if (!email || !message) return;

    /* 回显用户消息气泡 */
    userMsg.textContent = message + (email ? " (" + email + ")" : "");
    userMsg.classList.remove("chat-msg--hidden");

    var sendBtn = form.querySelector(".chat-widget__send");
    if (sendBtn) sendBtn.disabled = true;

    if (!WORKER_URL) {
      setText(reply, "chat.error", "Sorry, something went wrong.");
      reply.classList.remove("chat-msg--hidden");
      if (sendBtn) sendBtn.disabled = false;
      return;
    }

    fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        interest: "chat",
        firstName: "",
        lastName: "",
        company: "",
        email: email,
        phone: "",
        comments: message
      })
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok && data.ok };
        });
      })
      .then(function (result) {
        setText(reply, result.ok ? "chat.sent" : "chat.error", result.ok ? "Thanks!" : "Sorry, something went wrong.");
        reply.classList.remove("chat-msg--hidden");
        if (result.ok) {
          emailInput.value = "";
          msgInput.value = "";
        }
      })
      .catch(function () {
        setText(reply, "chat.error", "Sorry, something went wrong.");
        reply.classList.remove("chat-msg--hidden");
      })
      .finally(function () {
        if (sendBtn) sendBtn.disabled = false;
      });
  });

  /* 语言切换后：清空动态气泡（静态文案由 i18n 自动重渲） */
  var lastLang = window.csjLang;
  var pollLang = setInterval(function () {
    if (window.csjLang !== lastLang) {
      lastLang = window.csjLang;
      userMsg.classList.add("chat-msg--hidden");
      reply.classList.add("chat-msg--hidden");
    }
  }, 600);
})();
