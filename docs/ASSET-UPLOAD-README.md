# Asset upload checklist

Generated from the Astro source tree and `public/` file inventory.

## Files

| File | Description |
|------|-------------|
| [`asset-upload-checklist.csv`](./asset-upload-checklist.csv) | All referenced assets (exists + missing) |
| [`asset-upload-checklist-missing-only.csv`](./asset-upload-checklist-missing-only.csv) | **Upload queue** — only missing files |

## Columns

| Column | Meaning |
|--------|---------|
| `priority` | `P1` = admissions/faculty/PLACEHOLDER; `P2` = other PDFs/images; `Done` = already on disk |
| `status` | `Missing` or `Exists` |
| `asset_path` | URL path on the live site (e.g. `/assets/images/faculty/cse/221.jpg`) |
| `upload_to` | Where to put the file in the repo (`public/...`) |
| `owner` | Suggested responsible team |
| `example_page` | Page route to verify after upload |
| `source_files` | Astro files that reference this asset |
| `notes` | Extra context (IRINS ID, committee naming, etc.) |

## Owners

| Owner | Responsibility |
|-------|----------------|
| **Raghu** | Faculty photos under `public/assets/images/faculty/{dept}/` |
| **Dept Admin** | Department brochures, newsletters, placement PDFs |
| **Admin** | Institute PDFs under `public/assets/docs/` |
| **Admin/Research** | Research, IPR, policy PDFs |
| **Placements Team** | Recruiter logos (`public/assets/images/recruiters/`) |
| **Marketing/Admin** | Section PLACEHOLDER images (clubs, well-being, etc.) |

## After uploading

1. Place file at exact `upload_to` path (case-sensitive filenames).
2. Open `example_page` in browser and confirm the asset loads.
3. Re-run locally: `npm run build` (optional: broken-link audit script).

## Regenerate checklist

```bash
python3 scripts/generate-asset-checklist.py
```

(Or ask dev to re-run the generator after large content changes.)
