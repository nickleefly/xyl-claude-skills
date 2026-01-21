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
2. **Verify Auth**: `bird whoami`
3. **Set environment variables** in `.bashrc` file

```bash
export AUTH_TOKEN="your_auth_token"
export CT0="your_ct0"
```

verify with `bird whoami --auth-token $AUTH_TOKEN --ct0 $CT0`

4. **Fetch JSON**:
   - `bird bookmarks --all --json > bookmarks.json` (or use `-n <count>`).
5. **Convert**:
   The `convert-bookmarks-to-md.js` script in this plugin converts the JSON to markdown.
   Usage: `node convert-bookmarks-to-md.js [input.json] [output.md]`
   - Input defaults to `bookmarks.json`
   - Output defaults to `bookmarks-[YYYY-MM-DD].md`

## Troubleshooting
- **Query ID error**: `bird query-ids --fresh`
- **Rate Limit**: Wait and retry with fewer bookmarks.
- **Cookies**: Use `--cookie-source` or `--auth-token <token> --ct0 <ct0>`.
