// Ayaan Shaikh — portfolio interactions
(function () {
  // Cursor glow
  const glow = document.getElementById('glow');
  if (glow) {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
  }

  // Skill spotlight
  document.querySelectorAll('.skill').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Typewriter
  const typer = document.getElementById('typer');
  if (typer) {
    const words = ['web developer.', 'BCA student.', 'problem solver.', 'creative coder.', 'lifelong learner.'];
    let wi = 0, ci = 0, del = false;
    typer.textContent = '';
    (function tick() {
      const w = words[wi];
      typer.textContent = w.slice(0, ci);
      if (!del) {
        ci++;
        if (ci > w.length) { del = true; setTimeout(tick, 1600); return; }
      } else {
        ci--;
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, del ? 40 : 80);
    })();
  }

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Subtle parallax on aurora blobs
  const blobs = document.querySelectorAll('.blob');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    blobs.forEach((b, i) => {
      const f = (i + 1) * 0.5;
      b.style.translate = `${x * f}px ${y * f}px`;
    });
  });
})();
