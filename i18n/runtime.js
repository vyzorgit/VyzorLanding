// runtime.js — Langue des pages (version anglaise du site).
// Injecté par scripts/build.mjs en tête de chaque page, avant les composants.
// Le build pose avant ce script : VZ_LANG ("fr" | "en"), VZ_FR_PATH (adresse française de la page),
// VZ_ALT (adresse de la même page dans l'autre langue, si elle existe), VZ_ROUTES (FR → EN).
// En anglais, les textes restent écrits en français dans les .jsx : React.createElement est enveloppé
// et remplace chaque texte par sa traduction (dictionnaire i18n/en/*.json, clé = texte français
// aux espaces près), traduit aussi aria-label/title/placeholder/alt et redirige les liens internes
// vers la page anglaise quand elle existe. Un texte sans traduction reste en français et est noté
// dans window.__vzMissing (le build échoue s'il en reste au pré-rendu).
(function () {
  var w = window;
  var lang = w.VZ_LANG === "en" ? "en" : "fr";
  w.VZ_LANG = lang;
  // Variante par langue quand l'ordre des mots ou la structure diffère : vzL({ fr, en }).
  // Pour du JSX, passer des fonctions (vzL({ fr: () => <…/>, en: () => <…/> })) : seule la branche de la
  // langue est construite, et la branche anglaise n'est pas repassée au dictionnaire.
  // vzRaw(s) : texte déjà en anglais (gabarit calculé), à ne pas traduire.
  var raw = 0;
  var done = {};
  var norm = function (s) { return s.replace(/\s+/g, " ").trim(); };
  w.vzRaw = function (s) { if (lang === "en" && typeof s === "string") done[norm(s)] = 1; return s; };
  w.vzL = function (o) {
    var v = o && o[lang] !== undefined ? o[lang] : o && o.fr;
    if (typeof v === "function") {
      if (lang !== "en") return v();
      raw++;
      try { return v(); } finally { raw--; }
    }
    return w.vzRaw(v);
  };
  if (lang === "fr") { w.vzT = function (s) { return s; }; w.vzHref = function (h) { return h; }; return; }

  var dict = w.VZ_DICT || {};
  var routes = w.VZ_ROUTES || {};
  var missing = (w.__vzMissing = w.__vzMissing || {});
  var LETTER = /[A-Za-zÀ-ÿ]/;
  // Un texte déjà traduit peut repasser par createElement (props.children transmis d'un composant
  // à l'autre) : les valeurs du dictionnaire sont reconnues et laissées telles quelles.
  for (var k0 in dict) done[dict[k0]] = 1;

  function tr(s) {
    if (raw || typeof s !== "string" || !LETTER.test(s)) return s;
    var key = norm(s);
    var v = dict[key];
    if (v === undefined) { if (!done[key]) missing[key] = 1; return s; }
    return (/^\s/.test(s) ? " " : "") + v + (/\s$/.test(s) ? " " : "");
  }
  function mapHref(h) {
    if (typeof h !== "string" || h.charAt(0) !== "/" || h.charAt(1) === "/") return h;
    var m = h.match(/^([^?#]*)(.*)$/);
    var p = m[1].replace(/\.html$/, "").replace(/\/index$/, "/");
    if (p.length > 1) p = p.replace(/\/$/, "");
    return routes[p] !== undefined ? routes[p] + m[2] : h;
  }
  function trChildren(c) {
    if (typeof c === "string") return tr(c);
    if (Array.isArray(c)) {
      var out = null;
      for (var i = 0; i < c.length; i++) {
        var n = trChildren(c[i]);
        if (n !== c[i]) { out = out || c.slice(); out[i] = n; }
      }
      return out || c;
    }
    return c;
  }
  w.vzT = tr;
  w.vzHref = mapHref;

  var TEXT_PROPS = ["aria-label", "title", "placeholder", "alt", "label"];
  var R = w.React;
  var ce = R.createElement;
  R.createElement = function (type, props) {
    // Balises techniques et liens du sélecteur de langue (hrefLang) : laissés tels quels.
    if (type === "style" || type === "script" || (props && props.hrefLang)) return ce.apply(R, arguments);
    var args = Array.prototype.slice.call(arguments);
    if (props) {
      var next = null;
      var set = function (k, v) { if (v !== props[k]) { next = next || Object.assign({}, props); next[k] = v; } };
      for (var i = 0; i < TEXT_PROPS.length; i++) {
        var k = TEXT_PROPS[i];
        if (typeof props[k] === "string") set(k, tr(props[k]));
      }
      if (typeof props.href === "string") set("href", mapHref(props.href));
      if (typeof type === "string" && type === "input" && (props.type === "submit" || props.type === "button") && typeof props.value === "string") set("value", tr(props.value));
      if (props.children !== undefined && args.length <= 2) set("children", trChildren(props.children));
      if (next) args[1] = next;
    }
    for (var j = 2; j < args.length; j++) args[j] = trChildren(args[j]);
    return ce.apply(R, args);
  };
})();
