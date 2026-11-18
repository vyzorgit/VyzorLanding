// js/questionnaire.js — Questionnaire de préparation d'un rendez-vous (preparation-rendez-vous.html).
// Rien n'est obligatoire. Les réponses partent dans la boîte admin@vyzor.fr via web3forms
// (même service que la candidature bêta et les guides, déjà autorisé par la CSP).
(function () {
  var WEB3FORMS_KEY = "9f003436-eba6-4543-b3ed-06c89a38a69c";
  var form = document.getElementById("vz-prep");
  if (!form) return;
  var branches = form.querySelectorAll(".branch");
  var bar = document.getElementById("bar");
  var barLabel = document.getElementById("bar-label");
  var btn = document.getElementById("vz-send");
  var msg = document.getElementById("vz-msg");
  var done = document.getElementById("vz-done");

  function profile() {
    var p = form.querySelector('input[name="profil"]:checked');
    return p ? p.value : "";
  }

  function showBranch() {
    var p = profile();
    for (var i = 0; i < branches.length; i++) {
      branches[i].hidden = branches[i].getAttribute("data-branch") !== p;
    }
  }

  // Champs visibles regroupés par nom de question.
  function visibleQuestions() {
    var names = {};
    var els = form.querySelectorAll("input[name], textarea[name]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.name === "botcheck") continue;
      if (el.closest(".branch[hidden]")) continue;
      var answered = (el.type === "radio" || el.type === "checkbox") ? el.checked : el.value.trim() !== "";
      names[el.name] = names[el.name] || answered;
    }
    return names;
  }

  function updateProgress() {
    var q = visibleQuestions();
    var total = 0, filled = 0;
    for (var k in q) { total++; if (q[k]) filled++; }
    bar.style.width = (total ? Math.round((filled / total) * 100) : 0) + "%";
    barLabel.textContent = filled + (filled > 1 ? " questions renseignées" : " question renseignée") + " sur " + total;
  }

  // Libellé lisible d'une question (pour l'e-mail reçu), sans la précision entre parenthèses.
  function questionLabel(name) {
    var el = form.querySelector('[name="' + name + '"]');
    var own = el && el.id ? form.querySelector('label[for="' + el.id + '"]') : null;
    var holder = el && el.closest("fieldset");
    var node = holder ? holder.querySelector("legend") : own;
    if (!node) return name;
    var text = "";
    for (var i = 0; i < node.childNodes.length; i++) {
      if (node.childNodes[i].nodeType === 3) text += node.childNodes[i].textContent;
    }
    return text.replace(/\s+/g, " ").trim() || name;
  }

  // Groupes « 3 au plus ».
  function enforceMax(e) {
    var group = e.target.closest("[data-max]");
    if (!group || !e.target.checked) return;
    var max = parseInt(group.getAttribute("data-max"), 10);
    var checked = group.querySelectorAll("input:checked");
    if (checked.length > max) e.target.checked = false;
  }

  form.addEventListener("change", function (e) {
    if (e.target.name === "profil") showBranch();
    enforceMax(e);
    updateProgress();
  });
  form.addEventListener("input", updateProgress);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (btn.disabled) return;
    var trap = form.querySelector('input[name="botcheck"]');
    var fd = new FormData();
    fd.append("access_key", WEB3FORMS_KEY);
    var who = (form.entreprise.value.trim() || form.nom.value.trim() || "sans nom");
    fd.append("subject", "Préparation de rendez-vous — " + who + " — " + (profile() || "profil non précisé"));
    fd.append("from_name", "Vyzor — Préparation de rendez-vous");
    fd.append("botcheck", trap && trap.checked ? "on" : "");
    var email = form.email.value.trim();
    if (email) fd.append("email", email);

    // Une ligne par question visible, les choix multiples réunis.
    var values = {};
    var order = [];
    var els = form.querySelectorAll("input[name], textarea[name]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.name === "botcheck" || el.name === "email" || el.closest(".branch[hidden]")) continue;
      if (order.indexOf(el.name) === -1) order.push(el.name);
      var v = (el.type === "radio" || el.type === "checkbox") ? (el.checked ? el.value : "") : el.value.trim();
      if (v) values[el.name] = values[el.name] ? values[el.name] + ", " + v : v;
    }
    for (var j = 0; j < order.length; j++) {
      fd.append(questionLabel(order[j]), values[order[j]] || "—");
    }

    btn.disabled = true;
    var label = btn.textContent;
    btn.textContent = "Envoi…";
    msg.textContent = "";
    fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return r.ok && d.success; }); })
      .catch(function () { return false; })
      .then(function (ok) {
        if (ok) {
          form.hidden = true;
          document.querySelector(".progress").hidden = true;
          done.hidden = false;
          window.scrollTo(0, 0);
        } else {
          btn.disabled = false;
          btn.textContent = label;
          msg.textContent = "L’envoi n’a pas fonctionné. Réessayez dans un instant, ou répondez simplement à notre e-mail.";
        }
      });
  });

  showBranch();
  updateProgress();
})();
