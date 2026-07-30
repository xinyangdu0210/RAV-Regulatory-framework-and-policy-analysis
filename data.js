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
  project owner. The field names below correspond to the spreadsheet columns.

  Record format:
  {
    state: "California",
    code: "CA",
    avSpecificStatute: "Yes or No",
    avSpecificRegulation: "Supplied regulation information",
    currentLegalStatus: "Current AV legal status",
    originalBill: "Original bill/file number",
    primarySponsor: "Primary sponsor and position",
    relevantCommittee: "Relevant committee",
    enactedAct: "Enacted act",
    currentCodeCitation: "Current code citation",
    safetyDriverRequirement: "Safety-driver requirement or driverless allowance",
    liabilityCoverage: "Liability coverage requirements",
    commercialDeployment: "Commercial deployment information",
    procedure: "Required procedure",
    url: "Optional source URL supplied by the project owner"
  }
*/
var STATE_AV_LAWS = [
  {
    state: "Alabama",
    code: "AL",
    avSpecificStatute: "Yes",
    avSpecificRegulation: "No comprehensive AV-specific administrative regulation located",
    currentLegalStatus: "Driverless operation authorized by statute",
    originalBill: "SB 226 (2024)",
    primarySponsor: "Senator Gerald H. Allen",
    relevantCommittee: "Committee on Transportation and Energy",
    enactedAct: "Act 2024-453",
    currentCodeCitation: "Ala. Code §§ 32-9C-1–32-9C-11",
    safetyDriverRequirement: "No in-vehicle safety driver required. An ADS-equipped vehicle may operate on public roads without a conventional human driver physically present if it can achieve a minimal-risk condition. Ala. Code § 32-9C-2(b).",
    liabilityCoverage: "At least $100,000 single-limit liability coverage through insurance or approved self-insurance for a fully autonomous vehicle. Proof must be submitted to the Alabama Department of Revenue. Ala. Code § 32-9C-3. A fully autonomous vehicle operating on an on-demand autonomous vehicle network must satisfy the additional insurance requirements in § 32-9C-4.",
    commercialDeployment: "Yes, for on-demand autonomous vehicle networks. Such networks may operate under Alabama transportation-network-company laws, and vehicles operating on the network must satisfy the insurance requirements in § 32-9C-4. Ala. Code § 32-9C-10.",
    procedure: "",
    url: ""
  },
  {
    state: "Alaska",
    code: "AK",
    avSpecificStatute: "No",
    avSpecificRegulation: "No comprehensive AV-specific administrative regulation located",
    currentLegalStatus: "No enacted comprehensive AV-specific framework; legislation pending",
    originalBill: "SB 148 (2025), pending; HB 217 (2025), pending",
    primarySponsor: "SB 148: Sen. Robert Myers; co-sponsor Sen. Elvi Gray-Jackson. HB 217: Alaska House Transportation Committee",
    relevantCommittee: "SB 148: Senate Transportation Committee; additionally referred to Senate State Affairs Committee. HB 217: House Transportation Committee; additionally referred to House Community and Regional Affairs Committee.",
    enactedAct: "",
    currentCodeCitation: "NA",
    safetyDriverRequirement: "NA",
    liabilityCoverage: "NA",
    commercialDeployment: "NA",
    procedure: "",
    url: ""
  },
  {
    state: "Arizona",
    code: "AZ",
    avSpecificStatute: "Yes",
    avSpecificRegulation: "No comprehensive AV-specific administrative regulation located",
    currentLegalStatus: "Testing, driverless operation, and commercial passenger deployment are legally allowed",
    originalBill: "H.B. 2813 (2021)",
    primarySponsor: "Jeff Weninger",
    relevantCommittee: "",
    enactedAct: "",
    currentCodeCitation: "Ariz. Rev. Stat. §§ 28-9701–28-9708",
    safetyDriverRequirement: "Driverless allowed. An AV may operate with a licensed human driver capable of taking control. A Level 4 or Level 5 fully autonomous vehicle may operate without a human driver after submitting a law-enforcement interaction plan and required written certification to ADOT.",
    liabilityCoverage: "It didn’t specify a special AV liability limit; it stated: “The fully autonomous vehicle meets all applicable certificate of title, registration, licensing and insurance requirements of this title.”",
    commercialDeployment: "Yes, A.R.S. § 28-9704 authorizes on-demand autonomous vehicle networks to operate under Arizona’s transportation-network-company framework, including passenger transportation for hire or compensation.",
    procedure: "A fully autonomous vehicle may operate on public roads without a human driver only if a person submits both: 1. A law enforcement interaction plan to the department of transportation and the department of public safety. 2. A written statement to the department of transportation.",
    url: ""
  },
  {
    state: "Arkansas",
    code: "AR",
    avSpecificStatute: "Yes",
    avSpecificRegulation: "Yes, 27 CAR § 115",
    currentLegalStatus: "Autonomous and fully autonomous vehicle operation is permitted under a State Highway Commission-approved AV program",
    originalBill: "H.B. 1562 (2021)",
    primarySponsor: "Rep. Austin McCollum — Arkansas House of Representatives",
    relevantCommittee: "House Public Transportation Committee; Senate Transportation, Technology and Legislative Affairs Committee.",
    enactedAct: "",
    currentCodeCitation: "Arkansas Code § 27-51-2001-2006",
    safetyDriverRequirement: "A human operator is required for the first six months; driverless operation and commercial service may be approved afterward.",
    liabilityCoverage: "27 CAR § 115-103. Application. (3) Proof that the autonomous vehicle program complies with the minimum liability insurance coverage requirements for a motor carrier of property under 49 C.F.R. § 387.9 as it existed on January 1, 2021.",
    commercialDeployment: "Yes, conditionally permitted under Ark. Code Ann. §§ 27-51-2002 and 27-51-2003; 27 CAR §§ 115-103 and 115-105.",
    procedure: "The operator must first submit an autonomous vehicle program application and obtain approval from the Arkansas State Highway Commission.",
    url: ""
  }
];
