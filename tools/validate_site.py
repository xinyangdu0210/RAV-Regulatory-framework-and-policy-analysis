"""Static consistency checks for the RAV Policy Navigator."""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
DOMAINS = {
    "Safety assurance",
    "Vehicle compliance",
    "Transit operations",
    "Infrastructure",
    "Data & cybersecurity",
    "Accessibility",
}
REQUIRED_FIELDS = {
    "id",
    "title",
    "issuer",
    "jurisdiction",
    "domain",
    "instrument",
    "status",
    "year",
    "binding",
    "rural",
    "summary",
    "ruralAction",
    "url",
}
OFFICIAL_HOST_SUFFIXES = (
    ".gov",
    ".ga.gov",
    "legis.ga.gov",
    "dot.ga.gov",
)


def parse_variable(raw: str, name: str, end_pattern: str) -> object:
    match = re.search(rf"var {name} = ({end_pattern});", raw, re.S)
    if not match:
        raise AssertionError(f"Could not parse {name}")
    javascript = match.group(1)
    strict_json = re.sub(
        r"(^\s*|,\s*)([A-Za-z_$][A-Za-z0-9_$]*)\s*:",
        lambda found: f'{found.group(1)}"{found.group(2)}":',
        javascript,
        flags=re.M,
    )
    return json.loads(strict_json)


def main() -> None:
    data_raw = (ROOT / "data.js").read_text(encoding="utf-8")
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    app = (ROOT / "app.js").read_text(encoding="utf-8")
    css = (ROOT / "style.css").read_text(encoding="utf-8")

    meta = parse_variable(data_raw, "POLICY_META", r"\{.*?\}")
    policies = parse_variable(data_raw, "POLICIES", r"\[.*\]")

    assert meta["verified"] == "2026-07-30"
    assert len(policies) >= 18
    assert all(REQUIRED_FIELDS <= set(policy) for policy in policies)
    assert len({policy["id"] for policy in policies}) == len(policies)
    assert len({policy["url"] for policy in policies}) == len(policies)
    assert {policy["domain"] for policy in policies} == DOMAINS
    assert {policy["jurisdiction"] for policy in policies} == {"Federal", "Georgia"}
    assert all(isinstance(policy["binding"], bool) for policy in policies)
    assert all(1990 <= policy["year"] <= 2026 for policy in policies)
    assert all(len(policy["summary"]) >= 60 for policy in policies)
    assert all(len(policy["ruralAction"]) >= 60 for policy in policies)

    for policy in policies:
        parsed = urlparse(policy["url"])
        assert parsed.scheme == "https"
        host = (parsed.hostname or "").lower()
        assert any(host == suffix.lstrip(".") or host.endswith(suffix) for suffix in OFFICIAL_HOST_SUFFIXES), (
            policy["id"],
            host,
        )

    ids = re.findall(r'\sid="([^"]+)"', html)
    assert len(ids) == len(set(ids))
    required_ids = {
        "framework",
        "landscape",
        "readiness",
        "explorer",
        "roadmap",
        "domain-wheel",
        "domain-detail",
        "policy-matrix",
        "assessment-form",
        "score-card",
        "policy-list",
        "compare-drawer",
    }
    assert required_ids <= set(ids)
    assert '<script src="data.js"></script>' in html
    assert '<script src="app.js"></script>' in html
    assert "POLICIES" in app and "DOMAIN_INFO" in app
    assert "@media (max-width: 720px)" in css
    assert "@media (prefers-reduced-motion: reduce)" in css
    assert "@media print" in css

    counts = Counter(policy["domain"] for policy in policies)
    print(
        f"Validated {len(policies)} official policy records across "
        f"{len(DOMAINS)} domains; binding={sum(policy['binding'] for policy in policies)}"
    )
    print("Domain counts:", dict(sorted(counts.items())))


if __name__ == "__main__":
    main()
