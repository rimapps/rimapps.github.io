// Per-app privacy policy: privacy.html?app=Gold%20Identifier
(function () {
  var params = new URLSearchParams(location.search);
  var app = (params.get('app') || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  if (!app) return;

  var de = document.documentElement.lang === 'de';
  var q = '?app=' + encodeURIComponent(app);

  document.title = (de ? 'Datenschutzerklärung – ' : 'Privacy Policy – ') + app;

  var h1 = document.querySelector('main h1');
  if (h1) {
    h1.textContent = (de ? 'Datenschutzerklärung für „' : 'Privacy Policy for “') + app + (de ? '“' : '”');

    var box = document.createElement('div');
    box.className = 'card';
    var p = document.createElement('p');
    p.textContent = de
      ? 'Diese Datenschutzerklärung gilt für die iOS-App „' + app + '“ von RimApps sowie für diese Website. ' +
        'Abschnitte zu Funktionen, die „' + app + '“ nicht anbietet (z. B. KI-Erkennung oder In-App-Käufe), sind für diese App nicht relevant.'
      : 'This privacy policy applies to the iOS app “' + app + '” by RimApps and to this website. ' +
        'Sections about features that “' + app + '” does not offer (e.g. AI identification or in-app purchases) do not apply to this app.';
    box.appendChild(p);
    h1.insertAdjacentElement('afterend', box);
  }

  // Keep the app name when switching language
  document.querySelectorAll('a[href="privacy.html"], a[href="datenschutz.html"]').forEach(function (a) {
    a.setAttribute('href', a.getAttribute('href') + q);
  });
})();
