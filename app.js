(function () {
  "use strict";

  var DOMAINS = [
    "Safety assurance",
    "Vehicle compliance",
    "Transit operations",
    "Infrastructure",
    "Data & cybersecurity",
    "Accessibility"
  ];

  var US_STATES = [
    { code: "AL", name: "Alabama", x: 6, y: 4 },
    { code: "AK", name: "Alaska", x: 0, y: 6 },
    { code: "AZ", name: "Arizona", x: 1, y: 3 },
    { code: "AR", name: "Arkansas", x: 4, y: 3 },
    { code: "CA", name: "California", x: 0, y: 2 },
    { code: "CO", name: "Colorado", x: 3, y: 2 },
    { code: "CT", name: "Connecticut", x: 11, y: 1 },
    { code: "DE", name: "Delaware", x: 10, y: 2 },
    { code: "DC", name: "District of Columbia", x: 9, y: 3 },
    { code: "FL", name: "Florida", x: 8, y: 5 },
    { code: "GA", name: "Georgia", x: 7, y: 4 },
    { code: "HI", name: "Hawaii", x: 1, y: 6 },
    { code: "ID", name: "Idaho", x: 1, y: 1 },
    { code: "IL", name: "Illinois", x: 6, y: 1 },
    { code: "IN", name: "Indiana", x: 7, y: 1 },
    { code: "IA", name: "Iowa", x: 5, y: 1 },
    { code: "KS", name: "Kansas", x: 3, y: 3 },
    { code: "KY", name: "Kentucky", x: 6, y: 2 },
    { code: "LA", name: "Louisiana", x: 4, y: 4 },
    { code: "ME", name: "Maine", x: 12, y: 0 },
    { code: "MD", name: "Maryland", x: 9, y: 2 },
    { code: "MA", name: "Massachusetts", x: 12, y: 1 },
    { code: "MI", name: "Michigan", x: 7, y: 0 },
    { code: "MN", name: "Minnesota", x: 5, y: 0 },
    { code: "MS", name: "Mississippi", x: 5, y: 4 },
    { code: "MO", name: "Missouri", x: 5, y: 2 },
    { code: "MT", name: "Montana", x: 2, y: 0 },
    { code: "NE", name: "Nebraska", x: 4, y: 2 },
    { code: "NV", name: "Nevada", x: 1, y: 2 },
    { code: "NH", name: "New Hampshire", x: 11, y: 0 },
    { code: "NJ", name: "New Jersey", x: 10, y: 1 },
    { code: "NM", name: "New Mexico", x: 2, y: 3 },
    { code: "NY", name: "New York", x: 9, y: 0 },
    { code: "NC", name: "North Carolina", x: 7, y: 3 },
    { code: "ND", name: "North Dakota", x: 4, y: 0 },
    { code: "OH", name: "Ohio", x: 8, y: 1 },
    { code: "OK", name: "Oklahoma", x: 3, y: 4 },
    { code: "OR", name: "Oregon", x: 0, y: 1 },
    { code: "PA", name: "Pennsylvania", x: 9, y: 1 },
    { code: "RI", name: "Rhode Island", x: 12, y: 2 },
    { code: "SC", name: "South Carolina", x: 8, y: 3 },
    { code: "SD", name: "South Dakota", x: 4, y: 1 },
    { code: "TN", name: "Tennessee", x: 5, y: 3 },
    { code: "TX", name: "Texas", x: 3, y: 5 },
    { code: "UT", name: "Utah", x: 2, y: 2 },
    { code: "VT", name: "Vermont", x: 10, y: 0 },
    { code: "VA", name: "Virginia", x: 8, y: 2 },
    { code: "WA", name: "Washington", x: 0, y: 0 },
    { code: "WV", name: "West Virginia", x: 7, y: 2 },
    { code: "WI", name: "Wisconsin", x: 6, y: 0 },
    { code: "WY", name: "Wyoming", x: 2, y: 1 }
  ];

  var DOMAIN_INFO = {
    "Safety assurance": {
      question: "How will the project demonstrate that the ADS is safe inside its rural operational design domain?",
      pressure: "Sparse road geometry, weather, wildlife, long response times, and inconsistent communications make urban evidence insufficient.",
      deliverable: "A route-specific safety case, validation plan, fallback policy, incident plan, and public reporting protocol."
    },
    "Vehicle compliance": {
      question: "Can the exact vehicle be legally manufactured, imported, registered, insured, and operated as configured?",
      pressure: "Small pilots often use novel shuttles or incomplete fleets whose exemptions, VIN, title, and insurance pathway are unresolved.",
      deliverable: "A vehicle compliance matrix covering FMVSS, exemptions, registration, insurance, equipment, and configuration control."
    },
    "Transit operations": {
      question: "Which transit, procurement, funding, labor, testing, and service rules attach to the project?",
      pressure: "Rural services combine thin demand, limited staffing, long recovery distances, and public funding requirements.",
      deliverable: "An operating authority and procurement checklist tied to the service model, funding source, and vehicle class."
    },
    "Infrastructure": {
      question: "Who owns, licenses, maintains, and pays for the physical and digital infrastructure supporting the service?",
      pressure: "Rural corridors cannot assume dense roadside units, high-quality markings, continuous cellular coverage, or rapid maintenance.",
      deliverable: "A corridor responsibility plan covering road readiness, V2X, spectrum, maps, connectivity, maintenance, and graceful degradation."
    },
    "Data & cybersecurity": {
      question: "What data is collected, why is it needed, who receives it, and how will the system recover from cyber events?",
      pressure: "Precise location, video, rider, and health-trip data can be especially identifying in small communities.",
      deliverable: "A data inventory, minimization and retention schedule, vendor controls, incident response plan, and cybersecurity profile."
    },
    "Accessibility": {
      question: "Can disabled riders discover, book, board, use, and exit the service without relying on a human driver or reliable smartphone coverage?",
      pressure: "Rural riders may face limited broadband, inaccessible stops, long waits, and few alternative services.",
      deliverable: "An end-to-end accessibility acceptance plan developed with riders, including non-app access and equivalent service."
    }
  };

  var ASSESSMENT = DOMAINS.map(function (domain) {
    return {
      domain: domain,
      prompt: {
        "Safety assurance": "The project has a documented rural ODD and safety case.",
        "Vehicle compliance": "The exact vehicle has a confirmed compliance, exemption, registration, and insurance path.",
        "Transit operations": "Funding, procurement, testing, operator, and service requirements are mapped.",
        "Infrastructure": "Road, communications, spectrum, map, and maintenance responsibilities are assigned.",
        "Data & cybersecurity": "Data governance and cyber incident response cover every project partner.",
        "Accessibility": "Disabled riders have co-designed and tested the complete rider journey."
      }[domain]
    };
  });

  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  function create(tag, className, text) {
    var node = document.createElement(tag);
    if (className) { node.className = className; }
    if (text !== undefined) { node.textContent = text; }
    return node;
  }

  function createSvg(tag, attributes) {
    var node = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attributes || {}).forEach(function (name) {
      node.setAttribute(name, attributes[name]);
    });
    return node;
  }

  var state = {
    search: "",
    jurisdiction: "",
    domain: "",
    effect: "",
    priorityDomains: [],
    selectedState: ""
  };
  var compareIds = [];
  try {
    compareIds = JSON.parse(localStorage.getItem("rav-policy-compare") || "[]")
      .filter(function (id) { return POLICIES.some(function (policy) { return policy.id === id; }); })
      .slice(0, 3);
  } catch (error) {
    compareIds = [];
  }

  function unique(field) {
    return Array.from(new Set(POLICIES.map(function (policy) { return policy[field]; }))).sort();
  }

  function matchesJurisdiction(policy, jurisdiction) {
    if (!jurisdiction) { return true; }
    if (jurisdiction === "States & DC") { return policy.jurisdiction !== "Federal"; }
    return policy.jurisdiction === jurisdiction;
  }

  function hydrateState() {
    if (!window.URLSearchParams) { return; }
    var params = new URLSearchParams(location.search);
    state.search = params.get("q") || "";
    state.jurisdiction = params.get("jurisdiction") || "";
    state.domain = params.get("domain") || "";
    state.effect = params.get("effect") || "";
    state.selectedState = params.get("state") || "";
  }

  function syncUrl() {
    if (!window.history || !window.URLSearchParams) { return; }
    var params = new URLSearchParams();
    if (state.search) { params.set("q", state.search); }
    if (state.jurisdiction) { params.set("jurisdiction", state.jurisdiction); }
    if (state.domain) { params.set("domain", state.domain); }
    if (state.effect) { params.set("effect", state.effect); }
    if (state.selectedState) { params.set("state", state.selectedState); }
    history.replaceState(null, "", location.pathname + (params.toString() ? "?" + params : "") + location.hash);
  }

  function fillMeta() {
    $("#stat-policies").textContent = POLICIES.length;
    $("#stat-binding").textContent = POLICIES.filter(function (policy) { return policy.binding; }).length;
  }

  function stateLawRecords(code) {
    if (typeof STATE_AV_LAWS === "undefined" || !Array.isArray(STATE_AV_LAWS)) { return []; }
    return STATE_AV_LAWS.filter(function (record) { return record.code === code; })
      .sort(function (a, b) {
        return Number(b.year || 0) - Number(a.year || 0) ||
          String(a.billNumber || "").localeCompare(String(b.billNumber || ""));
      });
  }

  function renderStatePanel(stateInfo) {
    var panel = $("#state-law-panel");
    panel.innerHTML = "";
    panel.appendChild(create("p", "eyebrow", stateInfo.code + " · Jurisdiction details"));
    panel.appendChild(create("h3", null, stateInfo.name));

    var records = stateLawRecords(stateInfo.code);
    panel.appendChild(create(
      "p",
      "state-record-count",
      records.length + " owner-supplied AV " + (records.length === 1 ? "record" : "records")
    ));

    if (!records.length) {
      var empty = create("div", "state-law-empty");
      empty.appendChild(create("strong", null, "No statutes or bills added yet"));
      empty.appendChild(create(
        "p",
        null,
        "Add " + stateInfo.name + " records to STATE_AV_LAWS in data.js. Nothing is generated automatically."
      ));
      panel.appendChild(empty);
      return;
    }

    var list = create("div", "state-law-list");
    records.forEach(function (record) {
      var article = create("article", "state-law-record");
      var meta = create("div", "state-law-meta");
      if (record.billNumber) { meta.appendChild(create("span", "bill-number", record.billNumber)); }
      if (record.status) { meta.appendChild(create("span", null, record.status)); }
      if (record.year) { meta.appendChild(create("span", null, String(record.year))); }
      article.appendChild(meta);
      article.appendChild(create("h4", null, record.title || record.billNumber || "AV statute or bill"));
      if (record.statute) {
        var statute = create("p", "statute-citation");
        statute.appendChild(create("strong", null, "Statute"));
        statute.appendChild(document.createTextNode(record.statute));
        article.appendChild(statute);
      }
      if (record.summary) { article.appendChild(create("p", null, record.summary)); }
      if (record.url) {
        var link = create("a", "state-source-link", "View supplied source ↗");
        link.href = record.url;
        link.target = "_blank";
        link.rel = "noopener";
        article.appendChild(link);
      }
      list.appendChild(article);
    });
    panel.appendChild(list);
  }

  function renderStateMap() {
    var map = $("#us-map");
    var select = $("#state-map-select");
    if (!map || !select) { return; }

    var svg = createSvg("svg", {
      viewBox: "0 0 900 420",
      role: "group",
      "aria-label": "Select a state or the District of Columbia"
    });
    var tileWidth = 62;
    var tileHeight = 48;
    var stepX = 68;
    var stepY = 57;
    var offsetX = 7;
    var offsetY = 14;

    US_STATES.slice().sort(function (a, b) { return a.name.localeCompare(b.name); }).forEach(function (stateInfo) {
      var option = create("option", null, stateInfo.name);
      option.value = stateInfo.code;
      select.appendChild(option);
    });

    US_STATES.forEach(function (stateInfo) {
      var count = stateLawRecords(stateInfo.code).length;
      var group = createSvg("g", {
        class: "state-tile" + (count ? " has-records" : ""),
        transform: "translate(" + (offsetX + stateInfo.x * stepX) + " " + (offsetY + stateInfo.y * stepY) + ")",
        role: "button",
        tabindex: "0",
        "data-state-code": stateInfo.code,
        "aria-label": stateInfo.name + ": " + count + " AV " + (count === 1 ? "record" : "records")
      });
      group.appendChild(createSvg("rect", { width: tileWidth, height: tileHeight, rx: "8", ry: "8" }));
      var label = createSvg("text", { x: tileWidth / 2, y: "29", "text-anchor": "middle" });
      label.textContent = stateInfo.code;
      group.appendChild(label);
      var badge = createSvg("circle", { cx: "53", cy: "8", r: "7", class: "state-count-badge" });
      group.appendChild(badge);
      var badgeText = createSvg("text", { x: "53", y: "11", "text-anchor": "middle", class: "state-count-text" });
      badgeText.textContent = count ? String(Math.min(count, 9)) : "";
      group.appendChild(badgeText);

      var selectState = function () {
        state.selectedState = stateInfo.code;
        $$(".state-tile", svg).forEach(function (tile) {
          tile.classList.toggle("selected", tile.dataset.stateCode === stateInfo.code);
          tile.setAttribute("aria-pressed", String(tile.dataset.stateCode === stateInfo.code));
        });
        select.value = stateInfo.code;
        renderStatePanel(stateInfo);
        syncUrl();
      };
      group.addEventListener("click", selectState);
      group.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectState();
        }
      });
      svg.appendChild(group);
    });

    select.addEventListener("change", function () {
      var stateInfo = US_STATES.find(function (item) { return item.code === select.value; });
      if (!stateInfo) { return; }
      var tile = $('.state-tile[data-state-code="' + stateInfo.code + '"]', svg);
      if (tile) {
        tile.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        tile.focus();
      }
    });
    map.appendChild(svg);

    if (state.selectedState) {
      var initialTile = $('.state-tile[data-state-code="' + state.selectedState + '"]', svg);
      if (initialTile) { initialTile.dispatchEvent(new MouseEvent("click", { bubbles: true })); }
    }
  }

  function renderDomains() {
    var wheel = $("#domain-wheel");
    DOMAINS.forEach(function (domain, index) {
      var count = POLICIES.filter(function (policy) { return policy.domain === domain; }).length;
      var button = create("button", "domain-button");
      button.type = "button";
      button.dataset.number = String(index + 1).padStart(2, "0");
      button.dataset.domain = domain;
      button.appendChild(create("span", null, count + " policy sources"));
      button.appendChild(create("strong", null, domain));
      button.appendChild(create("small", null, DOMAIN_INFO[domain].question));
      button.addEventListener("click", function () { selectDomain(domain); });
      wheel.appendChild(button);
    });
    selectDomain(DOMAINS[0]);
  }

  function selectDomain(domain) {
    $$(".domain-button").forEach(function (button) {
      button.classList.toggle("active", button.dataset.domain === domain);
    });
    var info = DOMAIN_INFO[domain];
    var detail = $("#domain-detail");
    detail.innerHTML = "";
    detail.appendChild(create("span", "detail-number", "POLICY DOMAIN · " + String(DOMAINS.indexOf(domain) + 1).padStart(2, "0")));
    detail.appendChild(create("h3", null, domain));
    detail.appendChild(create("p", null, info.question));
    var list = create("dl");
    [
      ["Rural pressure point", info.pressure],
      ["Required project artifact", info.deliverable],
      ["Policy sources in this edition", String(POLICIES.filter(function (policy) { return policy.domain === domain; }).length)]
    ].forEach(function (item) {
      var row = create("div");
      row.appendChild(create("dt", null, item[0]));
      row.appendChild(create("dd", null, item[1]));
      list.appendChild(row);
    });
    detail.appendChild(list);
    var button = create("button", "button primary", "Explore " + domain.toLowerCase() + " policy");
    button.type = "button";
    button.addEventListener("click", function () {
      setExplorerFilters({ domain: domain });
      $("#explorer").scrollIntoView({ behavior: "smooth" });
    });
    detail.appendChild(button);
  }

  function renderMatrix() {
    var matrix = $("#policy-matrix");
    matrix.appendChild(create("div", "matrix-label header", "Authority"));
    DOMAINS.forEach(function (domain) { matrix.appendChild(create("div", "matrix-label header", domain)); });
    ["Federal", "States & DC"].forEach(function (jurisdiction) {
      matrix.appendChild(create("div", "matrix-label", jurisdiction));
      DOMAINS.forEach(function (domain) {
        var records = POLICIES.filter(function (policy) {
          return matchesJurisdiction(policy, jurisdiction) && policy.domain === domain;
        });
        var binding = records.filter(function (policy) { return policy.binding; }).length;
        var guidance = records.length - binding;
        var cell = create("button", "matrix-cell");
        cell.type = "button";
        cell.setAttribute("aria-label", jurisdiction + ", " + domain + ": " + records.length + " sources");
        cell.appendChild(create("strong", null, String(records.length)));
        cell.appendChild(create("small", null, records.length ? "policy source" + (records.length === 1 ? "" : "s") : "no source in edition"));
        var dots = create("span", "matrix-dots");
        for (var i = 0; i < Math.min(binding, 4); i++) { dots.appendChild(create("i", "dot binding")); }
        for (var j = 0; j < Math.min(guidance, 4); j++) { dots.appendChild(create("i", "dot guidance")); }
        cell.appendChild(dots);
        if (!records.length) {
          cell.disabled = true;
        } else {
          cell.addEventListener("click", function () {
            setExplorerFilters({ jurisdiction: jurisdiction, domain: domain });
            $("#explorer").scrollIntoView({ behavior: "smooth" });
          });
        }
        matrix.appendChild(cell);
      });
    });
  }

  function renderAssessment() {
    var form = $("#assessment-form");
    ASSESSMENT.forEach(function (item, index) {
      var fieldset = create("fieldset", "assessment-question");
      fieldset.dataset.domain = item.domain;
      var copy = create("div");
      copy.appendChild(create("p", null, item.prompt));
      copy.appendChild(create("small", null, item.domain));
      fieldset.appendChild(copy);
      var choices = create("div", "choice-group");
      [["Not yet", 0], ["Partial", 1], ["Ready", 2]].forEach(function (choice) {
        var label = create("label");
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "assessment-" + index;
        input.value = choice[1];
        input.setAttribute("aria-label", item.domain + ": " + choice[0]);
        input.addEventListener("change", updateAssessment);
        label.appendChild(input);
        label.appendChild(create("span", null, choice[0]));
        choices.appendChild(label);
      });
      fieldset.appendChild(choices);
      form.appendChild(fieldset);
    });
    updateAssessment();
  }

  function assessmentAnswers() {
    return ASSESSMENT.map(function (item, index) {
      var selected = $('input[name="assessment-' + index + '"]:checked');
      return { domain: item.domain, value: selected ? Number(selected.value) : null };
    });
  }

  function updateAssessment() {
    var answers = assessmentAnswers();
    var completed = answers.filter(function (answer) { return answer.value !== null; });
    var total = completed.reduce(function (sum, answer) { return sum + answer.value; }, 0);
    var score = completed.length ? Math.round(total / (completed.length * 2) * 100) : 0;
    var incomplete = completed.length < answers.length;
    var posture = "Complete the assessment";
    var summary = "Choose a response for each domain to build a prioritized policy worklist.";
    if (!incomplete && score >= 80) {
      posture = "Structured for authorization";
      summary = "The project has the core policy artifacts. Confirm applicability, test the controls, and obtain formal approvals.";
    } else if (!incomplete && score >= 50) {
      posture = "Gaps before procurement";
      summary = "The concept is forming, but unresolved policy work could change the vehicle, service, schedule, or cost.";
    } else if (!incomplete) {
      posture = "Policy discovery required";
      summary = "Pause commitments and establish authority, compliance, safety, accessibility, and governance foundations.";
    }
    var priority = answers.filter(function (answer) { return answer.value !== null && answer.value < 2; })
      .sort(function (a, b) { return a.value - b.value; });
    $("#score-value").textContent = score;
    $("#score-ring").style.setProperty("--score", (score * 3.6) + "deg");
    $("#score-posture").textContent = posture;
    $("#score-summary").textContent = summary;
    var actions = $("#score-actions");
    actions.innerHTML = "";
    if (priority.length) {
      var list = create("ul");
      priority.slice(0, 3).forEach(function (answer) {
        list.appendChild(create("li", null, answer.domain + ": " + DOMAIN_INFO[answer.domain].deliverable));
      });
      actions.appendChild(list);
    }
    $("#score-explore").disabled = !priority.length;
    $("#score-explore").onclick = function () {
      state.priorityDomains = priority.map(function (answer) { return answer.domain; });
      state.domain = "";
      $("#domain-filter").value = "";
      renderPolicies();
      $("#explorer").scrollIntoView({ behavior: "smooth" });
    };
  }

  function populateFilters() {
    var jurisdiction = $("#jurisdiction-filter");
    ["Federal", "States & DC"].concat(unique("jurisdiction").filter(function (value) {
      return value !== "Federal" && value !== "States & DC";
    })).forEach(function (value) {
      var option = create("option", null, value);
      option.value = value;
      jurisdiction.appendChild(option);
    });
    var domain = $("#domain-filter");
    DOMAINS.forEach(function (value) {
      var option = create("option", null, value);
      option.value = value;
      domain.appendChild(option);
    });
    $("#search").value = state.search;
    jurisdiction.value = state.jurisdiction;
    domain.value = state.domain;
    $("#effect-filter").value = state.effect;
    $("#search").addEventListener("input", function () {
      state.search = this.value.trim();
      state.priorityDomains = [];
      renderPolicies();
    });
    jurisdiction.addEventListener("change", function () {
      state.jurisdiction = this.value;
      state.priorityDomains = [];
      renderPolicies();
    });
    domain.addEventListener("change", function () {
      state.domain = this.value;
      state.priorityDomains = [];
      renderPolicies();
    });
    $("#effect-filter").addEventListener("change", function () {
      state.effect = this.value;
      renderPolicies();
    });
    $("#reset-filters").addEventListener("click", function () { setExplorerFilters({}); });
  }

  function setExplorerFilters(next) {
    state.search = next.search || "";
    state.jurisdiction = next.jurisdiction || "";
    state.domain = next.domain || "";
    state.effect = next.effect || "";
    state.priorityDomains = [];
    $("#search").value = state.search;
    $("#jurisdiction-filter").value = state.jurisdiction;
    $("#domain-filter").value = state.domain;
    $("#effect-filter").value = state.effect;
    renderPolicies();
  }

  function filteredPolicies() {
    var query = state.search.toLowerCase();
    return POLICIES.filter(function (policy) {
      if (query && [
        policy.title, policy.issuer, policy.summary, policy.ruralAction,
        policy.domain, policy.instrument, policy.status
      ].join(" ").toLowerCase().indexOf(query) === -1) { return false; }
      if (!matchesJurisdiction(policy, state.jurisdiction)) { return false; }
      if (state.domain && policy.domain !== state.domain) { return false; }
      if (state.priorityDomains.length && state.priorityDomains.indexOf(policy.domain) === -1) { return false; }
      if (state.effect === "binding" && !policy.binding) { return false; }
      if (state.effect === "guidance" && policy.binding) { return false; }
      return true;
    }).sort(function (a, b) {
      return Number(b.binding) - Number(a.binding) || b.year - a.year || a.title.localeCompare(b.title);
    });
  }

  function renderPolicies() {
    var records = filteredPolicies();
    var list = $("#policy-list");
    list.innerHTML = "";
    $("#result-count").textContent = "Showing " + records.length + " of " + POLICIES.length + " policy sources" +
      (state.priorityDomains.length ? " across priority domains" : "");
    if (!records.length) {
      list.appendChild(create("div", "empty-state", POLICIES.length
        ? "No policy sources match this view. Reset the filters to continue."
        : "No policy sources have been added yet. Add the project-owner-supplied records to data.js."));
    }
    records.forEach(function (policy) {
      var card = create("article", "policy-card");
      var meta = create("div", "policy-meta");
      meta.appendChild(create("span", "effect" + (policy.binding ? " binding" : ""), policy.binding ? "Binding" : "Guidance"));
      meta.appendChild(create("span", null, policy.jurisdiction));
      meta.appendChild(create("span", null, String(policy.year)));
      meta.appendChild(create("span", null, policy.status));
      card.appendChild(meta);
      var body = create("div");
      body.appendChild(create("h3", null, policy.title));
      body.appendChild(create("p", "policy-issuer", policy.issuer + " · " + policy.domain));
      body.appendChild(create("p", "policy-summary", policy.summary));
      var action = create("p", "policy-action");
      action.appendChild(create("strong", null, "Rural implementation action"));
      action.appendChild(document.createTextNode(policy.ruralAction));
      body.appendChild(action);
      card.appendChild(body);
      var actions = create("div", "policy-actions");
      var source = create("a", null, "View source ↗");
      source.href = policy.url;
      source.target = "_blank";
      source.rel = "noopener";
      actions.appendChild(source);
      var save = create("button", compareIds.indexOf(policy.id) !== -1 ? "saved" : "", compareIds.indexOf(policy.id) !== -1 ? "Saved" : "Compare");
      save.type = "button";
      save.addEventListener("click", function () { toggleCompare(policy.id); });
      actions.appendChild(save);
      card.appendChild(actions);
      list.appendChild(card);
    });
    syncUrl();
  }

  function persistCompare() {
    try { localStorage.setItem("rav-policy-compare", JSON.stringify(compareIds)); } catch (error) { /* optional */ }
  }

  function toggleCompare(id) {
    var index = compareIds.indexOf(id);
    if (index !== -1) {
      compareIds.splice(index, 1);
    } else if (compareIds.length < 3) {
      compareIds.push(id);
    } else {
      openDrawer();
      return;
    }
    persistCompare();
    renderCompare();
    renderPolicies();
  }

  function renderCompare() {
    var count = $("#compare-count");
    if (count) { count.textContent = compareIds.length; }
    var list = $("#compare-list");
    list.innerHTML = "";
    if (!compareIds.length) {
      list.appendChild(create("p", "empty-state", "Choose Compare on up to three policy records."));
    }
    compareIds.forEach(function (id) {
      var policy = POLICIES.find(function (item) { return item.id === id; });
      if (!policy) { return; }
      var item = create("article", "compare-item");
      item.appendChild(create("small", null, policy.jurisdiction + " · " + (policy.binding ? "Binding" : "Guidance") + " · " + policy.domain));
      item.appendChild(create("h3", null, policy.title));
      item.appendChild(create("p", null, policy.summary));
      item.appendChild(create("p", null, "Action: " + policy.ruralAction));
      var remove = create("button", "text-button", "Remove");
      remove.type = "button";
      remove.addEventListener("click", function () { toggleCompare(id); });
      item.appendChild(remove);
      list.appendChild(item);
    });
    $("#compare-export").disabled = !compareIds.length;
    $("#compare-clear").disabled = !compareIds.length;
  }

  function openDrawer() {
    $("#compare-drawer").classList.add("open");
    $("#drawer-scrim").classList.add("open");
    $("#compare-drawer").setAttribute("aria-hidden", "false");
    var trigger = $("#compare-trigger");
    if (trigger) { trigger.setAttribute("aria-expanded", "true"); }
    $("#compare-close").focus();
  }
  function closeDrawer() {
    $("#compare-drawer").classList.remove("open");
    $("#drawer-scrim").classList.remove("open");
    $("#compare-drawer").setAttribute("aria-hidden", "true");
    var trigger = $("#compare-trigger");
    if (trigger) { trigger.setAttribute("aria-expanded", "false"); }
  }

  function csvCell(value) {
    return '"' + String(value || "").replace(/"/g, '""') + '"';
  }
  function exportComparison() {
    var headers = ["Title", "Issuer", "Jurisdiction", "Domain", "Instrument", "Status", "Binding", "Year", "Rural action", "Source"];
    var rows = [headers.map(csvCell).join(",")];
    compareIds.forEach(function (id) {
      var policy = POLICIES.find(function (item) { return item.id === id; });
      rows.push([
        policy.title, policy.issuer, policy.jurisdiction, policy.domain, policy.instrument,
        policy.status, policy.binding ? "Yes" : "No", policy.year, policy.ruralAction, policy.url
      ].map(csvCell).join(","));
    });
    var blob = new Blob(["\uFEFF" + rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = create("a");
    link.href = url;
    link.download = "rav-policy-comparison.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function setupUtilities() {
    $$("[data-policy-scope]").forEach(function (button) {
      button.addEventListener("click", function () {
        var scope = button.dataset.policyScope;
        if (scope === "federal-responsibility") {
          setExplorerFilters({ jurisdiction: "Federal", effect: "binding" });
        } else if (scope === "state-responsibility") {
          setExplorerFilters({ jurisdiction: "States & DC" });
        } else if (scope === "federal-framework") {
          setExplorerFilters({ jurisdiction: "Federal", effect: "guidance" });
        } else if (scope === "state-bills") {
          setExplorerFilters({ jurisdiction: "States & DC" });
        }
        $("#explorer").scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    var compareTrigger = $("#compare-trigger");
    if (compareTrigger) { compareTrigger.addEventListener("click", openDrawer); }
    $("#compare-close").addEventListener("click", closeDrawer);
    $("#drawer-scrim").addEventListener("click", closeDrawer);
    $("#compare-clear").addEventListener("click", function () {
      compareIds = [];
      persistCompare();
      renderCompare();
      renderPolicies();
    });
    $("#compare-export").addEventListener("click", exportComparison);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { closeDrawer(); }
    });

    $("#copy-link").addEventListener("click", function () {
      syncUrl();
      var button = this;
      var done = function () {
        button.textContent = "View copied";
        setTimeout(function () { button.textContent = "Copy this view"; }, 1400);
      };
      if (navigator.clipboard) {
        navigator.clipboard.writeText(location.href).then(done);
      } else {
        var input = create("textarea");
        input.value = location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
        done();
      }
    });

    var pending = false;
    function updateScroll() {
      pending = false;
      var available = document.documentElement.scrollHeight - innerHeight;
      $("#progress-bar").style.transform = "scaleX(" + (available > 0 ? scrollY / available : 0) + ")";
    }
    addEventListener("scroll", function () {
      if (!pending) { pending = true; requestAnimationFrame(updateScroll); }
    }, { passive: true });
    updateScroll();
  }

  hydrateState();
  fillMeta();
  renderStateMap();
  renderDomains();
  renderMatrix();
  renderAssessment();
  populateFilters();
  renderCompare();
  renderPolicies();
  setupUtilities();
})();
