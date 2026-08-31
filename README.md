# Jenish Chhowala — Portfolio

A lightweight, data-driven, framework-free personal portfolio for a
DevOps & Cloud Engineer.

## Architecture

```
HTML   = structure
CSS    = design
JS     = behaviour + rendering engine
data.js = portfolio content (the only file you edit regularly)
assets/ = project media (diagrams, screenshots, resume)
```

Adding a new project requires changing **only `data.js`** and
optionally adding files under `assets/projects/<id>/`.

---

## File Structure

```
myportfolio/
├── index.html          Static shell — no content
├── styles.css          All CSS
├── script.js           Rendering engine (reads data.js)
├── data.js             YOUR PORTFOLIO CONTENT
├── README.md           This file
├── .gitignore
└── assets/
    ├── favicon.svg
    ├── resume.pdf      Add your real resume here
    ├── projects/
    │   ├── aws-3tier/
    │   │   ├── architecture.svg
    │   │   └── screenshots/
    │   ├── jenkins-cicd/
    │   │   ├── pipeline.svg
    │   │   └── screenshots/
    │   └── kubernetes-argocd/
    │       ├── architecture.svg
    │       └── screenshots/
    └── og-image.png    Social preview image (1200x630)
```

---

## Running Locally

No build step required.

**Option 1 — Double-click `index.html`**
Works for basic viewing. Resume fetch check may warn in console (CORS).

**Option 2 — Local server (recommended)**

Using Python:
```
python -m http.server 8080
```
Then open: http://localhost:8080

Using VS Code:
Install the "Live Server" extension and click "Go Live".

---

## Updating Content

> **Most updates only require editing `data.js`.**

### Update your name / bio

```js
// data.js -> profile
profile: {
  name: "Jenish Chhowala",
  role: "DevOps & Cloud Engineer",
  tagline: "...",
  about: [ "Paragraph 1", "Paragraph 2", "Paragraph 3" ]
}
```

### Update GitHub / LinkedIn / email

```js
// data.js -> social
social: {
  github:   "https://github.com/YOUR_ACTUAL_USERNAME",   // REPLACE
  linkedin: "https://www.linkedin.com/in/YOUR_HANDLE/", // REPLACE
  email:    "your.actual@email.com"                      // REPLACE
}
```

### Update skills

Add a tag to an existing category:
```js
{ id: "cicd", label: "DevOps & CI/CD", icon: "cicd",
  tags: [
    { name: "Jenkins", featured: true },
    { name: "Ansible" }  // <-- add here
  ]
}
```

Add a new category:
```js
{
  id: "monitoring",
  label: "Monitoring & Observability",
  icon: "cloud",
  tags: [
    { name: "Prometheus" },
    { name: "Grafana" }
  ]
}
```

---

## Adding a New Project

### Step 1 — Create assets directory

```
assets/projects/my-project/
assets/projects/my-project/screenshots/
```

### Step 2 — Add optional assets

```
assets/projects/my-project/architecture.svg
assets/projects/my-project/screenshots/screenshot-1.png
```

### Step 3 — Add project object to data.js

```js
// Inside: portfolioData.projects = [ ... ]

{
  id: "my-project",
  title: "My Project Title",
  status: "completed",       // "completed" | "in-progress" | "planned"
  featured: true,            // true = appears first
  category: ["aws", "docker"],

  shortDescription: "One or two sentence overview shown on the card.",

  description:
    "Full description shown in the expanded details panel. " +
    "Explain what you built and why.",

  technologies: ["AWS", "Docker", "Jenkins"],

  highlights: [
    "What you built — specific, concrete",
    "Another specific achievement",
    "Technology or concept demonstrated"
  ],

  github: "https://github.com/YOUR_USERNAME/my-project", // null if not ready
  demo: null,
  architectureDiagram: "assets/projects/my-project/architecture.svg", // null if not ready
  screenshots: [
    "assets/projects/my-project/screenshots/screenshot-1.png"
  ],

  pipeline: null,    // See pipeline example below
  deployment: null,  // See deployment example below
  notes: null        // Optional note shown in details
}
```

### Step 4 — Refresh the browser

