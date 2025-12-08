#!/usr/bin/env node

/**
 * Helper script to update a book and automatically add/edit the lastEdited date
 * Usage: node scripts/update-book.js <book-id> [--title "New Title"] [--content "New content"] [--color "#color"]
 * 
 * Example: node scripts/update-book.js 000-1 --title "Updated Tools" --content "# My updated tools list"
 */

const fs = require('fs');
const path = require('path');

const bookId = process.argv[2];
if (!bookId) {
  console.error('Error: Book ID is required');
  console.log('Usage: node scripts/update-book.js <book-id> [--title "Title"] [--content "Content"] [--color "#color"]');
  process.exit(1);
}

// Parse arguments
const args = process.argv.slice(3);
const updates = {};
let currentKey = null;

args.forEach(arg => {
  if (arg.startsWith('--')) {
    currentKey = arg.slice(2);
  } else if (currentKey) {
    updates[currentKey] = arg;
  }
});

// Read book-edits.json
const dataDir = path.join(process.cwd(), 'src/data');
const editsFile = path.join(dataDir, 'book-edits.json');

let bookEdits = {};
try {
  if (fs.existsSync(editsFile)) {
    bookEdits = JSON.parse(fs.readFileSync(editsFile, 'utf-8'));
  }
} catch (error) {
  console.error('Error reading book-edits.json:', error);
}

// Get existing book data or create new entry
const existingBook = bookEdits[bookId] || { id: bookId };

// Update book with new data
const updatedBook = {
  ...existingBook,
  ...updates,
  lastEdited: new Date().toISOString(),
};

bookEdits[bookId] = updatedBook;

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write back to file
fs.writeFileSync(editsFile, JSON.stringify(bookEdits, null, 2));

console.log(`✅ Book ${bookId} updated successfully!`);
console.log(`   Last edited: ${new Date(updatedBook.lastEdited).toLocaleString()}`);
console.log(`   Updates:`, Object.keys(updates).join(', '));

