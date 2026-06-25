#!/usr/bin/env python3
"""
Download syllabus + institute PDFs from srkrec.ac.in / srkrec.ac.in into public/.

Usage:
  python3 scripts/download-srkr-pdfs.py --institute
  python3 scripts/download-srkr-pdfs.py --syllabus
  python3 scripts/download-srkr-pdfs.py --all
"""
from __future__ import annotations

import argparse
import re
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import quote, urljoin

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
SYLLABUS_PAGE = ROOT / "src/pages/syllabus/index.astro"

AC_IN = "https://srkrec.ac.in"
AC_EDU = "https://srkrec.ac.in"

# Old-site path -> local SEO-friendly path (under public/)
INSTITUTE_MAP: list[tuple[str, str, str]] = [
    # (source_base, remote_path, local_path relative to public/)
    (AC_IN, "files/research_policy.pdf", "assets/documents/research-policy.pdf"),
    (AC_IN, "files/research_SDGs.pdf", "assets/documents/research-sdgs-un-sdgs.pdf"),
    (AC_IN, "files/RTI_Declaration.pdf", "assets/documents/rti-declaration.pdf"),
    (AC_IN, "files/Faculty_List_2026.pdf", "assets/documents/faculty-list-2026.pdf"),
    (AC_IN, "files/edc_activities.pdf", "assets/documents/edc-activities.pdf"),
    (AC_EDU, "files/mandates/ugc1.pdf", "assets/documents/mandates/ugc-extension-autonomous-status-2022-2032.pdf"),
    (AC_EDU, "files/mandates/2f&2b.pdf", "assets/documents/mandates/ugc-2f-12b-autonomous-status-2016-2022.pdf"),
]

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE

USER_AGENT = "SRKR-Website-Migration/1.0 (+https://www.srkrec.ac.in)"


def encode_url(base: str, path: str) -> str:
    """Encode each path segment for HTTP (spaces, &, etc.)."""
    segments = path.split("/")
    return urljoin(base + "/", "/".join(quote(s, safe="") for s in segments))


def download_one(url: str, dest: Path, retries: int = 3) -> tuple[bool, str]:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists() and dest.stat().st_size > 500:
        return True, "cached"

    last_err = ""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(req, timeout=120, context=CTX) as resp:
                data = resp.read()
                ctype = resp.headers.get("Content-Type", "")
                if len(data) < 200 and b"404" in data[:200]:
                    return False, "too small / likely error page"
                if "html" in ctype.lower() and not data.startswith(b"%PDF"):
                    return False, f"got HTML not PDF ({ctype})"
                dest.write_bytes(data)
                return True, f"{len(data)} bytes"
        except Exception as e:
            last_err = str(e)
            time.sleep(1 + attempt)
    return False, last_err


def collect_syllabus_paths() -> list[str]:
    text = SYLLABUS_PAGE.read_text(encoding="utf-8")
    paths = re.findall(r'href="(?:/)?(files/[^"]+\.pdf)"', text)
    return sorted(set(paths))


def run_institute() -> tuple[int, int]:
    ok = fail = 0
    print(f"\n=== Institute PDFs ({len(INSTITUTE_MAP)}) ===\n")
    for base, remote, local in INSTITUTE_MAP:
        url = encode_url(base, remote)
        dest = PUBLIC / local
        success, msg = download_one(url, dest)
        mark = "✓" if success else "✗"
        print(f"  {mark} {local}  <-  {remote}  ({msg})")
        if success:
            ok += 1
        else:
            fail += 1
    return ok, fail


def run_syllabus(workers: int = 8) -> tuple[int, int]:
    paths = collect_syllabus_paths()
    print(f"\n=== Syllabus PDFs ({len(paths)}) ===\n")

    ok = fail = 0
    tasks = []
    for rel in paths:
        url = encode_url(AC_IN, rel)
        dest = PUBLIC / rel
        tasks.append((rel, url, dest))

    def job(item: tuple[str, str, Path]) -> tuple[str, bool, str]:
        rel, url, dest = item
        success, msg = download_one(url, dest)
        return rel, success, msg

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(job, t): t for t in tasks}
        done = 0
        for fut in as_completed(futures):
            rel, success, msg = fut.result()
            done += 1
            if success:
                ok += 1
            else:
                fail += 1
                print(f"  ✗ {rel}  ({msg})")
            if done % 50 == 0 or done == len(tasks):
                print(f"  … {done}/{len(tasks)} ({ok} ok, {fail} failed)")

    return ok, fail


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--institute", action="store_true")
    parser.add_argument("--syllabus", action="store_true")
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--workers", type=int, default=8)
    args = parser.parse_args()

    if not (args.institute or args.syllabus or args.all):
        parser.print_help()
        return 1

    total_ok = total_fail = 0
    if args.institute or args.all:
        o, f = run_institute()
        total_ok += o
        total_fail += f
    if args.syllabus or args.all:
        o, f = run_syllabus(workers=args.workers)
        total_ok += o
        total_fail += f

    print(f"\nDone: {total_ok} downloaded, {total_fail} failed\n")
    return 0 if total_fail == 0 else 2


if __name__ == "__main__":
    sys.exit(main())
