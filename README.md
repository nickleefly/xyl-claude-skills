# XYL Claude Skills

Collection of Claude Code skills for X/Twitter bookmarks export and Substack publishing.

## Installation

### Quick Install (Recommended)

In Claude Code, register the marketplace first:

```bash
/plugin marketplace add nickleefly/xyl-skills
```

Then install the plugin:

```bash
/plugin install x-bookmarks@xyl-skills
```

### Verify Installation

Check that skills appear:

```bash
/help
```

## Available Skills

### Content Skills

| Skill | Description | Command |
|-------|-------------|---------|
| [x-bookmarks](skills/x-bookmarks/SKILL.md) | Export X/Twitter bookmarks to markdown using the bird CLI | `/x-bookmarks` |

#### x-bookmarks

Export X/Twitter bookmarks to markdown format.

```bash
/x-bookmarks
```

Prerequisites:
- Install `bird`: `npm install -g @steipete/bird`
- Log into X in browser for cookie auth

## License

MIT
