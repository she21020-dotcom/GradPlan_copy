// Year accordion toggles
document.querySelectorAll('.year-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const section = toggle.closest('.year-section');
    const isExpanded = section.classList.contains('expanded');

    section.classList.toggle('expanded', !isExpanded);
    section.classList.toggle('collapsed', isExpanded);
    toggle.setAttribute('aria-expanded', String(!isExpanded));

    const chevron = toggle.querySelector('.chevron');
    if (chevron) {
      chevron.textContent = isExpanded ? '\u25B6' : '\u25BC';
    }
  });
});

// Requirement tabs
document.querySelectorAll('.req-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.req-tab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  });
});

// Requirement sub-tabs
document.querySelectorAll('.req-subtab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.req-subtab').forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
  });
});
