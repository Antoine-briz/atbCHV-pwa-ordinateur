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
  "./img/hepatite.png",
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

  "./img/eto.png",
  "./img/eto_ao_morphologie.png",
  "./img/eto_ccvg.png",
  "./img/eto_dpdt.png",
  "./img/eto_fevg.png",
  "./img/eto_frvd.png",
  "./img/eto_FRVG.png",
  "./img/eto_htap_mesosyst.png",
  "./img/eto_htap_pap_ip.png",
  "./img/eto_htap_paps_it.png",
  "./img/eto_ia_1.2.png",
  "./img/eto_ia_PISA.png",
  "./img/eto_ia_quantification.png",
  "./img/eto_ia_VC.png",
  "./img/eto_im_1.2.png",
  "./img/eto_im_classif.png",
  "./img/eto_im_PISA.png",
  "./img/eto_im_VC.png",
  "./img/eto_mit_morphologie.png",
  "./img/eto_ondeS.png",
  "./img/eto_ptdvg.png",
  "./img/eto_ra.png",
  "./img/eto_rm_1.2.png",
  "./img/eto_rm_gradient_surface.png",
  "./img/eto_rm_plani.png",
  "./img/eto_strain_vg.png",
  "./img/eto_tapsepaps.png",
  "./img/eto_tei_vg.png",
  "./img/eto_vd_sprime.png",
  "./img/eto_vd_strain.png",
  "./img/eto_vd_tapse.png",
  "./img/eto_vd_tei.png",
  "./img/eto_vg_17segments.png",
  "./img/eto_tric_morpho.png",
  "./img/eto_tric_morphoETO.png",
  "./img/eto_IT_severite.png",

  "./img/fa.png",
  "./img/saignement.png",
  "./img/transplantation.png",
  "./img/assistances.png",
  "./img/chadsvasc.png",
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

  "./img/aidecognitiveSFAR.png",
  "./img/antibiotherapie2.png",
  "./img/assistances2.png",
  "./img/cardiostruct2.png",
  "./img/chircec2.png",
  "./img/dialyse2.png",
  "./img/dv.png",
  "./img/eclair.png",
  "./img/ecmova.png",
  "./img/eto2.png",
  "./img/fa2.png",
  "./img/formules2.png",
  "./img/gestionunipulm.png",
  "./img/iot.png",
  "./img/iotdoublelum.png",
  "./img/logocardio.png",
  "./img/logosaric.png",
  "./img/prescription2.png",
  "./img/radiovasc2.png",
  "./img/saignement2.png",
  "./img/tableauacr.png",
  "./img/titre2.png",
  "./img/titre3.png",
  "./img/titre4.png",
  "./img/titre5.png",
  "./img/titre6.png",
  "./img/titre7.png",
  "./img/titre8.png",
  "./img/transplantation2.png",
  "./img/annuaire.png",
  "./img/code.png",
  "./img/cf-bloc-cervical.png",
"./img/cf-bloc-thoracique-transverse.png",
"./img/cf-algorithme-quantra.png",
"./img/cf-bpv.png",
"./img/cf-erecteur-rachis.png",
"./img/cf-tap-bloc.png",
"./img/cf-serratus.png",
"./img/cf-qlb.png",
"./img/cf-biiih.png",
"./img/cf-femoral.png",
"./img/cf-obturateur.png",
"./img/cf-canal-adducteurs.png",
"./img/cf-sciatique.png",
"./img/cf-supra-claviculaire.png",
"./img/cf-plastieaortique.png",
"./img/cf-plastiemitrale.png",
"./img/cf-diametre-aortique.png",
"./img/objectifs-tensionnels.png",
  "./img/saricnews.png",
   "img/algo-1.png",
  "img/algo-2.png",
  "img/algo-3.png",
  "img/algo-4.png",
  "img/algo-5.png",
  "img/algo-6.png",
  "img/algo-7.png",
  "img/algo-8.png",
  "img/algo-9.png",
  "img/algo-10.png",
  "img/algo-11.png",
  "img/cinetiquesegmentaire.png",
  "img/dysfonctionVD.png",
  "img/fonctiondiastoliqueVG.png",
  "img/fonctionsystoliqueVG.png",
  "img/htap.png",
  "img/valveaortique.png",
  "img/valvemitrale.png",
  "img/valvetricuspide.png",
  "img/Pseudomonas-aeruginosa.png",
"img/Acinetobacter-baumanii.png",
"img/Béta-lactamases.png",
"img/Carbapénèmases.png",
"img/Cocci-Gram-positifs.png",
"img/Bacilles-Gram-négatifs.png",
"img/ecmoVA.png",
"img/impella.png",
"img/lvad.png",
"img/coeurtransplant.png",
  "img/canulationecmo.png",
  "img/aorteecmo.png",
  "img/dilatvgsludge.png",
  "img/sevrageecmo.png",
  "img/inletimpella.png",
  "img/outletimpella.png",
  "img/impella-im.png",
  "img/aortelvad.png",
  "img/inflowlvad.png",
  "img/outflowlvad.png",
  "img/debitlvad.png",
  "img/trajetlvad.png",
  "img/veinecave.png",
  "img/transplantbulles.png",
  "img/transplantVG.png",
  "img/transplantVD.png",
  "img/canulationarterielle.png",
  "img/canulationveineuse.png",
  "img/cardioplegie.png",
  
  // Menu principal
  "img/enseignement.png",
  "img/bibliographie.png",
  "img/bibliographie2.png",
  "img/recherche.png",

  // CEC
  "img/cec1.png",
  "img/schemaCEC.png",

  // === Anesthésie (chirurgie cardiaque)
"img/journals/bja.png",
"img/journals/anesthesiology.png",
"img/journals/anesthesia_analgesia.png",
"img/journals/jcva.png",
"img/journals/eja.png",

// === Réanimation
"img/journals/ajrccm.png",
"img/journals/critical_care_medicine.png",
"img/journals/intensive_care_medicine.png",
"img/journals/critical_care.png",
"img/journals/annals_intensive_care.png",

// === Chirurgie cardiaque & thoracique
"img/journals/jtcvs.png",
"img/journals/ejcts.png",
"img/journals/annals_thoracic_surgery.png",
"img/journals/circ_interventions.png",
"img/journals/seminars_tcv_surgery.png",

// === Cardiologie
"img/journals/circulation.png",
  "img/journals/ehj.png",
"img/journals/jacc.png",
"img/journals/nature_reviews_cardiology.png",
"img/journals/jama_cardiology.png",

// === Infectiologie
"img/journals/laninf.png",
"img/journals/cid.png",
"img/journals/nature_reviews_microbiology.png",
"img/journals/eid.png",
"img/journals/journal_of_infection.png",


  // Files
  "./files/Infections des prothèses vasculaires.pdf",
"./files/Antibiothérapies des amputations de membre.pdf",
"./files/Protocole DLE.pdf",
"./files/Mémo DLE.pdf",
"./files/Protocole fibrinolyse in situ.pdf",
"./files/Mémo fibrinolyse in situ.pdf",
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