No HTML change. The project renders automatically.

---

## Adding a CI Pipeline Visualization

```js
pipeline: {
  type: "CI",
  label: "My CI Pipeline",
  stages: [
    { id: "checkout", label: "Git Checkout",  description: "Pull source code.", status: "completed" },
    { id: "build",    label: "Build",          description: "Build artifact.",   status: "completed" },
    { id: "test",     label: "Test",           description: "Run tests.",        status: "completed" }
  ]
}
```

Stage statuses: `completed` | `in-progress` | `failed` | `skipped` | `pending`

---

## Adding a CD Deployment Flow

```js
deployment: {
  type: "CD",
  label: "Deployment Flow",
  stages: [
    { id: "ci",   label: "CI Pipeline", description: "Build and push image." },
    { id: "argo", label: "Argo CD",     description: "Sync cluster state."   },
    { id: "k8s",  label: "Kubernetes",  description: "Run containers."        },
    { id: "app",  label: "Application", description: "Application live."      }
  ]
}
```

---

## Adding Certifications

When you have a real certification, add it to `portfolioData.certifications`:

```js
certifications: [
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "2027",
    credentialUrl: "https://www.credly.com/...",
    icon: "cloud"
  }
]
```

The certifications section and navigation link appear automatically
when the array is non-empty.

---

## Replacing the Resume

1. Save your resume as `assets/resume.pdf`
2. Done — the Resume button becomes active automatically

If `assets/resume.pdf` does not exist, the Resume button is hidden.

---

## Marking a Project Featured

```js
featured: true   // appears first in the project list
featured: false  // appears after featured projects
```

---

## Changing Project Status

```js
status: "completed"    // green badge
status: "in-progress"  // amber badge
status: "planned"      // muted badge
```

---

## Deploying the Website

No build step is required. Upload the directory to any static host.

### GitHub Pages

```
1. Push all files to a GitHub repository.
2. Go to Settings > Pages.
3. Source: main branch / root folder.
4. Save. Your site is live at https://<username>.github.io/<repo>
```

### Netlify

```
1. Go to https://app.netlify.com
2. "Add new site" > "Import an existing project"
3. Connect GitHub repo.
4. Build command: (leave empty)
5. Publish directory: (leave as root or .)
6. Deploy site.
```

### Cloudflare Pages

```
1. Go to Cloudflare dashboard > Pages > Create a project
2. Connect GitHub repo.
3. Build settings: Framework preset = None
4. Build command: (leave empty)
5. Deploy.
```

### Vercel

```
1. Go to https://vercel.com > New Project
2. Import Git Repository.
3. Framework preset = Other
4. Build and output settings: (leave empty)
5. Deploy.
```

---

## Troubleshooting

**Resume button not showing**
Place `resume.pdf` in the `assets/` folder and refresh. If using
`file://` protocol locally, the HEAD fetch may fail — use a local
server instead.

**Project not appearing after adding to data.js**
Check the browser console for validation warnings. Ensure the
project object has a unique `id` and a `title`.

**XSS / security**
The terminal and all dynamic rendering uses `textContent` and
`escapeHTML()` to prevent script injection. Never use `innerHTML`
with unsanitized user input.

**Animations not working**
If your OS has Reduce Motion enabled, animations are intentionally
disabled for accessibility. This is expected behaviour.

---

## Accessibility Notes

- Skip navigation link (Tab once from top).
- All interactive elements are real `<button>` or `<a>` elements.
- `aria-expanded` on mobile menu and project details toggle.
- `aria-pressed` on filter buttons.
- `aria-current` on active navigation link.
- `prefers-reduced-motion` support — animations disabled when enabled.
- Meaningful `alt` text on all images.
- Decorative elements marked `aria-hidden="true"`.

---

## Security Notes

- No backend. No database. No authentication.
- Terminal input is sanitized with `escapeHTML()` before display.
- All dynamic URLs are validated with `safeURL()` — only `https:` and `mailto:` are allowed.
- External links use `rel="noopener noreferrer"`.
- No `eval()`. No `innerHTML` with user-controlled strings.

---

*Built by Jenish Chhowala — Last updated 2026*
