// RimApps site script: language switch, spam-safe emails, per-app legal pages (?app=Name)
(function () {
  var d = document.documentElement;
  var params = new URLSearchParams(location.search);
  var app = (params.get('app') || '').split(' ').filter(Boolean).join(' ').slice(0, 60);

  var NOTE = {
    privacy: {
      de: 'Diese Datenschutzerklärung gilt für die iOS-App „%“ von RimApps sowie für diese Website. Abschnitte zu Funktionen, die „%“ nicht anbietet (z. B. KI-Erkennung oder In-App-Käufe), sind für diese App nicht relevant.',
      en: 'This privacy policy applies to the iOS app “%” by RimApps and to this website. Sections about features that “%” does not offer (e.g. AI identification or in-app purchases) do not apply to this app.'
    },
    terms: {
      de: 'Diese Nutzungsbedingungen gelten für die iOS-App „%“ von RimApps. Abschnitte zu Funktionen, die „%“ nicht anbietet (z. B. KI-Erkennung oder Abonnements), sind für diese App nicht relevant.',
      en: 'These terms apply to the iOS app “%” by RimApps. Sections about features that “%” does not offer (e.g. AI identification or subscriptions) do not apply to this app.'
    }
  };

  function setTitle() {
    var h = document.querySelector('h1[data-lang="' + d.lang + '"]');
    if (h) document.title = h.textContent.split('  ').join(' ').trim() + ' – RimApps';
  }

  function setLang(l) {
    d.lang = l === 'de' ? 'de' : 'en';
    try { sessionStorage.setItem('lang', d.lang); } catch (e) {}
    if (params.has('lang')) {
      params.set('lang', d.lang);
      try { history.replaceState(null, '', location.pathname + '?' + params.toString() + location.hash); } catch (e) {}
    }
    setTitle();
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Emails are assembled here so simple spam bots don't find them
    document.querySelectorAll('a.em[data-u][data-d]').forEach(function (a) {
      var e = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
      var s = a.getAttribute('data-s');
      a.href = 'mailto:' + e + (s ? '?subject=' + encodeURIComponent(s) : '');
      a.textContent = e;
    });

    var kind = document.body.getAttribute('data-kind');
    if (app && NOTE[kind]) {
      document.querySelectorAll('h1[data-lang]').forEach(function (h) {
        var de = h.getAttribute('data-lang') === 'de';
        var s = document.createElement('span');
        s.className = 'block bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent';
        s.textContent = de ? 'für „' + app + '“' : 'for “' + app + '”';
        h.appendChild(document.createTextNode(' '));
        h.appendChild(s);
      });
      var note = document.getElementById('app-note');
      if (note) {
        ['de', 'en'].forEach(function (l) {
          var p = document.createElement('p');
          p.setAttribute('data-lang', l);
          p.textContent = NOTE[kind][l].split('%').join(app);
          note.appendChild(p);
        });
        note.className = 'mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm leading-relaxed text-violet-900 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-200';
        note.hidden = false;
      }
      document.querySelectorAll('a[href="privacy.html"], a[href="terms.html"]').forEach(function (a) {
        a.setAttribute('href', a.getAttribute('href') + '?app=' + encodeURIComponent(app));
      });
    }

    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang')); });
    });
    setTitle();
  });
})();
