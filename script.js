/* ============================================================
   SCRIPT.JS — Portfolio Rendering Engine
   Reads from portfolioData (data.js) and populates the page.
   ============================================================ */

'use strict';

// ============================================================
// HELPERS & SECURITY
// ============================================================

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  const d = document.createElement('div');
  d.appendChild(document.createTextNode(str));
  return d.innerHTML;
}

function el(tag, className, textContent) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (textContent !== undefined && textContent !== null) node.textContent = textContent;
  return node;
}

function safeURL(url) {
  if (!url || typeof url !== 'string') return null;
  let t = url.trim();
  if (t.startsWith('www.')) t = 'https://' + t;
  if (t.startsWith('https://') || t.startsWith('http://') || t.startsWith('mailto:') || t.startsWith('assets/')) return t;
  return null;
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================================
// DATA VALIDATION
// ============================================================
function validatePortfolioData(data) {
  const w = [];
  if (!data)                                w.push('portfolioData missing');
  if (!data?.profile?.name)                 w.push('profile.name missing');
  if (!Array.isArray(data?.projects))       w.push('projects must be array');
  if (!Array.isArray(data?.skills))         w.push('skills must be array');
  if (!Array.isArray(data?.certifications)) w.push('certifications must be array');
  const ids = new Set();
  (data?.projects || []).forEach((p, i) => {
    if (!p.id)    w.push(`Project[${i}] missing id`);
    if (!p.title) w.push(`Project[${i}] missing title`);
    if (ids.has(p.id)) w.push(`Duplicate project id: ${p.id}`);
    ids.add(p.id);
    const valid = ['completed', 'in-progress', 'planned'];
    if (p.status && !valid.includes(p.status)) w.push(`Project "${p.id}" unknown status: ${p.status}`);
    if (p.pipeline && !Array.isArray(p.pipeline?.stages))     w.push(`Project "${p.id}" pipeline.stages not array`);
    if (p.deployment && !Array.isArray(p.deployment?.stages)) w.push(`Project "${p.id}" deployment.stages not array`);
  });
  if (w.length) console.warn('[Portfolio] Validation:\n  ' + w.join('\n  '));
}

// ============================================================
// INLINE SVG ICONS
// ============================================================
const ICONS = {
  github:   '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  email:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  resume:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  chevron:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="6,9 12,15 18,9"/></svg>',
  cloud:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>',
  docker:   '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.186.186 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>',
  cicd:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><polyline points="16,3 21,3 21,8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21,16 21,21 16,21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>',
  linux:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  iac:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><path d="M3 17l2 2 4-4"/></svg>',
  gitops:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>',
  gitBranch:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>',
  diagram:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8" y="14" width="7" height="7" rx="1"/><line x1="10" y1="10" x2="11" y2="14"/><line x1="14" y1="10" x2="12" y2="14"/></svg>',
  copy:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  arrowUp:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5,12 12,5 19,12"/></svg>'
};
function getIcon(name) { return ICONS[name] || ''; }

// ============================================================
// SEO META
// ============================================================
function renderSEOMeta(meta, social) {
  if (!meta) return;
  document.title = meta.siteTitle || 'Jenish Chhowala — DevOps & Cloud Engineer';
  function setMeta(name, content, prop) {
    if (!content) return;
    const q = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    const tag = document.querySelector(q) || document.createElement('meta');
    if (prop) tag.setAttribute('property', name); else tag.setAttribute('name', name);
    tag.setAttribute('content', content);
    if (!tag.parentNode) document.head.appendChild(tag);
  }
  setMeta('description', meta.description);
  setMeta('author',      meta.author);
  setMeta('theme-color', '#08080e');
  setMeta('og:title',       meta.siteTitle,   true);
  setMeta('og:description', meta.description, true);
  setMeta('og:type',        'website',         true);
  if (meta.canonicalUrl) setMeta('og:url',   meta.canonicalUrl, true);
  if (meta.ogImage)      setMeta('og:image', meta.ogImage,      true);
  setMeta('twitter:card',        'summary');
  setMeta('twitter:title',       meta.siteTitle);
  setMeta('twitter:description', meta.description);
  if (meta.twitterHandle) setMeta('twitter:creator', meta.twitterHandle);
  if (meta.canonicalUrl) {
    const tag = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    tag.rel = 'canonical'; tag.href = meta.canonicalUrl;
    if (!tag.parentNode) document.head.appendChild(tag);
  }
  const ld = document.createElement('script');
  ld.type = 'application/ld+json';
  const schema = { "@context": "https://schema.org", "@type": "Person",
    "name": meta.author || 'Jenish Chhowala', "jobTitle": "DevOps & Cloud Engineer" };
  if (meta.canonicalUrl) schema["url"] = meta.canonicalUrl;
  if (social?.github && safeURL(social.github)) schema["sameAs"] = [social.github];
  ld.textContent = JSON.stringify(schema);
  document.head.appendChild(ld);
}

// ============================================================
// PROFILE / ABOUT / HERO
// ============================================================
function renderProfile(profile, social) {
  if (!profile) return;
  const taglineEl = document.getElementById('heroTagline');
  if (taglineEl) taglineEl.textContent = profile.tagline || '';

  const aboutText = document.getElementById('aboutText');
  if (aboutText && Array.isArray(profile.about)) {
    aboutText.innerHTML = '';
    const frag = document.createDocumentFragment();
    profile.about.forEach(para => frag.appendChild(el('p', '', para)));
    aboutText.appendChild(frag);
  }

  const focusEl = document.getElementById('focusAreas');
  if (focusEl && Array.isArray(profile.focusAreas)) {
    focusEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    profile.focusAreas.forEach(area => {
      const card = el('div', 'focus-card');
      const iw = el('div', 'focus-card-icon');
      iw.innerHTML = getIcon(area.icon);
      iw.setAttribute('aria-hidden', 'true');
      card.appendChild(iw);
      card.appendChild(el('span', 'focus-card-label',  area.label));
      card.appendChild(el('span', 'focus-card-detail', area.detail));
      frag.appendChild(card);
    });
    focusEl.appendChild(frag);
  }

  const ghBtn = document.getElementById('githubHeroBtn');
  const liBtn = document.getElementById('linkedinHeroBtn');
  if (ghBtn && social?.github) {
    const u = safeURL(social.github);
    if (u) ghBtn.href = u;
  }
  if (liBtn && social?.linkedin) {
    const u = safeURL(social.linkedin);
    if (u) liBtn.href = u;
  }

  const commitHashEl = document.getElementById('heroCommitHash');
  const commitMsgEl  = document.getElementById('heroCommitMsg');
  if (profile?.latestCommit) {
    if (commitHashEl) commitHashEl.textContent = profile.latestCommit.hash || 'main';
    if (commitMsgEl)  commitMsgEl.textContent = profile.latestCommit.message || '';
  }

  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// SKILLS
// ============================================================
function renderSkillCategory(cat) {
  const wrapper = el('div', 'skill-category');
  const header  = el('div', 'skill-category-header');
  const iw = el('div', 'skill-category-icon');
  iw.innerHTML = getIcon(cat.icon);
  iw.setAttribute('aria-hidden', 'true');
  header.appendChild(iw);
  header.appendChild(el('h3', '', cat.label));
  wrapper.appendChild(header);

  const tags = el('div', 'skill-tags');
  (cat.tags || []).forEach(tag => {
    const cls = 'skill-tag' + (tag.featured ? ' skill-tag--featured' : '') + (tag.status === 'learning' ? ' skill-tag--learning' : '');
    const span = el('span', cls, tag.name);
    if (tag.status === 'learning') span.appendChild(el('span', 'skill-badge-learning', 'Learning'));
    tags.appendChild(span);
  });
  wrapper.appendChild(tags);
  return wrapper;
}

function renderSkills(skills) {
  const grid = document.getElementById('skillsGrid');
  if (!grid || !Array.isArray(skills)) return;
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  skills.forEach(cat => {
    try { frag.appendChild(renderSkillCategory(cat)); }
    catch(e) { console.warn('[Portfolio] Skill error:', cat?.id, e); }
  });
  grid.appendChild(frag);
}

// ============================================================
// PIPELINE
// ============================================================
function renderPipelineStage(stage) {
  const wrap = el('div', `pipeline-stage pipeline-stage--${stage.status || 'completed'}`);
  const conn = el('div', 'pipeline-stage-connector');
  conn.appendChild(el('div', 'pipeline-stage-dot'));
  conn.appendChild(el('div', 'pipeline-stage-line'));
  const body = el('div', 'pipeline-stage-body');
  body.appendChild(el('div', 'pipeline-stage-label', stage.label));
  body.appendChild(el('div', 'pipeline-stage-desc',  stage.description || ''));
  wrap.appendChild(conn);
  wrap.appendChild(body);
  return wrap;
}

function renderPipeline(data) {
  if (!data || !Array.isArray(data.stages) || !data.stages.length) return null;
  const sec = el('div', 'pipeline-section');
  sec.appendChild(el('div', 'pipeline-section-title', data.label || 'CI Pipeline'));
  const flow = el('div', 'pipeline-flow');
  data.stages.forEach(s => flow.appendChild(renderPipelineStage(s)));
  sec.appendChild(flow);
  return sec;
}

function renderDeploymentFlow(data) {
  if (!data || !Array.isArray(data.stages) || !data.stages.length) return null;
  const sec = el('div', 'pipeline-section');
  sec.appendChild(el('div', 'pipeline-section-title', data.label || 'Deployment Flow'));
  const flow = el('div', 'deployment-flow');
  data.stages.forEach((stage, i) => {
    const sw = el('div', 'deployment-stage');
    const box = el('div', 'deployment-stage-box');
    box.setAttribute('title', stage.description || '');
    box.appendChild(el('span', 'deployment-stage-label', stage.label));
    box.appendChild(el('span', 'deployment-stage-desc',  stage.description || ''));
    sw.appendChild(box);
    flow.appendChild(sw);
    if (i < data.stages.length - 1) {
      const arrow = el('div', 'deployment-arrow', '\u2193');
      arrow.setAttribute('aria-hidden', 'true');
      flow.appendChild(arrow);
    }
  });
  sec.appendChild(flow);
  return sec;
}

// ============================================================
// PROJECT CARD
// ============================================================
function statusLabel(s) {
  return { 'completed': 'Completed', 'in-progress': 'In Progress', 'planned': 'Planned' }[s] || s;
}

function renderProjectCard(project) {
  const card = el('div', 'project-card');
  card.dataset.projectId  = project.id;
  card.dataset.categories = JSON.stringify(project.category || []);

  const inner = el('div', 'project-card-inner');

  // Terminal dots
  const bar = el('div', 'terminal-bar');
  bar.setAttribute('aria-hidden', 'true');
  ['terminal-dot terminal-dot--red', 'terminal-dot terminal-dot--yellow', 'terminal-dot terminal-dot--green']
    .forEach(c => bar.appendChild(el('span', c)));
  inner.appendChild(bar);

  // Header
  const header = el('div', 'project-header');
  const headerLeft = el('div', 'project-header-left');
  headerLeft.appendChild(el('h3', 'project-title', project.title));

  // Badges row (branch + diagram + status)
  const badges = el('div', 'project-badges');
  // Git branch badge
  const branchBadge = el('span', 'project-branch-badge');
  branchBadge.innerHTML = getIcon('gitBranch') + ' main';
  badges.appendChild(branchBadge);
  // Diagram badge (only if architecture diagram exists)
  if (project.architectureDiagram) {
    const diagBadge = el('span', 'project-diagram-badge');
    diagBadge.innerHTML = getIcon('diagram') + ' diagram';
    badges.appendChild(diagBadge);
  }
  if (project.status) {
    badges.appendChild(el('span', `status-badge status-badge--${project.status}`, statusLabel(project.status)));
  }
  headerLeft.appendChild(badges);
  header.appendChild(headerLeft);
  inner.appendChild(header);

  if (project.shortDescription) {
    inner.appendChild(el('p', 'project-short-desc', project.shortDescription));
  }

  // Tech tags
  if (project.technologies?.length) {
    const tl = el('div', 'project-tech-list');
    project.technologies.slice(0, 8).forEach(t => tl.appendChild(el('span', 'project-tech-tag', t)));
    if (project.technologies.length > 8) {
      tl.appendChild(el('span', 'project-tech-tag', `+${project.technologies.length - 8} more`));
    }
    inner.appendChild(tl);
  }

  // Actions — always show GitHub button
  const actions = el('div', 'project-actions');
  const ghUrl = project.github && safeURL(project.github);
  const ghProfileUrl = typeof portfolioData !== 'undefined' && portfolioData.social?.github
    ? safeURL(portfolioData.social.github) : null;
  const finalGhUrl = ghUrl || ghProfileUrl;
  if (finalGhUrl) {
    const a = el('a', 'project-link-btn project-link-btn--github');
    a.href = finalGhUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', ghUrl ? `View ${project.title} on GitHub` : 'Visit GitHub profile');
    a.setAttribute('title', ghUrl ? 'View repository' : 'Visit GitHub profile');
    a.innerHTML = getIcon('github') + ' <span>GitHub</span>';
    actions.appendChild(a);
  }
  if (project.demo && safeURL(project.demo)) {
    const a = el('a', 'project-link-btn');
    a.href = safeURL(project.demo);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', `Live demo: ${project.title}`);
    a.innerHTML = getIcon('external') + ' <span>Live Demo</span>';
    actions.appendChild(a);
  }
  const toggle = el('button', 'project-link-btn project-link-btn--details');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', `details-${project.id}`);
  toggle.innerHTML = '<span class="details-label">View Details</span> ' + getIcon('chevron');
  actions.appendChild(toggle);
  inner.appendChild(actions);
  card.appendChild(inner);

  // Details panel
  const panel = el('div', 'project-details-panel');
  panel.id = `details-${project.id}`;
  panel.setAttribute('hidden', '');

  if (project.description) {
    panel.appendChild(el('p', 'project-full-desc', project.description));
  }
  if (project.notes) {
    panel.appendChild(el('div', 'project-notes', project.notes));
  }

  if (project.highlights?.length) {
    const hs = el('div', 'project-highlights');
    hs.appendChild(el('h4', '', 'Key Highlights'));
    const ul = el('ul', 'highlights-list');
    ul.setAttribute('role', 'list');
    project.highlights.forEach(h => ul.appendChild(el('li', '', h)));
    hs.appendChild(ul);
    panel.appendChild(hs);
  }

  if (project.architectureDiagram) {
    const ds = el('div', 'project-diagram');
    ds.appendChild(el('div', 'pipeline-section-title', 'Architecture Diagram'));
    const img = document.createElement('img');
    img.src = project.architectureDiagram;
    img.alt = `${project.title} architecture diagram`;
    img.loading = 'lazy';
    img.title = 'Click to enlarge architecture diagram';
    img.onerror = function() { this.parentElement.style.display = 'none'; };
    img.addEventListener('click', () => openLightbox(img.src, `${project.title} — Architecture Diagram`));
    ds.appendChild(img);
    ds.appendChild(el('p', 'project-diagram-label', 'Architecture overview (click to enlarge)'));
    panel.appendChild(ds);
  }

  if (project.screenshots?.length) {
    const ss = el('div', 'project-screenshots');
    ss.appendChild(el('div', 'pipeline-section-title', 'Screenshots'));
    project.screenshots.forEach((src, i) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${project.title} screenshot ${i + 1}`;
      img.loading = 'lazy';
      img.title = 'Click to enlarge screenshot';
      img.style.cssText = 'max-width:100%;border-radius:8px;margin-bottom:8px;display:block;cursor:zoom-in;';
      img.onerror = function() { this.style.display = 'none'; };
      img.addEventListener('click', () => openLightbox(src, `${project.title} — Screenshot ${i + 1}`));
      ss.appendChild(img);
    });
    panel.appendChild(ss);
  }

  if (project.pipeline) {
    const pe = renderPipeline(project.pipeline);
    if (pe) panel.appendChild(pe);
  }
  if (project.deployment) {
    const de = renderDeploymentFlow(project.deployment);
    if (de) panel.appendChild(de);
  }

  card.appendChild(panel);

  toggle.addEventListener('click', () => {
    const open = panel.classList.contains('open');
    panel.classList.toggle('open', !open);
    if (!open) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', String(!open));
    const lbl = toggle.querySelector('.details-label');
    if (lbl) lbl.textContent = open ? 'View Details' : 'Hide Details';
    const svg = toggle.querySelector('svg');
    if (svg) svg.style.transform = open ? '' : 'rotate(180deg)';
  });

  return card;
}

// ============================================================
// PROJECT FILTERS
// ============================================================
const CAT_LABELS = {
  'aws':'AWS', 'cloud':'Cloud', 'networking':'Networking', 'ci-cd':'CI/CD',
  'devops':'DevOps', 'docker':'Docker', 'security':'Security',
  'kubernetes':'Kubernetes', 'gitops':'GitOps', 'infrastructure-as-code':'IaC', 'linux':'Linux',
  'backend':'Backend', 'database':'Database', 'microservices':'Microservices'
};

function renderProjectFilters(projects) {
  const filtersEl = document.getElementById('projectFilters');
  if (!filtersEl) return;
  filtersEl.innerHTML = '';
  const counts = new Map();
  projects.forEach(p => (p.category || []).forEach(c => counts.set(c, (counts.get(c) || 0) + 1)));
  const frag = document.createDocumentFragment();
  const allBtn = el('button', 'filter-btn');
  allBtn.innerHTML = `All <span class="filter-count">${projects.length}</span>`;
  allBtn.setAttribute('aria-pressed', 'true');
  allBtn.dataset.filter = 'all';
  frag.appendChild(allBtn);
  counts.forEach((count, cat) => {
    const btn = el('button', 'filter-btn');
    btn.innerHTML = `${CAT_LABELS[cat] || cat} <span class="filter-count">${count}</span>`;
    btn.setAttribute('aria-pressed', 'false');
    btn.dataset.filter = cat;
    frag.appendChild(btn);
  });
  filtersEl.appendChild(frag);

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    const filter = btn.dataset.filter;
    filtersEl.querySelectorAll('.filter-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all') { card.classList.remove('hidden'); return; }
      const cats = JSON.parse(card.dataset.categories || '[]');
      card.classList.toggle('hidden', !cats.includes(filter));
    });
  });
}

function renderProjects(projects) {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !Array.isArray(projects)) return;
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  const sorted = [...projects.filter(p => p.featured), ...projects.filter(p => !p.featured)];
  sorted.forEach(p => {
    try { frag.appendChild(renderProjectCard(p)); }
    catch(e) { console.warn('[Portfolio] Project error:', p?.id, e); }
  });
  grid.appendChild(frag);
  renderProjectFilters(projects);
}

// ============================================================
// CERTIFICATIONS (conditional)
// ============================================================
function renderCertifications(certs) {
  const section = document.getElementById('certifications');
  const grid    = document.getElementById('certsGrid');
  const navItem = document.getElementById('certsNavItem');
  if (!certs?.length) {
    if (section) section.setAttribute('hidden', '');
    if (navItem) navItem.setAttribute('hidden', '');
    return;
  }
  if (section) section.removeAttribute('hidden');
  if (navItem) navItem.removeAttribute('hidden');
  if (!grid) return;
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  certs.forEach(cert => {
    const card = el('div', 'cert-card');
    const ico = el('span', 'cert-card-icon');
    ico.setAttribute('aria-hidden', 'true');
    ico.innerHTML = getIcon(cert.icon) || cert.icon || '';
    card.appendChild(ico);
    card.appendChild(el('div', 'cert-card-name',   cert.name));
    card.appendChild(el('div', 'cert-card-issuer', cert.issuer || ''));
    const url = cert.credentialUrl && safeURL(cert.credentialUrl);
    if (url) {
      const a = el('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', `View ${cert.name} credential`);
      a.appendChild(card);
      frag.appendChild(a);
    } else {
      frag.appendChild(card);
    }
  });
  grid.appendChild(frag);
}

// ============================================================
// CONTACT HUB
// ============================================================
function renderContactLinks(social) {
  if (!social) return;

  const emailText = document.getElementById('contactEmailDisplay');
  const mailBtn   = document.getElementById('contactDirectMailBtn');
  const copyBtn   = document.getElementById('contactCopyActionBtn');
  const ghCard    = document.getElementById('contactGhChannel');
  const liCard    = document.getElementById('contactLiChannel');

  if (social.email) {
    if (emailText) emailText.textContent = social.email;
    if (mailBtn)   mailBtn.href = `mailto:${social.email}`;
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(social.email).then(() => {
          copyBtn.classList.add('copied');
          const span = copyBtn.querySelector('span');
          if (span) span.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (span) span.textContent = 'Copy Email';
          }, 2000);
        }).catch(() => {});
      });
    }
  } else {
    const actionBox = document.querySelector('.contact-action-box');
    if (actionBox) actionBox.style.display = 'none';
  }

  if (social.github && ghCard) {
    const u = safeURL(social.github);
    if (u) ghCard.href = u;
  }
  if (social.linkedin && liCard) {
    const u = safeURL(social.linkedin);
    if (u) liCard.href = u;
  }
}

// ============================================================
// RESUME CHECK
// ============================================================
function initResumeCheck(resumePath) {
  const btn = document.getElementById('resumeBtn');
  if (!resumePath) {
    if (btn) btn.remove();
    return;
  }
  if (btn) btn.href = resumePath;
}

// ============================================================
// INTERACTIVE TERMINAL
// ============================================================
function initTerminal(data) {
  const termBody  = document.getElementById('terminalBody');
  const termInput = document.getElementById('terminalInput');
  if (!termBody || !termInput) return;

  termBody.addEventListener('click', () => {
    const inp = document.getElementById('terminalInput');
    if (inp) inp.focus();
  });

  const prof = data.profile || {};
  const soc  = data.social  || {};

  const commands = {
    help: () => [
      { text: 'Available commands:', cls: 'output-line--cyan' },
      { text: '  whoami    about    skills    projects    contact' },
      { text: '  ls    date    neofetch    uptime    banner    clear    exit' },
      { text: '  sudo    rm    hack    logout' },
      { text: '' },
      { text: "Type any command and press Enter.", cls: 'output-line--muted' }
    ],
    whoami: () => [
      { text: prof.name || 'Jenish Chhowala', cls: 'output-line--green' },
      { text: '─────────────────────────────────' },
      { text: `Role:       ${prof.role || 'DevOps & Cloud Engineer'}` },
      { text: 'Background: Computer Science Graduate' },
      { text: 'Focus:      AWS · Docker · Jenkins · Kubernetes · Argo CD' },
      { text: 'Status:     Building hands-on DevOps portfolio', cls: 'output-line--cyan' }
    ],
    skills: () => [
      { text: 'Tech Stack:', cls: 'output-line--cyan' },
      ...(data.skills || []).map(cat => ({
        text: '  ' + cat.label + ': ' + (cat.tags || []).map(t => t.name).join(', ')
      }))
    ],
    projects: () => [
      { text: 'Portfolio Projects:', cls: 'output-line--cyan' },
      ...(data.projects || []).map((p, i) => {
        const icon = p.status === 'completed' ? '[done]' : p.status === 'in-progress' ? '[wip] ' : '[plan]';
        return { text: `  ${i + 1}. ${icon} ${p.title}` };
      }),
      { text: '' },
      { text: "Scroll to the projects section for full details.", cls: 'output-line--muted' }
    ],
    about: () => [
      ...(prof.about || ['No about info.']).map(para => ({ text: para })),
      { text: '' }
    ],
    contact: () => [
      { text: 'Get in touch:', cls: 'output-line--cyan' },
      { text: '  Email:    ' + (soc.email    || '[not set — edit social.email in data.js]') },
      { text: '  GitHub:   ' + (soc.github   || '[not set — edit social.github in data.js]') },
      { text: '  LinkedIn: ' + (soc.linkedin || '[not set — edit social.linkedin in data.js]') },
      { text: '  Resume:   ' + (soc.resume   || '[not set]') }
    ],
    ls: () => [
      { text: 'drwxr-xr-x  about/       About section', cls: 'output-line--cyan' },
      { text: 'drwxr-xr-x  skills/      Technical skills' },
      { text: 'drwxr-xr-x  projects/    Portfolio projects' },
      { text: 'drwxr-xr-x  terminal/    Interactive terminal' },
      { text: 'drwxr-xr-x  contact/     Contact info' }
    ],
    date: () => [{ text: new Date().toString(), cls: 'output-line--green' }],
    uptime: () => [
      { text: 'Portfolio online since 2026.', cls: 'output-line--amber' },
      { text: 'Last refresh: ' + new Date().toLocaleTimeString() }
    ],
    neofetch: () => [
      { text: '  \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557', cls: 'output-line--cyan' },
      { text: '  \u2551  Jenish Chhowala          \u2551', cls: 'output-line--cyan' },
      { text: '  \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d', cls: 'output-line--cyan' },
      { text: '  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500' },
      { text: '  Role:   ' + (prof.role || 'DevOps & Cloud Engineer') },
      { text: '  Focus:  AWS / Docker / Kubernetes' },
      { text: '  CI:     Jenkins' },
      { text: '  GitOps: Argo CD' },
      { text: '  IaC:    Terraform (learning)' },
      { text: '  Status: Building \uD83D\uDE80', cls: 'output-line--green' }
    ],
    banner: () => [
      { text: '     \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557  \u2588\u2588\u2557', cls: 'output-line--cyan' },
      { text: '     \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2551  \u2588\u2588\u2551', cls: 'output-line--cyan' },
      { text: '     \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2554\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551', cls: 'output-line--cyan' },
      { text: '\u2588\u2588   \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255d  \u2588\u2588\u2551\u255a\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2550\u2550\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551', cls: 'output-line--cyan' },
      { text: '\u255a\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551', cls: 'output-line--cyan' },
      { text: ' \u255a\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u2550\u2550\u255d\u255a\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u255d', cls: 'output-line--cyan' },
      { text: '        DevOps  \u00B7  Cloud  \u00B7  Automation', cls: 'output-line--green' }
    ],
    deploy: () => {
      setTimeout(() => {
        const steps = [
          { text: '🚀 [1/4] Triggering Jenkins CI pipeline on branch `main`...', cls: 'output-line--cyan' },
          { text: '🔍 [2/4] SonarQube quality gate: PASSED | Trivy security scan: 0 vulnerabilities', cls: 'output-line--green' },
          { text: '📦 [3/4] Docker image built & pushed: `jenish/devops-app:v1.4.2` to registry', cls: 'output-line--purple' },
          { text: '⚡ [4/4] Argo CD synchronized application state to Kubernetes cluster.', cls: 'output-line--green' },
          { text: '🎉 Pipeline Status: SUCCESS (Deployment live & healthy: 200 OK)', cls: 'output-line--green' }
        ];
        appendLines(steps);
      }, 400);
      return [{ text: 'Initiating automated CI/CD deployment simulation...', cls: 'output-line--amber' }];
    },
    matrix: () => [
      { text: '01000100 01100101 01110110 01001111 01110000 01110011', cls: 'output-line--green' },
      { text: '10110010 01010111 01010011 00100000 01000011 01101001', cls: 'output-line--green' },
      { text: '01000011 01000100 00100000 01000111 01101001 01110100', cls: 'output-line--green' },
      { text: 'Wake up, engineer... Follow the white rabbit 🐇', cls: 'output-line--cyan' }
    ],
    resume: () => {
      if (soc.resume) {
        window.open(soc.resume, '_blank');
        return [{ text: 'Opening resume in a new tab...', cls: 'output-line--green' }];
      }
      return [{ text: 'Resume path not configured.', cls: 'output-line--error' }];
    },
    sudo:   () => [{ text: 'Permission denied. Nice try \uD83D\uDE09', cls: 'output-line--error' }],
    rm:     () => [{ text: 'rm: refusing to remove \u2014 this is a safe zone.', cls: 'output-line--error' }],
    hack:   () => [{ text: "Initiating hack\u2026 just kidding! Try 'help'.", cls: 'output-line--amber' }],
    exit:   () => '__EXIT__',
    logout: () => '__EXIT__'
  };

  // Clickable command chips
  document.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.dataset.cmd;
      if (!cmd) return;
      const inp = document.getElementById('terminalInput');
      if (inp) {
        inp.value = cmd;
        inp.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      }
    });
  });

  function appendLines(lines) {
    const inputRow = document.getElementById('terminalInputRow');
    if (inputRow) inputRow.remove();
    const frag = document.createDocumentFragment();
    lines.forEach(line => frag.appendChild(el('div', 'output-line ' + (line.cls || ''), line.text || '')));
    termBody.appendChild(frag);
    rebuildInput();
    termBody.scrollTop = termBody.scrollHeight;
  }

  function rebuildInput() {
    const row = el('div', 'terminal-input-row');
    row.id = 'terminalInputRow';
    const prompt = el('span', 'terminal-prompt');
    prompt.textContent = '\u276F';
    prompt.setAttribute('aria-hidden', 'true');
    const lbl = el('label', 'sr-only', 'Terminal command input');
    lbl.htmlFor = 'terminalInput';
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.id = 'terminalInput';
    inp.className = 'terminal-input';
    inp.placeholder = 'type a command...';
    inp.autocomplete = 'off';
    inp.spellcheck = false;
    inp.setAttribute('aria-label', 'Enter a terminal command');
    inp.addEventListener('keydown', handleInput);
    row.appendChild(prompt);
    row.appendChild(lbl);
    row.appendChild(inp);
    termBody.appendChild(row);
    inp.focus();
  }

  const cmdHistory = [];
  let historyIndex = -1;

  function handleInput(e) {
    const inp = e.target;

    // Arrow up/down for command history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length && historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        inp.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inp.value = cmdHistory[cmdHistory.length - 1 - historyIndex];
      } else {
        historyIndex = -1;
        inp.value = '';
      }
      return;
    }

    // Tab completion
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = inp.value.trim().toLowerCase();
      if (!partial) return;
      const match = Object.keys(commands).find(c => c.startsWith(partial) && c !== partial);
      if (match) inp.value = match;
      return;
    }

    if (e.key !== 'Enter') return;
    const rawCmd = inp.value.trim();
    const cmd    = rawCmd.toLowerCase();
    historyIndex = -1;
    if (rawCmd) cmdHistory.push(rawCmd);

    const echo = el('div', 'output-line');
    const ps   = el('span', 'terminal-prompt');
    ps.textContent = '\u276F';
    ps.setAttribute('aria-hidden', 'true');
    echo.appendChild(ps);
    echo.appendChild(document.createTextNode(' ' + rawCmd));
    const row = document.getElementById('terminalInputRow');
    if (row) row.remove();
    termBody.appendChild(echo);

    if (cmd === 'clear') {
      termBody.innerHTML = '';
      rebuildInput();
      return;
    }
    if (!cmd) { rebuildInput(); termBody.scrollTop = termBody.scrollHeight; return; }

    const handler = commands[cmd];
    if (handler) {
      const res = handler();
      if (res === '__EXIT__') {
        const frag = document.createDocumentFragment();
        frag.appendChild(el('div', 'output-line output-line--amber', 'Session ended. Refresh or type a command to continue.'));
        termBody.appendChild(frag);
        rebuildInput();
        termBody.scrollTop = termBody.scrollHeight;
      } else {
        appendLines(res);
      }
    } else {
      appendLines([
        { text: 'zsh: command not found: ' + escapeHTML(cmd), cls: 'output-line--error' },
        { text: "Type 'help' for available commands.", cls: 'output-line--muted' }
      ]);
    }
  }
  termInput.addEventListener('keydown', handleInput);
}

// ============================================================
// TYPING EFFECT
// ============================================================
function initTypingEffect(roles) {
  const textEl = document.getElementById('typingText');
  if (!textEl) return;
  if (!Array.isArray(roles) || !roles.length) { textEl.textContent = 'DevOps Engineer'; return; }
  if (prefersReducedMotion) { textEl.textContent = roles[0]; textEl.style.borderRight = 'none'; return; }
  let ti = 0, ci = 0, del = false;
  function type() {
    const cur = roles[ti];
    if (!del) {
      textEl.textContent = cur.substring(0, ci + 1);
      ci++;
      if (ci === cur.length) { del = true; setTimeout(type, 1900); return; }
    } else {
      textEl.textContent = cur.substring(0, ci - 1);
      ci--;
      if (ci === 0) { del = false; ti = (ti + 1) % roles.length; setTimeout(type, 350); return; }
    }
    setTimeout(type, del ? 28 : 55);
  }
  type();
}

// ============================================================
// PARTICLES (replaced by initParticlesLazy below)
// ============================================================

// ============================================================
// MOBILE NAV
// ============================================================
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('primaryNavLinks');
  if (!toggle || !links) return;
  const open  = () => { links.classList.add('open');    toggle.setAttribute('aria-expanded', 'true');  toggle.setAttribute('aria-label', 'Close navigation menu'); };
  const close = () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open navigation menu');  };
  toggle.addEventListener('click', () => links.classList.contains('open') ? close() : open());
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) close(); });
  document.addEventListener('click',   e => { if (!toggle.contains(e.target) && !links.contains(e.target)) close(); });
}

// ============================================================
// ACTIVE NAV (IntersectionObserver)
// ============================================================
function initActiveNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.setAttribute('aria-current', l.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'));
      }
    });
  }, { threshold: 0.2, rootMargin: '-60px 0px -40% 0px' });
  sections.forEach(s => obs.observe(s));
}

// ============================================================
// SCROLL REVEAL (with stagger support)
// ============================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(e => e.classList.add('visible'));
    document.querySelectorAll('.stagger-item').forEach(e => e.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  reveals.forEach(e => {
    const rect = e.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      e.classList.add('visible');
    } else {
      obs.observe(e);
    }
  });

  // Stagger individual cards
  const staggerObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        staggerObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

  document.querySelectorAll('.stagger-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.06}s`;
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      item.classList.add('visible');
    } else {
      staggerObs.observe(item);
    }
  });
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  function update() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) { bar.style.width = '0%'; return; }
    const pct = Math.min((window.scrollY / docHeight) * 100, 100);
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ============================================================
// BACK TO TOP BUTTON
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  function toggle() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
  toggle();
}

