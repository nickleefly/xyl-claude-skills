---
name: x-bookmarks
description: Export X/Twitter bookmarks to markdown. Use when the user asks to fetch, export, or download their X or Twitter bookmarks.
---

# X Bookmarks Export Skill

Export your X/Twitter bookmarks to a markdown file using the bird CLI.

## Prerequisites

Before using this skill, ensure you have the bird CLI installed:

```bash
# Install globally with npm
npm install -g @steipete/bird

# Or with pnpm
pnpm add -g @steipete/bird

# Or with bun
bun add -g @steipete/bird

# On macOS with Homebrew
brew install steipete/tap/bird
```

You also need to be logged into X/Twitter in your browser (Safari, Chrome, or Firefox). The bird CLI will use your browser cookies for authentication.

## Usage

When the user invokes this skill, perform the following steps:

### Step 1: Verify bird CLI is installed

```bash
bird --version
```

If bird is not installed, provide installation instructions and stop.

### Step 2: Verify authentication

```bash
bird whoami
```

If authentication fails, instruct the user to:
1. Log into X/Twitter in their browser
2. Try specifying a cookie source: `bird whoami --cookie-source safari` (or chrome/firefox)

### Step 3: Fetch bookmarks

Fetch all bookmarks as JSON:

```bash
bird bookmarks --all --json > bookmarks.json
```

For a limited number of bookmarks:

```bash
bird bookmarks -n 100 --json > bookmarks.json
```

To fetch from a specific bookmark folder:

```bash
bird bookmarks --folder-id <folder-id> --all --json > bookmarks.json
```

### Step 4: Convert to Markdown

Read the JSON file and convert it to a well-formatted markdown file with the following structure:

```markdown
# X Bookmarks

Exported on: [date]
Total bookmarks: [count]

---

## [Tweet Author Name] (@username)
**Date:** [createdAt]

[Tweet text content]

- Likes: [likeCount] | Retweets: [retweetCount] | Replies: [replyCount]
- [Link to tweet](https://x.com/username/status/[id])

---
```

### JSON Schema Reference

Each bookmark object contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Tweet ID |
| `text` | string | Full tweet text |
| `author` | object | `{ username, name }` |
| `authorId` | string | Author's user ID |
| `createdAt` | string | Timestamp |
| `replyCount` | number | Number of replies |
| `retweetCount` | number | Number of retweets |
| `likeCount` | number | Number of likes |
| `conversationId` | string | Thread conversation ID |
| `quotedTweet` | object | Embedded quote tweet (if present) |

### Step 5: Output the markdown file

Write the markdown to a file named `bookmarks-[YYYY-MM-DD].md` or a user-specified filename.

## Options

The user may specify:
- **Number of bookmarks**: `-n <count>` or fetch all with `--all`
- **Folder ID**: `--folder-id <id>` for specific bookmark folder
- **Output filename**: Custom filename for the markdown export
- **Cookie source**: `--cookie-source safari|chrome|firefox`

## Example Output

```markdown
# X Bookmarks

Exported on: 2026-01-04
Total bookmarks: 42

---

## Anthropic (@AnthropicAI)
**Date:** 2025-12-15T14:30:00.000Z

Introducing Claude 4! Our most capable model yet with improved reasoning and coding abilities.

- Likes: 5432 | Retweets: 1234 | Replies: 567
- [View tweet](https://x.com/AnthropicAI/status/1234567890123456789)

---

## OpenAI (@OpenAI)
**Date:** 2025-12-10T10:00:00.000Z

New research paper on AI safety...

- Likes: 3210 | Retweets: 890 | Replies: 234
- [View tweet](https://x.com/OpenAI/status/9876543210987654321)

---
```

## Troubleshooting

### "Query ID invalid" error
The bird CLI may need to refresh its GraphQL query IDs:
```bash
bird query-ids --fresh
```

### Rate limiting (429 error)
Wait a few minutes and try again with fewer bookmarks.

### Cookie extraction fails
Try specifying a different cookie source:
```bash
bird bookmarks --all --json --cookie-source chrome
```

Or manually provide auth tokens:
```bash
bird bookmarks --all --json --auth-token <token> --ct0 <ct0>
```
