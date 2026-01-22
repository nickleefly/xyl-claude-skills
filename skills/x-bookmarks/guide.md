# X Bookmarks Plugin

This  plugin allows users to export their X/Twitter bookmarks to markdown.

## Commands

- **Run Conversion Script**: `node skills/x-bookmarks/convert-bookmarks-to-md.js [input.json] [output.md]`
- **Fetch Bookmarks (Manual)**: `bird bookmarks -n 30 --json > bookmarks.json` (or `bird bookmarks --all --json` for all bookmarks)

## Project Structure

- `skills/x-bookmarks/SKILL.md`: The definition of the Claude Code skill.
- `skills/x-bookmarks/guide.md`: This development guide.
- `skills/x-bookmarks/convert-bookmarks-to-md.js`: Node.js utility script for JSON -> Markdown conversion.

## Development Workflow

1. Modify `skills/x-bookmarks/SKILL.md` to update agent instructions.
2. Modify `skills/x-bookmarks/convert-bookmarks-to-md.js` to change the markdown output format.
3. Re-install the plugin locally to test changes: `/plugin install .`

## Style Guidelines

- **JavaScript**: Use standard Node.js patterns, no external dependencies if possible.
- **Markdown**: Use standard GitHub Flavored Markdown.
- **Skill Definition**: Follow Claude Code skill documentation for clear, step-by-step instructions.