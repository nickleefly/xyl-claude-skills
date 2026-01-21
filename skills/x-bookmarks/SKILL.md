---
name: x-bookmarks
description: Export X/Twitter bookmarks to markdown. Use when asked to fetch, export, or save bookmarks from X/Twitter.
---

# X Bookmarks Export Skill

Export X/Twitter bookmarks to markdown via `bird` CLI and `convert-bookmarks-to-md.js`.

## Prerequisites

- Install `bird`: `npm install -g @steipete/bird`
- Log into X in browser (Safari/Chrome/Firefox) for cookie auth

## Environment Setup

Add these environment variables to `~/.bashrc`:

```bash
export AUTH_TOKEN="your_auth_token"
export CT0="your_ct0"
```

After adding, reload with `source ~/.bashrc`.

To get these values, open X.com in your browser, press F12, go to Application > Cookies, and find:
- `auth_token` → use as AUTH_TOKEN
- `ct0` → use as CT0

## Usage

### 1. Verify Setup

```bash
bird whoami --auth-token $AUTH_TOKEN --ct0 $CT0
```

### 2. Fetch Bookmarks

```bash
# Fetch all bookmarks
bird bookmarks --all --json --auth-token $AUTH_TOKEN --ct0 $CT0 > bookmarks.json

# Fetch specific count (e.g., last 50)
bird bookmarks -n 50 --json --auth-token $AUTH_TOKEN --ct0 $CT0 > bookmarks.json

# Fetch from a specific folder/collection
bird bookmarks --folder-id <id> --json --auth-token $AUTH_TOKEN --ct0 $CT0 > bookmarks.json
```

**Note:** Bird CLI doesn't support filtering by date. To get bookmarks from a specific date range, fetch all bookmarks and filter programmatically by the `created_at` field in the JSON.

### 3. Convert to Markdown

```bash
node convert-bookmarks-to-md.js [input.json] [output.md]
```

- Input defaults to `bookmarks.json`
- Output defaults to `bookmarks-[YYYY-MM-DD].md`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Query ID error | Run `bird query-ids --fresh` |
| Rate limit | Wait and retry with `-n <smaller_count>` |
| Auth failed | Verify tokens in `~/.bashrc`, run `source ~/.bashrc` |
| Cookies expired | Get fresh tokens from browser cookies |
