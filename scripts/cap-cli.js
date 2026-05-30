const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const target = process.argv[2]; // 'student' or 'admin'
const command = process.argv.slice(3).join(' '); // e.g. 'add android', 'sync android', 'open android'

if (!target || !['student', 'admin'].includes(target)) {
  console.error("Error: Please specify target 'student' or 'admin'.");
  console.error("Usage: node scripts/cap-cli.js <target> <command>");
  process.exit(1);
}

if (!command) {
  console.error("Error: Please specify a Capacitor command (e.g., 'add android', 'sync android').");
  process.exit(1);
}

const configSrc = path.join(__dirname, `../capacitor.${target}.json`);
const configDest = path.join(__dirname, '../capacitor.config.json');

console.log(`\n[Capacitor Multi-Target] Swapping configuration for target: ${target.toUpperCase()}`);

try {
  // 1. Copy target config to capacitor.config.json
  fs.copyFileSync(configSrc, configDest);
  console.log(`✓ Copied capacitor.${target}.json to capacitor.config.json`);

  // 2. Execute the capacitor command
  const cliCommand = `npx cap ${command}`;
  console.log(`➜ Executing: ${cliCommand}\n`);
  execSync(cliCommand, { stdio: 'inherit' });

  console.log(`\n✓ Success! target '${target}' processed successfully.\n`);
} catch (error) {
  console.error(`\n✖ Error: Command failed during Capacitor execution.\n`);
  process.exit(1);
}
