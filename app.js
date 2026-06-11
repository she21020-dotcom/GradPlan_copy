/* GradPlan — interactive plan & catalog */

const PENCIL_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>';

let nextCourseId = 1;
function uid() {
  return `c-${nextCourseId++}`;
}

function course(name, code, credits, status, variableCredit = false) {
  return { id: uid(), name, code, credits, status, variableCredit };
}

const CATALOG = {
  general: {
    subtabs: [
      { id: 'foundations', label: 'Foundations' },
      { id: 'arts', label: 'Arts & Humanities' },
      { id: 'science', label: 'Science & Quantitative' },
    ],
    courses: [
      { name: 'Intro To Film Art And Analysis', code: 'TA 117', credits: 3, category: 'arts' },
      { name: 'World History', code: 'HIST 101', credits: 3, category: 'foundations' },
      { name: 'American Government', code: 'POLSC 110', credits: 3, category: 'foundations' },
      { name: 'General Biology', code: 'BIO 100', credits: 3, category: 'science' },
      { name: 'Principles Of Microeconomics', code: 'ECON 110', credits: 3, category: 'foundations' },
      { name: 'Introduction To Psychology', code: 'PSYCH 111', credits: 3, category: 'foundations' },
      { name: 'Public Speaking', code: 'COMM 101', credits: 3, category: 'arts' },
      { name: 'Precalculus', code: 'MATH 109', credits: 3, category: 'science' },
      { name: 'Calculus I', code: 'MATH 112X', credits: 4, category: 'science' },
    ],
  },
  degree: {
    subtabs: [
      { id: 'cornerstone', label: 'Cornerstone Requirement' },
      { id: 'eternal-truths', label: 'Eternal Truths' },
      { id: 'first-semester', label: 'First Semester' },
      { id: 'book-of-mormon', label: 'Book of Mormon' },
    ],
    courses: [
      { name: 'The Eternal Family', code: 'REL 200C', credits: 2, category: 'cornerstone' },
      { name: 'Jesus Christ And The Everlasting Gospel', code: 'REL 250C', credits: 2, category: 'cornerstone' },
      { name: 'Foundations Of The Restoration', code: 'REL 225C', credits: 2, category: 'cornerstone' },
      { name: 'New Testament', code: 'REL 211', credits: 2, category: 'cornerstone' },
      { name: 'Teachings Of Book Of Mormon', code: 'REL 121C', credits: 2, category: 'book-of-mormon' },
      { name: 'Computer Systems', code: 'ECEN 106', credits: 3, category: 'first-semester' },
      { name: 'Applied Programming', code: 'CSE 110', credits: 3, category: 'first-semester' },
      { name: 'Programming W/Data Struct', code: 'CSE 111', credits: 3, category: 'first-semester' },
      { name: 'Algorithm Design', code: 'CSE 220', credits: 3, category: 'first-semester' },
      { name: 'Dynamic Web Fundamentals', code: 'WDD 130', credits: 2, category: 'first-semester' },
      { name: 'Doctrines Of The Gospel', code: 'REL 130C', credits: 2, category: 'eternal-truths' },
      { name: 'Special Topics', code: 'CSE 397R', credits: 3, category: 'first-semester', variableCredit: true },
    ],
  },
  electives: {
    subtabs: [
      { id: 'major', label: 'Major Electives' },
      { id: 'free', label: 'Free Electives' },
    ],
    courses: [
      { name: 'Software Engineering', code: 'CSE 310', credits: 3, category: 'major' },
      { name: 'Operating Systems', code: 'CSE 320', credits: 3, category: 'major' },
      { name: 'Database Systems', code: 'CSE 330', credits: 3, category: 'major' },
      { name: 'Machine Learning', code: 'CSE 450', credits: 3, category: 'major' },
      { name: 'Mobile App Development', code: 'CSE 340', credits: 3, category: 'major' },
      { name: 'Intro To Entrepreneurship', code: 'B 250', credits: 3, category: 'free' },
      { name: 'Personal Finance', code: 'B 201', credits: 3, category: 'free' },
      { name: 'Creative Writing', code: 'ENGL 215', credits: 3, category: 'free' },
      { name: 'Photography I', code: 'ART 130', credits: 3, category: 'free' },
    ],
  },
};

function emptySemesters(year, track = 'ON-TRACK') {
  return [
    { id: `${year}-winter`, name: `Winter ${year}`, track, lock: 'open', courses: [] },
    { id: `${year}-spring`, name: `Spring ${year}`, track: track === 'ON-TRACK' ? 'FLEX TRACK' : track, lock: 'open', courses: [] },
    { id: `${year}-fall`, name: `Fall ${year}`, track: 'ON-TRACK', lock: 'open', courses: [] },
  ];
}

