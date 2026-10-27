// js/subscribe.js — Formulaires « recevoir les guides » (form[data-vz-subscribe]).
// L'email part dans la boîte contact@vyzor.fr via web3forms (même service que la candidature bêta).
(function () {
  var WEB3FORMS_KEY = "9f003436-eba6-4543-b3ed-06c89a38a69c";
  function send(email, source, trap) {
    var fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", "Nouveau contact (guides) — " + source);
    fd.append("from_name", "Vyzor — Guides");
    fd.append("email", email);
    fd.append("source", source);
    fd.append("botcheck", trap || "");
    return fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return r.ok && d.success; }); })
      .catch(function () { return false; });
  }
  function bind(form) {
    var input = form.querySelector('input[type="email"]');
    var trap = form.querySelector('input[name="botcheck"]');
    var btn = form.querySelector('button[type="submit"]');
    var msg = form.querySelector("[data-vz-msg]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (btn.disabled) return;
      if (!input.checkValidity()) { input.reportValidity(); return; }
      btn.disabled = true;
      var label = btn.textContent;
      btn.textContent = "Envoi…";
      send(input.value.trim(), form.getAttribute("data-vz-subscribe") || location.pathname, trap && trap.checked ? "on" : "").then(function (ok) {
        if (ok) { form.classList.add("is-done"); msg.textContent = "C'est noté, merci. Nous vous écrirons quand un nouveau guide sort."; }
        else { btn.disabled = false; btn.textContent = label; msg.textContent = "Une erreur est survenue. Réessayez dans un instant."; }
      });
    });
  }
  function init() {
    var forms = document.querySelectorAll("form[data-vz-subscribe]");
    for (var i = 0; i < forms.length; i++) bind(forms[i]);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
