# X Bookmarks Exporter

Export your X/Twitter bookmarks to markdown using the bird CLI.

## Prerequisites

- Node.js 18+
- [bird CLI](https://github.com/steipete/bird) - X/Twitter CLI tool

## Installation

```bash
# Install bird CLI globally
npm install -g @steipete/bird

# Or use npx (no install required)
npx @steipete/bird --version
```

## Authentication

Bird uses your browser cookies to authenticate with X/Twitter. You need to be logged into X in your browser.

### Option 1: Browser Cookies (Automatic)

Close your browser and run:

```bash
bird whoami
```

### Option 2: Manual Tokens

1. Open X/Twitter in your browser
2. Press F12 → Application → Cookies → `x.com`
3. Copy the values for `auth_token` and `ct0`

```bash
bird whoami --auth-token YOUR_AUTH_TOKEN --ct0 YOUR_CT0
```

Or set environment variables:

```bash
# Windows
set AUTH_TOKEN=your_auth_token
set CT0=your_ct0

# Linux/macOS
export AUTH_TOKEN=your_auth_token
export CT0=your_ct0
```

## Usage

### Fetch Bookmarks

```bash
# Fetch 30 bookmarks
bird bookmarks -n 30 --json > bookmarks.json

# Fetch all bookmarks
bird bookmarks --all --json > bookmarks.json

# Fetch from a specific folder
bird bookmarks --folder-id 123456789 --all --json > bookmarks.json
```

### Convert to Markdown

```bash
node convert-bookmarks-to-md.js bookmarks.json bookmarks.md
```

Or use default filenames:

```bash
node convert-bookmarks-to-md.js
# Reads: bookmarks.json
# Writes: bookmarks-YYYY-MM-DD.md
```

### One-liner

```bash
bird bookmarks --all --json > bookmarks.json && node convert-bookmarks-to-md.js
```

## Output Format

The markdown output includes:

- Author name and username
- Tweet date
- Full tweet text
- Quoted tweets (if any)
- Engagement metrics (likes, retweets, replies)
- Direct link to the tweet

Example:

```markdown
## Anthropic (@AnthropicAI)
**Date:** December 15, 2025 at 02:30 PM

Introducing Claude 4! Our most capable model yet.

- Likes: 5432 | Retweets: 1234 | Replies: 567
- [View tweet](https://x.com/AnthropicAI/status/1234567890123456789)
```

## Files

| File | Description |
|------|-------------|
| `convert-bookmarks-to-md.js` | Node.js script to convert JSON to markdown |
| `skills/x-bookmarks/SKILL.md` | Claude Code skill definition |
| `.claude-plugin/plugin.json` | Plugin manifest for marketplace distribution |
| `bookmarks.json` | Exported bookmarks (generated) |
| `bookmarks-YYYY-MM-DD.md` | Markdown output (generated) |

## Claude Code Plugin

This project is a Claude Code plugin. Once installed, you can ask Claude to "export my X bookmarks" and it will guide you through the process.

### Install from GitHub

```bash
/plugin install nickleefly/x-bookmarks
```

### Install Locally

```bash
/plugin install ./path/to/x-bookmarks
```

## Troubleshooting

### "Query ID invalid" error

Refresh the GraphQL query IDs:

```bash
bird query-ids --fresh
```

### Cookie extraction fails

Try a different browser or provide tokens manually:

```bash
bird bookmarks --all --json --cookie-source firefox
```

### Rate limiting (429)

Wait a few minutes and try with fewer bookmarks:

```bash
bird bookmarks -n 50 --json > bookmarks.json
```

## Resources

- [bird CLI](https://github.com/steipete/bird) - The CLI tool used for fetching bookmarks

## License

MIT