// ============================================================
// FOOTER SOCIAL ICONS
// ============================================================
function renderFooterSocials(social) {
  const container = document.getElementById('footerSocials');
  if (!container || !social) return;
  container.innerHTML = '';
  const frag = document.createDocumentFragment();
  [
    { key: 'github',   icon: 'github',   label: 'GitHub' },
    { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
    { key: 'email',    icon: 'email',    label: 'Email' }
  ].forEach(({ key, icon, label }) => {
    const val = social[key];
    if (!val) return;
    const href = key === 'email' ? `mailto:${val}` : val;
    const safe = safeURL(href);
    if (!safe) return;
    const a = el('a', 'footer-social-link');
    a.href = safe;
    a.setAttribute('aria-label', label);
    if (key !== 'email') { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    a.innerHTML = getIcon(icon);
    frag.appendChild(a);
  });
  container.appendChild(frag);
}

// ============================================================
// STAGGER SKILL & PROJECT CARDS
// ============================================================
function applyStaggerClasses() {
  document.querySelectorAll('.skill-category').forEach(card => card.classList.add('stagger-item'));
  document.querySelectorAll('.project-card').forEach(card => card.classList.add('stagger-item'));
  document.querySelectorAll('.focus-card').forEach(card => card.classList.add('stagger-item'));
}

// ============================================================
// LAZY PARTICLES (pause when not visible)
// ============================================================
function initParticlesLazy() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas || prefersReducedMotion) { if (canvas) canvas.style.display = 'none'; return; }
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const N = 20;
  let running = true;

  function resize() {
    canvas.width  = window.innerWidth  || document.documentElement.clientWidth  || 800;
    canvas.height = window.innerHeight || document.documentElement.clientHeight || 600;
  }
  resize();
  window.addEventListener('resize', resize);

  class P {
    constructor() { this.r(); }
    r() {
      this.x  = Math.random() * (canvas.width || 800);
      this.y  = Math.random() * (canvas.height || 600);
      this.sz = Math.random() * 1.5 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.a  = Math.random() * 0.45 + 0.1;
      this.d  = Math.random() > 0.5 ? 1 : -1;
      this.f  = Math.random() * 0.003 + 0.001;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.a += this.d * this.f;
      if (this.a >= 0.55) this.d = -1;
      if (this.a <= 0.08) this.d = 1;
      if (this.x < -10 || this.x > canvas.width + 10 || this.y < -10 || this.y > canvas.height + 10) this.r();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,230,118,${this.a})`;
      ctx.fill();
    }
  }
  const ps = Array.from({ length: N }, () => new P());
  function animate() {
    if (!running) { requestAnimationFrame(animate); return; }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y, d = Math.sqrt(dx*dx + dy*dy);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(ps[i].x, ps[i].y);
          ctx.lineTo(ps[j].x, ps[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${0.05*(1-d/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    ps.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();

  // Pause when tab not visible
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
  });
}

// ============================================================
// LIGHTBOX (Diagram Zoom)
// ============================================================
function openLightbox(src, caption) {
  const modal   = document.getElementById('imageLightbox');
  const img     = document.getElementById('lightboxImg');
  const cap     = document.getElementById('lightboxCaption');
  if (!modal || !img) return;
  img.src = src;
  if (cap) cap.textContent = caption || '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('imageLightbox');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initLightbox() {
  const modal    = document.getElementById('imageLightbox');
  const closeBtn = document.getElementById('lightboxClose');
  const backdrop = document.getElementById('lightboxBackdrop');
  if (!modal) return;
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeLightbox();
  });
}

// ============================================================
// CARD SPOTLIGHT (Cursor Tracking)
// ============================================================
function initCardSpotlights() {
  const cards = document.querySelectorAll(
    '.hero-status-card, .focus-card, .skill-category, .project-card, .contact-hub-card, .contact-channel-card'
  );
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ============================================================
// INITIALIZATION
// ============================================================
function initPortfolio() {
  if (typeof portfolioData === 'undefined') {
    console.error('[Portfolio] portfolioData not found. Ensure data.js is loaded before script.js.');
    return;
  }
  validatePortfolioData(portfolioData);
  const { profile, social, skills, projects, certifications, meta } = portfolioData;
  renderSEOMeta(meta, social);
  renderProfile(profile, social);
  renderSkills(skills);
  renderProjects(projects);
  renderCertifications(certifications);
  renderContactLinks(social);
  renderFooterSocials(social);
  initResumeCheck(social?.resume);
  initTypingEffect(profile?.typingRoles);
  initTerminal(portfolioData);
  applyStaggerClasses();
  initParticlesLazy();
  initMobileNav();
  initActiveNav();
  initScrollReveal();
  initScrollProgress();
  initBackToTop();
  initLightbox();
  initCardSpotlights();
}

// Run immediately if DOM is already ready, otherwise on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
  initPortfolio();
}
