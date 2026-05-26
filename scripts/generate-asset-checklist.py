#!/usr/bin/env python3
"""Generate docs/asset-upload-checklist.csv from src + public inventory."""
# Run from repo root: python3 scripts/generate-asset-checklist.py

import csv
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
PUBLIC = ROOT / "public"
OUT = ROOT / "docs" / "asset-upload-checklist.csv"
OUT_MISSING = ROOT / "docs" / "asset-upload-checklist-missing-only.csv"

PDF_RE = re.compile(
    r"""(?:href|src)\s*=\s*["'](/assets/(?:docs|documents)/[^"']+\.pdf)["']""",
    re.I,
)
IMG_RE = re.compile(
    r"""(?:href|src)\s*=\s*["'](/assets/images/[^"']+\.(?:jpg|jpeg|png|gif|webp|svg))["']""",
    re.I,
)
FAC_IMG_FIELD = re.compile(r"""image:\s*['"]([^'"]+)['"]""")


def owner_for(path: str) -> str:
    p = path.lower()
    if "placeholder" in p:
        return "Raghu" if "/faculty/" in p else "Marketing/Admin"
    if p.endswith(".pdf"):
        if any(
            x in p
            for x in [
                "brochure",
                "newsletter",
                "placement",
                "civil",
                "cse",
                "ece",
                "eee",
                "mechanical",
                "it",
                "aiml",
                "aids",
                "cic",
                "csbs",
                "csd",
                "csit",
            ]
        ):
            if "brochure" in p or "newsletter" in p or "placement" in p:
                return "Dept Admin"
        if "/assets/docs/" in p:
            return "Admin"
        return "Admin/Research"
    if "/faculty/" in p:
        return "Raghu"
    if "/recruiters/" in p:
        return "Placements Team"
    return "Admin"


def priority_for(path: str, exists: bool) -> str:
    if exists:
        return "Done"
    if "placeholder" in path.lower():
        return "P1"
    if path.endswith(".pdf") and ("admission" in path or "brochure" in path):
        return "P1"
    if "/faculty/" in path:
        return "P1"
    return "P2"


def main() -> None:
    rows = []
    seen = set()

    def add_row(asset_path, page_files, asset_type, notes=""):
        if not asset_path.startswith("/"):
            asset_path = "/" + asset_path
        key = (asset_path, asset_type)
        if key in seen:
            return
        seen.add(key)
        disk = PUBLIC / asset_path.lstrip("/")
        exists = disk.is_file() and disk.stat().st_size > 100
        pages = sorted(set(page_files))
        page_sample = pages[0] if pages else ""
        page_route = (
            "/"
            + page_sample.replace("src/pages/", "").replace("/index.astro", "/").replace(
                "index.astro", "/"
            )
        )
        rows.append(
            {
                "priority": priority_for(asset_path, exists),
                "status": "Exists" if exists else "Missing",
                "asset_path": asset_path,
                "upload_to": f"public{asset_path}",
                "type": asset_type,
                "owner": owner_for(asset_path),
                "example_page": page_route,
                "source_files": "; ".join(pages[:3])
                + ("..." if len(pages) > 3 else ""),
                "notes": notes,
            }
        )

    for astro in SRC.rglob("*.astro"):
        rel = str(astro.relative_to(ROOT))
        text = astro.read_text(encoding="utf-8", errors="ignore")
        for m in PDF_RE.finditer(text):
            add_row(m.group(1), [rel], "PDF")
        for m in IMG_RE.finditer(text):
            add_row(m.group(1), [rel], "Image")

    for astro in SRC.rglob("*.astro"):
        rel = str(astro.relative_to(ROOT))
        text = astro.read_text(encoding="utf-8", errors="ignore")
        if "/faculty/" not in rel and "/committees/" not in rel:
            continue
        dept_match = re.search(r"departments/([^/]+)/", rel)
        dept = dept_match.group(1) if dept_match else None
        if not dept or not ("faculty/index" in rel or "committees/index" in rel):
            continue
        for img_id in FAC_IMG_FIELD.findall(text):
            if img_id in ("null", "None", ""):
                add_row(
                    f"/assets/images/faculty/{dept}/null.jpg",
                    [rel],
                    "Image",
                    "No IRINS photo",
                )
            elif img_id == "PLACEHOLDER":
                add_row(
                    f"/assets/images/faculty/{dept}/PLACEHOLDER.jpg",
                    [rel],
                    "Image",
                    "Replace PLACEHOLDER",
                )
            else:
                note = ""
                if re.match(r"^(hod|prof-|assoc-|bos-)", img_id):
                    note = "Legacy committee name — use IRINS numeric ID"
                add_row(f"/assets/images/faculty/{dept}/{img_id}.jpg", [rel], "Image", note)

    pri_order = {"P1": 0, "P2": 1, "Done": 2}
    rows.sort(
        key=lambda r: (
            r["status"] == "Exists",
            pri_order.get(r["priority"], 9),
            r["asset_path"],
        )
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    fields = list(rows[0].keys()) if rows else []
    with OUT.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(rows)

    missing = [r for r in rows if r["status"] == "Missing"]
    with OUT_MISSING.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(missing)

    print(f"Wrote {OUT} ({len(rows)} rows, {len(missing)} missing)")
    print(f"Wrote {OUT_MISSING}")


if __name__ == "__main__":
    main()
