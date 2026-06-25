#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERCEL_JSON_PATH = ROOT / "vercel.json"
ASTRO_CONFIG_PATH = ROOT / "astro.config.mjs"
CONSTS_PATH = ROOT / "src/consts.ts"

def main():
    # 1. Read vercel.json redirects
    with open(VERCEL_JSON_PATH, "r", encoding="utf-8") as f:
        config = json.load(f)
        redirects = config.get("redirects", [])

    # 2. Build static redirects JS object string
    lines = ["{\n"]
    for rule in redirects:
        source = rule.get("source", "")
        destination = rule.get("destination", "")
        if not source or not destination:
            continue
        if "(.*)" in source:
            continue
        lines.append(f"    {json.dumps(source)}: {{ status: 302, destination: {json.dumps(destination)} }},\n")
    lines.append("  }")
    static_redirects_js = "".join(lines)

    # 3. Read astro.config.mjs
    content = ASTRO_CONFIG_PATH.read_text(encoding="utf-8")

    # 4. Replace the SITE definition in astro.config.mjs
    content = content.replace(
        "const SITE = 'https://www.srkrec.ac.in';",
        "const SITE = 'https://www.srkrec.ac.in';"
    )

    # Update SITE_URL in src/consts.ts
    if CONSTS_PATH.exists():
        consts_content = CONSTS_PATH.read_text(encoding="utf-8")
        consts_content = consts_content.replace(
            "export const SITE_URL = 'https://www.srkrec.ac.in';",
            "export const SITE_URL = 'https://www.srkrec.ac.in';"
        )
        CONSTS_PATH.write_text(consts_content, encoding="utf-8")

    # 5. Replace any existing astroRedirects definition (dynamic or static)
    # This matches: const astroRedirects = { ... } [as const];
    pattern = r"(/\*\* @type \{.*?\} \*/\s*)?const astroRedirects = \{[\s\S]*?\n  \}( as const)?;"
    replacement = f"/** @type {{Record<string, import('astro').RedirectConfig>}} */\nconst astroRedirects = {static_redirects_js};"

    # Also handle the original dynamic version if it is still present
    dynamic_pattern = r"// Load and compile redirects from vercel.json for Astro[\s\S]*?const astroRedirects = \{\};[\s\S]*?for[\s\S]*?\}[\s\S]*?\}[\s\S]*?\n"
    
    if re.search(dynamic_pattern, content):
        content = re.sub(dynamic_pattern, replacement + "\n", content)
    else:
        content = re.sub(pattern, replacement, content)

    # 6. Remove fs import if no longer needed
    content = content.replace("import fs from 'node:fs';\n", "")

    # 7. Write updated content
    ASTRO_CONFIG_PATH.write_text(content, encoding="utf-8")
    print("astro.config.mjs successfully updated with static redirects and the new SITE URL.")

if __name__ == "__main__":
    main()