const state = {
  activeTab: 'degree',
  activeSubtab: 'cornerstone',
  searchQuery: '',
  expandedYears: { '2026': true },
  unplannedCredits: 3,
  years: [
    {
      id: 'transfer',
      label: 'Transferred Credits',
      meta: '(0 Credits)',
      type: 'transfer',
      semesters: [],
    },
    { id: '2024', label: 'Year 2024', semesters: emptySemesters(2024) },
    { id: '2025', label: 'Year 2025', semesters: emptySemesters(2025) },
    {
      id: '2026',
      label: 'Year 2026',
      badge: '(Current)',
      semesters: [
        {
          id: '2026-winter',
          name: 'Winter 2026',
          track: 'ON-TRACK',
          lock: 'completed',
          courses: [
            course('The Eternal Family', 'REL 200C', 2, 'completed'),
            course('Computer Systems', 'ECEN 106', 3, 'completed'),
            course('Applied Programming', 'CSE 110', 3, 'completed'),
            course('Algorithm Design', 'CSE 220', 3, 'completed'),
            course('Special Topics', 'CSE 397R', 1, 'completed', true),
            course('Special Topics', 'CSE 397R', 1, 'completed', true),
          ],
        },
        {
          id: '2026-spring',
          name: 'Spring 2026',
          track: 'FLEX TRACK',
          lock: 'in-progress',
          courses: [
            course('New Testament', 'REL 211', 2, 'in-progress'),
            course('Programming W/Data Struct', 'CSE 111', 3, 'in-progress'),
            course('Special Topics', 'CSE 397R', 3, 'in-progress', true),
            course('Precalculus', 'MATH 109', 3, 'in-progress'),
          ],
        },
        {
          id: '2026-fall',
          name: 'Fall 2026',
          track: 'ON-TRACK',
          lock: 'open',
          courses: [
            course('Intro To Film Art And Analysis', 'TA 117', 3, 'planned'),
            course('Dynamic Web Fundamentals', 'WDD 130', 2, 'planned'),
            course('Calculus I', 'MATH 112X', 4, 'planned'),
            course('New Testament', 'REL 211', 2, 'planned'),
          ],
        },
      ],
    },
    { id: '2027', label: 'Year 2027', semesters: emptySemesters(2027) },
    { id: '2028', label: 'Year 2028', semesters: emptySemesters(2028) },
  ],
};

let dragPayload = null;

/* ── Data helpers ── */

function allSemesters() {
  return state.years.flatMap((y) => y.semesters || []);
}

function findSemester(semesterId) {
  return allSemesters().find((s) => s.id === semesterId) || null;
}

function findCourse(courseId) {
  for (const sem of allSemesters()) {
    const idx = sem.courses.findIndex((c) => c.id === courseId);
    if (idx !== -1) return { semester: sem, course: sem.courses[idx], index: idx };
  }
  return null;
}

function removeCourse(courseId) {
  const found = findCourse(courseId);
  if (found) found.semester.courses.splice(found.index, 1);
}

function semesterCredits(semester) {
  return semester.courses.reduce((sum, c) => sum + c.credits, 0);
}

function creditTotals() {
  let completed = 0;
  let inProgress = 0;
  let planned = 0;
  for (const sem of allSemesters()) {
    for (const c of sem.courses) {
      if (c.status === 'completed') completed += c.credits;
      else if (c.status === 'in-progress') inProgress += c.credits;
      else if (c.status === 'planned') planned += c.credits;
    }
  }
  const unplanned = state.unplannedCredits;
  const total = completed + inProgress + planned + unplanned;
  return { completed, inProgress, planned, unplanned, total };
}

function semesterAcceptsDrop(semester) {
  return semester.lock === 'open';
}

function isDraggable(course) {
  return course.status === 'planned';
}

function filteredCatalog() {
  const section = CATALOG[state.activeTab];
  if (!section) return [];
  let list = section.courses.filter((c) => c.category === state.activeSubtab);
  const q = state.searchQuery.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }
  return list;
}

/* ── Render ── */

function renderSummary() {
  const t = creditTotals();
  document.getElementById('summary-bar').innerHTML = `
    <div class="summary-stats">
      <div class="stat"><span class="stat-label">Completed</span><span class="stat-value stat-completed">${t.completed}</span></div>
      <div class="stat"><span class="stat-label">In-Progress</span><span class="stat-value stat-in-progress">${t.inProgress}</span></div>
      <div class="stat"><span class="stat-label">Planned</span><span class="stat-value stat-planned">${t.planned}</span></div>
      <div class="stat"><span class="stat-label">Unplanned</span><span class="stat-value stat-unplanned">${t.unplanned}</span></div>
      <div class="stat stat-total"><span class="stat-label">Total</span><span class="stat-value">${t.total}</span></div>
    </div>
    <button class="btn-details" type="button" aria-expanded="false">
      SEE DETAILS <span class="chevron">&#9662;</span>
    </button>`;
}

