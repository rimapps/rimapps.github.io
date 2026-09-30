// Per-app legal pages: privacy.html?app=Gold%20Identifier, terms.html?app=..., etc.
// Email addresses are assembled in the browser so simple spam bots don't find them
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a.em[data-u][data-d]').forEach(function (a) {
    var e = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
    var s = a.getAttribute('data-s');
    a.href = 'mailto:' + e + (s ? '?subject=' + encodeURIComponent(s) : '');
    a.textContent = e;
  });
});

(function () {
  var params = new URLSearchParams(location.search);
  var app = (params.get('app') || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  if (!app) return;

  var de = document.documentElement.lang === 'de';
  var kind = document.body.getAttribute('data-kind') || 'privacy';
  var q = '?app=' + encodeURIComponent(app);

  var T = {
    privacy: {
      de: ['Datenschutzerklärung', 'Diese Datenschutzerklärung gilt für die iOS-App „%“ von RimApps sowie für diese Website. Abschnitte zu Funktionen, die „%“ nicht anbietet (z. B. KI-Erkennung oder In-App-Käufe), sind für diese App nicht relevant.'],
      en: ['Privacy Policy', 'This privacy policy applies to the iOS app “%” by RimApps and to this website. Sections about features that “%” does not offer (e.g. AI identification or in-app purchases) do not apply to this app.']
    },
    terms: {
      de: ['Nutzungsbedingungen', 'Diese Nutzungsbedingungen gelten für die iOS-App „%“ von RimApps. Abschnitte zu Funktionen, die „%“ nicht anbietet (z. B. KI-Erkennung oder Abonnements), sind für diese App nicht relevant.'],
      en: ['Terms of Use', 'These terms apply to the iOS app “%” by RimApps. Sections about features that “%” does not offer (e.g. AI identification or subscriptions) do not apply to this app.']
    }
  };
  var t = (T[kind] || T.privacy)[de ? 'de' : 'en'];
  var quoted = de ? '„' + app + '“' : '“' + app + '”';

  document.title = t[0] + ' – ' + app;

  var h1 = document.querySelector('main h1');
  if (h1) {
    h1.textContent = t[0] + (de ? ' für ' : ' for ') + quoted;
    var box = document.createElement('div');
    box.className = 'card';
    var p = document.createElement('p');
    p.textContent = t[1].split('%').join(app);
    box.appendChild(p);
    h1.insertAdjacentElement('afterend', box);
  }

  // Keep the app name on links between the legal pages
  var keep = ['privacy.html', 'datenschutz.html', 'terms.html', 'nutzungsbedingungen.html'];
  document.querySelectorAll('a[href]').forEach(function (a) {
    if (keep.indexOf(a.getAttribute('href')) !== -1) a.setAttribute('href', a.getAttribute('href') + q);
  });
})();
