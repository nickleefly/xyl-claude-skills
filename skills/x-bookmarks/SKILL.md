---
name: x-bookmarks
description: Export X/Twitter bookmarks to markdown. Use for fetching/exporting bookmarks.
---

# X Bookmarks Export Skill

Export X/Twitter bookmarks to markdown via `bird` CLI and `convert-bookmarks-to-md.js`.

## Prerequisites

- Install `bird`: `npm install -g @steipete/bird`.
- Log into X in browser (Safari/Chrome/Firefox) for cookie auth.

## Usage

1. **Verify bird**: `bird --version`.
2. **Verify Auth**: `bird whoami`. If fails, log into X in browser or use `bird whoami --cookie-source [safari|chrome|firefox]`.
3. **Fetch JSON**:
   - `bird bookmarks --all --json > bookmarks.json` (or use `-n <count>`).
4. **Convert**:
   Run `node convert-bookmarks-to-md.js bookmarks.json` to generate the markdown file.

## Troubleshooting
- **Query ID error**: `bird query-ids --fresh`
- **Rate Limit**: Wait and retry with fewer bookmarks.
- **Cookies**: Use `--cookie-source` or `--auth-token <token> --ct0 <ct0>`.
