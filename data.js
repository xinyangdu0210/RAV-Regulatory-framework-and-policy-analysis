var POLICY_META = {
  title: "RAV Policy",
  scope: "United States federal policy, all 50 states, and the District of Columbia",
  verified: "",
  disclaimer: "Educational policy-planning resource; not legal advice."
};

/*
  Add only policy records and source links supplied by the project owner.

  Record format:
  {
    id: "unique-id",
    title: "Policy or bill title",
    issuer: "Issuing agency or legislature",
    jurisdiction: "Federal, state name, or District of Columbia",
    domain: "Safety assurance",
    instrument: "Law, bill, regulation, guidance, or other type",
    status: "Current status",
    year: 2026,
    binding: false,
    rural: "Direct, Conditional, or Transferable",
    summary: "Source-based summary",
    ruralAction: "Source-based implementation action",
    url: "Source URL supplied by the project owner"
  }
*/
var POLICIES = [];

/*
  Add only state and District of Columbia AV-law records supplied by the
  project owner. Add one object for each statute or bill.

  Record format:
  {
    state: "California",
    code: "CA",
    title: "Official title of the AV law or bill",
    statute: "Statutory citation",
    billNumber: "Bill number",
    status: "Enacted, pending, failed, or other supplied status",
    year: 2026,
    summary: "Source-based summary",
    url: "Source URL supplied by the project owner"
  }
*/
var STATE_AV_LAWS = [];
