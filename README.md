# RAV Policy Navigator

Standalone interactive policy-planning website for rural autonomous vehicle projects.

## Initial scope

- United States federal automated-vehicle policy
- Georgia operating, registration, insurance, and connected-infrastructure context
- Six decision domains: safety assurance, vehicle compliance, transit operations, infrastructure, data and cybersecurity, and accessibility
- Official government sources verified July 30, 2026

This is an educational planning resource, not legal advice. Applicability depends on the vehicle, service, operator, funding, location, and facts.

## Run locally

There is no build step.

For the easiest editing workflow, run:

```powershell
.\preview.ps1
```

This opens the website at `http://127.0.0.1:8000/`. Edit and save
`data.js`, then refresh the browser to see the updated content.

Alternatively:

```powershell
cd "RAV policy"
python -m http.server 8000
```

Open `http://localhost:8000`.

## Validate

```powershell
python tools/validate_site.py
```

## Files

- `index.html` — semantic page structure
- `style.css` — responsive visual design and print layout
- `data.js` — policy-source database
- `app.js` — framework, matrix, assessment, filters, comparison, export, and URL state
- `tools/validate_site.py` — static consistency checks

## Adding a policy

Add one record to `POLICIES` in `data.js`. Use an official government URL and populate every field. The validator checks identifiers, domains, links, required fields, and interface hooks.
