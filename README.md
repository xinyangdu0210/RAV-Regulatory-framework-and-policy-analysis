# RAV Policy

Interactive website for autonomous-vehicle regulatory framework and policy analysis.

**Live site:**  
https://xinyangdu0210.github.io/RAV-Regulatory-framework-and-policy-analysis/

## Project overview

This website provides a structured review of autonomous-vehicle laws, regulations, permitting requirements, insurance requirements, and deployment policies across the United States.

## Initial scope

- United States federal automated-vehicle policy
- Autonomous-vehicle laws and regulations across all 50 states and the District of Columbia
- Driverless operation requirements
- Registration and insurance requirements
- Commercial deployment policies
- Connected-infrastructure considerations
- Federal government and nationwide state-legislation sources and citations

## Website files

- `index.html` — webpage structure and visible sections
- `data.js` — policy records and source links supplied by the project owner
- `app.js` — search, filtering, and interactive functions
- `style.css` — colors, fonts, spacing, and layout

## State map data

Add state and District of Columbia AV statutes and bills to the
`STATE_AV_LAWS` array in `data.js`. Its fields match the spreadsheet:
state, AV-specific statute and regulation, current legal status, original
bill/file, sponsor, committee, enacted act, code citation, safety-driver
requirements, liability coverage, commercial deployment, procedure, and
an optional owner-supplied source URL.

The geographic interface uses Leaflet 1.9.4, an OpenStreetMap basemap,
and a generalized 50-state-and-D.C. boundary layer served by the
U.S. Department of Agriculture. An internet connection is required to
load the basemap and state boundaries.

## Disclaimer

This website is an educational and research resource and does not constitute legal advice. Requirements may vary depending on the vehicle, operator, service type, and jurisdiction.
