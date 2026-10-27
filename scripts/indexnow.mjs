// indexnow.mjs — Signale à Bing, Yandex, Seznam… (protocole IndexNow) toutes les pages du sitemap.
// À lancer après une mise en production : npm run indexnow. La clé publique est le fichier
// <clé>.txt à la racine du site (publié tel quel) ; IndexNow vérifie qu'elle est bien en ligne.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "www.vyzor.fr";
const keyFile = readdirSync(ROOT).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("Clé IndexNow introuvable (fichier <32 caractères hexadécimaux>.txt à la racine)");
const key = keyFile.replace(/\.txt$/, "");
// Sitemap publié (dist/, guides compris) s'il existe, sinon la source.
const sitemap = existsSync(join(ROOT, "dist", "sitemap.xml")) ? join(ROOT, "dist", "sitemap.xml") : join(ROOT, "sitemap.xml");
const urlList = [...readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
// 200 = reçu, 202 = reçu (clé en cours de vérification) ; 403 = clé absente du site.
console.log(`IndexNow : ${res.status} ${res.statusText} — ${urlList.length} adresses envoyées`);
if (res.status >= 400) process.exit(1);
