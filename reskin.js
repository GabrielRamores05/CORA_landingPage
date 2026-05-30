const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'next-app', 'src', 'components');

const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.module.css'));

files.forEach(file => {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace colors for Dark Mode
  content = content.replace(/var\(--dark\)/g, 'var(--text-main)');
  content = content.replace(/background(-color)?:\s*(#fff|white|#FFFDFB|#FFFBF8);/gi, 'background$1: var(--emerald-950); border: 1px solid var(--emerald-800);');
  content = content.replace(/background:\s*linear-gradient\([^)]+#FFFBF8[^)]+\);/gi, 'background: transparent;');
  
  // Update orange urgency colors (replace old red/orange with brand orange)
  content = content.replace(/#ff4757|#ff6348/gi, 'var(--orange)');
  
  // Update grey text to be legible on dark mode
  content = content.replace(/color:\s*var\(--gray-[0-9]+\);/g, 'color: var(--text-muted);');
  content = content.replace(/color:\s*#666|color:\s*#333/gi, 'color: var(--text-muted);');

  // Fix hardcoded dark text
  content = content.replace(/color:\s*#000|color:\s*black/gi, 'color: var(--text-main);');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
