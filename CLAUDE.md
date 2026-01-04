# X Bookmarks Plugin

This repository contains a Claude Code plugin that allows users to export their X/Twitter bookmarks to markdown.

## Commands

- **Install Plugin Locally**: `/plugin install .`
- **Run Conversion Script**: `node convert-bookmarks-to-md.js [input.json] [output.md]`
- **Fetch Bookmarks (Manual)**: `bird bookmarks -n 30 --json > bookmarks.json`

## Project Structure

- `skills/x-bookmarks/SKILL.md`: The definition of the Claude Code skill.
- `.claude-plugin/plugin.json`: Plugin manifest file.
- `convert-bookmarks-to-md.js`: Node.js utility script for JSON -> Markdown conversion.
- `README.md`: User documentation.

## Development Workflow

1. Modify `skills/x-bookmarks/SKILL.md` to update agent instructions.
2. Modify `convert-bookmarks-to-md.js` to change the markdown output format.
3. Re-install the plugin locally to test changes: `/plugin install .`

## Style Guidelines

- **JavaScript**: Use standard Node.js patterns, no external dependencies if possible.
- **Markdown**: Use standard GitHub Flavored Markdown.
- **Skill Definition**: Follow Claude Code skill documentation for clear, step-by-step instructions.
