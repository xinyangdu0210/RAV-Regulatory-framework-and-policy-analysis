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
