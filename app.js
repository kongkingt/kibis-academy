(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const qEl = document.getElementById('captcha-question');
  const aEl = document.getElementById('captcha-answer');
  const statusEl = document.getElementById('form-status');
  const hp = document.getElementById('website');

  let a = 0;
  let b = 0;

  function nextCaptcha() {
    a = Math.floor(Math.random() * 8) + 2;
    b = Math.floor(Math.random() * 8) + 2;
    qEl.textContent = `${a} + ${b} = ?`;
    aEl.value = '';
  }

  nextCaptcha();

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    statusEl.className = 'form-status';

    if (hp && hp.value.trim() !== '') {
      statusEl.textContent = 'Bericht geblokkeerd.';
      statusEl.classList.add('err');
      nextCaptcha();
      return;
    }

    const ans = Number(aEl.value);
    if (!Number.isFinite(ans) || ans !== a + b) {
      statusEl.textContent = 'Captcha fout. Probeer opnieuw.';
      statusEl.classList.add('err');
      nextCaptcha();
      return;
    }

    if (!form.checkValidity()) {
      statusEl.textContent = 'Vul alle verplichte velden in.';
      statusEl.classList.add('err');
      nextCaptcha();
      return;
    }

    statusEl.textContent = 'Bedankt. Bericht lokaal gevalideerd (demo).';
    statusEl.classList.add('ok');
    form.reset();
    nextCaptcha();
  });
})();
