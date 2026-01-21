#!/usr/bin/env node
/**
 * Convert X/Twitter bookmarks JSON to Markdown
 * Usage: node convert-bookmarks-to-md.js [input.json] [output.md]
 */

const fs = require('fs');
const path = require('path');

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown date';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function convertToMarkdown(bookmarks) {
  const now = new Date().toISOString().split('T')[0];
  const lines = [
    '# X Bookmarks',
    '',
    `Exported on: ${now}`,
    `Total bookmarks: ${bookmarks.length}`,
    '',
    '---',
    ''
  ];

  for (const tweet of bookmarks) {
    const authorName = tweet.author?.name || 'Unknown';
    const username = tweet.author?.username || 'unknown';
    const text = escapeMarkdown(tweet.text || '');
    const createdAt = formatDate(tweet.createdAt);
    const likes = tweet.likeCount ?? 0;
    const retweets = tweet.retweetCount ?? 0;
    const replies = tweet.replyCount ?? 0;
    const tweetUrl = `https://x.com/${username}/status/${tweet.id}`;

    lines.push(`## ${authorName} (@${username})`);
    lines.push(`**Date:** ${createdAt}`);
    lines.push('');
    lines.push(text);
    lines.push('');
    lines.push(`- Likes: ${likes} | Retweets: ${retweets} | Replies: ${replies}`);
    lines.push(`- [View tweet](${tweetUrl})`);

    // Handle quoted tweet if present
    if (tweet.quotedTweet) {
      const qt = tweet.quotedTweet;
      const qtAuthor = qt.author?.name || 'Unknown';
      const qtUsername = qt.author?.username || 'unknown';
      const qtText = escapeMarkdown(qt.text || '');
      lines.push('');
      lines.push(`> **Quoted: ${qtAuthor} (@${qtUsername})**`);
      lines.push(`> ${qtText.split('\n').join('\n> ')}`);
    }

    lines.push('');
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}

function main() {
  const args = process.argv.slice(2);

  const inputFile = args[0] || 'bookmarks.json';
  const defaultOutput = `bookmarks-${new Date().toISOString().split('T')[0]}.md`;
  const outputFile = args[1] || defaultOutput;

  if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file "${inputFile}" not found`);
    console.error('Usage: node convert-bookmarks-to-md.js [input.json] [output.md]');
    process.exit(1);
  }

  try {
    const jsonContent = fs.readFileSync(inputFile, 'utf-8');
    const bookmarks = JSON.parse(jsonContent);

    if (!Array.isArray(bookmarks)) {
      console.error('Error: JSON file should contain an array of bookmarks');
      process.exit(1);
    }

    const markdown = convertToMarkdown(bookmarks);
    fs.writeFileSync(outputFile, markdown, 'utf-8');

    console.log(`Successfully converted ${bookmarks.length} bookmarks to ${outputFile}`);
  } catch (error) {
    console.error('Error processing bookmarks:', error.message);
    process.exit(1);
  }
}

main();
