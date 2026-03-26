// ------- sw.js : PWA hors-ligne pour l'app de réanimation -------

const CACHE_NAME = "saric-cache-v20260113-04";

// Tous les fichiers à pré-cacher (HTML, CSS, JS, images, Excel)
const PRECACHE = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.webmanifest",

  // Icônes
  "./icons/icon-192.png",
  "./icons/icon-512.png",

  // Images
  "./img/BLSE.png",
  "./img/SARM.png",
  "./img/abdo.png",
  "./img/adaptee.png",
  "./img/ampC.png",
  "./img/anesthesie.png",
  "./img/antibioprophylaxie.png",
  "./img/carba.png",
  "./img/cec.png",
  "./img/dermohypodermite.png",
  "./img/dialyse.png",
  "./img/endocardite.png",
  "./img/erv.png",
  "./img/fabrice.png",
  "./img/modalite.png",
  "./img/neuro.png",
  "./img/pneumonie.png",
  "./img/probabiliste.png",
  "./img/pyo.png",
  "./img/reanimation.png",
  "./img/sepsis.png",
  "./img/steno.png",
  "./img/urinaire.png",



  "./img/eerecmo.png",
  "./img/cardiostruct.png",
  "./img/chircec.png",
  "./img/consultation.png",
  "./img/formules.png",
  "./img/antibiotherapie.png",
  "./img/prescription.png",
  "./img/radiovasc.png",
  "./img/vasculaire.png",
  "./img/vasculaire2.png",
  "./img/scarpa.png",
  "./img/antibiotherapie2.png",

  "img/Pseudomonas-aeruginosa.png",
"img/Acinetobacter-baumanii.png",
"img/Béta-lactamases.png",
"img/Carbapénèmases.png",
"img/Cocci-Gram-positifs.png",
"img/Bacilles-Gram-négatifs.png",

,


  // Files
  "./files/Bactériologie clinique.pdf",
];


// INSTALL : pré-cache (robuste) — n'échoue pas si 1 ressource est manquante
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // On tente d'ajouter tout, mais on n'échoue pas si un item est absent (404)
    const UNIQUE = [...new Set(PRECACHE)];

    await Promise.allSettled(
      UNIQUE.map((url) =>
        cache.add(url).catch((err) => {
          console.warn("[SW] Precaching failed:", url, err);
        })
      )
    );

    await self.skipWaiting();
  })());
});

// FETCH : stratégie hors-ligne
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // =========================================
  // ✅ EXCEPTION : JSON BiBL hebdo
  // - on ne le met jamais en cache
  // - on force le réseau
  // IMPORTANT : ce JSON est souvent servi via firebasestorage.googleapis.com
  // donc il peut être "externe". Dans ce cas, on le laisse passer au navigateur,
  // mais si jamais tu changes pour une URL locale, on le gère aussi.
  // =========================================
  const isBiBLWeeklyJson =
    url.href.includes("bibl_weekly.json") ||
    url.href.includes("bibliography%2Fbibl_weekly.json") ||
    url.pathname.endsWith("/bibliography/bibl_weekly.json");

  if (isBiBLWeeklyJson) {
    event.respondWith(fetch(req, { cache: "no-store" }));
    return;
  }

  // =========================================
  // Requêtes externes : on ne les intercepte pas
  // (Euroscore, Firebase Storage, etc.)
  // =========================================
  if (url.origin !== self.location.origin) {
    return;
  }

  // =========================================
  // Navigation (documents HTML) : réseau puis cache
  // =========================================
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith((async () => {
      try {
        const networkResp = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        await cache.put("./index.html", networkResp.clone());
        return networkResp;
      } catch (e) {
        const cached = await caches.match("./index.html");
        if (cached) return cached;
        return new Response("Offline", { status: 503, statusText: "Offline" });
      }
    })());
    return;
  }

  // =========================================
  // Ressources : JS/CSS en network-first, le reste cache-first
  // =========================================
  event.respondWith((async () => {
    const isJS = req.destination === "script" || url.pathname.endsWith(".js");
    const isCSS = req.destination === "style" || url.pathname.endsWith(".css");

    // ✅ JS/CSS : NETWORK FIRST (évite d'être bloqué sur un vieux app.js)
    if (isJS || isCSS) {
      try {
        const networkResp = await fetch(req, { cache: "no-store" });
        const cache = await caches.open(CACHE_NAME);
        await cache.put(req, networkResp.clone());
        return networkResp;
      } catch (e) {
        const cached = await caches.match(req, { ignoreSearch: false });
        if (cached) return cached;
        return new Response("", { status: 504, statusText: "Offline" });
      }
    }

    // ✅ Assets (images, etc.) : CACHE FIRST + update en arrière-plan
    const cached = await caches.match(req, { ignoreSearch: false });
    if (cached) {
      fetch(req).then(async (networkResp) => {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(req, networkResp.clone());
      }).catch(() => {});
      return cached;
    }

    // Pas en cache : réseau puis cache
    try {
      const networkResp = await fetch(req);
      const cache = await caches.open(CACHE_NAME);
      await cache.put(req, networkResp.clone());
      return networkResp;
    } catch (e) {
      return new Response("", { status: 504, statusText: "Offline" });
    }
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : Promise.resolve()))
    );
    await self.clients.claim();
  })());
});