function renderCourseCard(c, semesterId) {
  const drag = isDraggable(c);
  const varTag = c.variableCredit ? '<span class="variable-tag">VARIABLE CREDIT</span>' : '';
  return `
    <article class="course-card status-${c.status}${drag ? ' is-draggable' : ''}"
      ${drag ? `draggable="true" data-course-id="${c.id}" data-semester-id="${semesterId}"` : ''}>
      <div class="course-edit-wrap">
        <button class="course-edit" type="button" aria-label="Edit course" tabindex="-1">${PENCIL_SVG}</button>
      </div>
      <div class="course-body">
        <div class="course-row">
          <span class="course-name">${esc(c.name)}</span>
          <span class="course-credits">${c.credits}</span>
        </div>
        <span class="course-code">${esc(c.code)}</span>
        ${varTag}
      </div>
    </article>`;
}

function renderSemester(sem) {
  const canDrop = semesterAcceptsDrop(sem);
  const cards = sem.courses.map((c) => renderCourseCard(c, sem.id)).join('');
  const emptyHint = sem.courses.length === 0 && canDrop
    ? '<p class="semester-empty-hint">Drop planned courses here</p>'
    : '';
  return `
    <div class="semester-col" data-semester-id="${sem.id}">
      <div class="semester-header">
        <h3>${esc(sem.name)}</h3>
        <span class="track-badge ${sem.track === 'FLEX TRACK' ? 'flex-track' : 'on-track'}">${esc(sem.track)}</span>
      </div>
      <div class="course-list${canDrop ? ' drop-target' : ' drop-locked'}" data-semester-id="${sem.id}">
        ${cards}${emptyHint}
      </div>
      <p class="semester-total">Total Credits: <strong>${semesterCredits(sem)}</strong></p>
    </div>`;
}

function renderYear(year) {
  const expanded = !!state.expandedYears[year.id];
  const chevron = expanded ? '\u25BC' : '\u25B6';
  const badge = year.badge ? `<span class="year-badge">${esc(year.badge)}</span>` : '';
  const meta = year.meta ? `<span class="year-meta">${esc(year.meta)}</span>` : '';
  const viewLink =
    year.type !== 'transfer'
      ? '<a href="#" class="view-semester link" data-action="view-semester">View Single Semester</a>'
      : '';

  let content = '';
  if (year.semesters && year.semesters.length) {
    content = `<div class="semesters-row">${year.semesters.map(renderSemester).join('')}</div>`;
  }

  return `
    <section class="year-section ${expanded ? 'expanded' : 'collapsed'}" data-year-id="${year.id}">
      <button class="year-toggle" type="button" aria-expanded="${expanded}">
        <span class="chevron">${chevron}</span>
        <span class="year-title">${esc(year.label)}</span>
        ${badge}${meta}
        ${viewLink}
      </button>
      <div class="year-content">${content}</div>
    </section>`;
}

function renderPlan() {
  document.getElementById('plan-years').innerHTML = state.years.map(renderYear).join('');
  bindPlanEvents();
}

function renderTabs() {
  const tabs = [
    { id: 'general', label: 'General Edu...' },
    { id: 'degree', label: 'Degree' },
    { id: 'electives', label: 'Electives' },
  ];
  document.getElementById('req-tabs').innerHTML = tabs
    .map(
      (t) =>
        `<button class="req-tab${state.activeTab === t.id ? ' active' : ''}" role="tab"
          aria-selected="${state.activeTab === t.id}" data-tab="${t.id}">${t.label}</button>`
    )
    .join('');

  const section = CATALOG[state.activeTab];
  const subtabs = section.subtabs;
  if (!subtabs.find((s) => s.id === state.activeSubtab)) {
    state.activeSubtab = subtabs[0].id;
  }
  document.getElementById('req-subtabs').innerHTML = subtabs
    .map(
      (s) =>
        `<button class="req-subtab${state.activeSubtab === s.id ? ' active' : ''}" role="tab"
          aria-selected="${state.activeSubtab === s.id}" data-subtab="${s.id}">${esc(s.label)}</button>`
    )
    .join('');
}

