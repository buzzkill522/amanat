const root = document.documentElement, btn = document.getElementById('theme'), ico = document.getElementById('theme-ico')
  const SUN = '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
  const MOON = '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>'
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  function paint() {
    const dark = isDark()
    ico.innerHTML = dark ? SUN : MOON
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme')
  }
  btn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark'
    try { localStorage.setItem('amanat.theme', root.dataset.theme) } catch (e) {}
    paint()
  })
  // The level tiles are a real toggle group, so the choice reads to a screen reader too.
  document.querySelectorAll('.level').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.level').forEach(o => o.setAttribute('aria-pressed', String(o === b)))
  }))


  paint()