function renderCatalogItem(c, index) {
  return `
    <div class="catalog-course" draggable="true"
      data-source="catalog"
      data-name="${esc(c.name)}"
      data-code="${esc(c.code)}"
      data-credits="${c.credits}"
      data-variable="${c.variableCredit ? '1' : '0'}">
      <div class="catalog-course-body">
        <span class="catalog-course-name">${esc(c.name)}</span>
        <span class="catalog-course-code">${esc(c.code)}</span>
      </div>
      <span class="catalog-course-credits">${c.credits}</span>
    </div>`;
}

function renderCatalog() {
  const courses = filteredCatalog();
  const list = document.getElementById('catalog-list');
  if (courses.length === 0) {
    list.innerHTML = '<p class="catalog-empty">No courses match this filter.</p>';
  } else {
    list.innerHTML = courses.map(renderCatalogItem).join('');
  }
  bindCatalogDrag();
}

function renderAll() {
  renderSummary();
  renderPlan();
  renderTabs();
  renderCatalog();
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Drag and drop ── */

function setDragPayload(data) {
  dragPayload = data;
}

function clearDragPayload() {
  dragPayload = null;
}

function bindPlanEvents() {
  document.querySelectorAll('.year-toggle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.closest('[data-action="view-semester"]')) return;
      const yearId = btn.closest('.year-section').dataset.yearId;
      state.expandedYears[yearId] = !state.expandedYears[yearId];
      renderPlan();
      renderSummary();
    });
  });

  document.querySelectorAll('.course-card.is-draggable').forEach((el) => {
    el.addEventListener('dragstart', (e) => {
      setDragPayload({
        source: 'plan',
        courseId: el.dataset.courseId,
        semesterId: el.dataset.semesterId,
      });
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', el.dataset.courseId);
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      clearDragPayload();
      clearDropHighlights();
    });
  });

  document.querySelectorAll('.course-list.drop-target').forEach((zone) => {
    zone.addEventListener('dragover', (e) => {
      if (!dragPayload) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = dragPayload.source === 'catalog' ? 'copy' : 'move';
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', (e) => {
      if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      handleDropOnSemester(zone.dataset.semesterId);
    });
  });
}

function bindCatalogDrag() {
  document.querySelectorAll('.catalog-course').forEach((el) => {
    el.addEventListener('dragstart', (e) => {
      setDragPayload({
        source: 'catalog',
        name: el.dataset.name,
        code: el.dataset.code,
        credits: parseInt(el.dataset.credits, 10),
        variableCredit: el.dataset.variable === '1',
      });
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('text/plain', el.dataset.code);
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging');
      clearDragPayload();
      clearDropHighlights();
    });
  });
}

function bindCatalogDropZone() {
  const zone = document.getElementById('catalog-drop-zone');
  zone.addEventListener('dragover', (e) => {
    if (!dragPayload || dragPayload.source !== 'plan') return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    zone.classList.add('drag-over');
  });
  zone.addEventListener('dragleave', (e) => {
    if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
  });
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    if (dragPayload?.source === 'plan') {
      removeCourse(dragPayload.courseId);
      clearDragPayload();
      renderAll();
    }
  });
}

function clearDropHighlights() {
  document.querySelectorAll('.drag-over').forEach((el) => el.classList.remove('drag-over'));
}

function handleDropOnSemester(targetSemesterId) {
  const target = findSemester(targetSemesterId);
  if (!target || !semesterAcceptsDrop(target) || !dragPayload) return;

  if (dragPayload.source === 'catalog') {
    const newCourse = course(
      dragPayload.name,
      dragPayload.code,
      dragPayload.credits,
      'planned',
      dragPayload.variableCredit
    );
    target.courses.push(newCourse);
  } else if (dragPayload.source === 'plan') {
    if (dragPayload.semesterId === targetSemesterId) return;
    const found = findCourse(dragPayload.courseId);
    if (!found || !isDraggable(found.course)) return;
    found.semester.courses.splice(found.index, 1);
    target.courses.push(found.course);
  }

  clearDragPayload();
  renderAll();
}

function bindSidebarEvents() {
  document.getElementById('req-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (!tab) return;
    state.activeTab = tab.dataset.tab;
    state.activeSubtab = CATALOG[state.activeTab].subtabs[0].id;
    renderTabs();
    renderCatalog();
  });

  document.getElementById('req-subtabs').addEventListener('click', (e) => {
    const tab = e.target.closest('[data-subtab]');
    if (!tab) return;
    state.activeSubtab = tab.dataset.subtab;
    renderTabs();
    renderCatalog();
  });

  document.getElementById('catalog-search').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  });

  bindCatalogDropZone();
}

/* ── Init ── */

renderAll();
bindSidebarEvents();
