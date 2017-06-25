const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { exec } = require('child_process');
const { output } = require('../webpack.config.js');

// Start test
const scriptPath = resolve(output.path, output.filename);
exec(`node ${scriptPath} < ./input`, (error, stdout, stderr) => {
  if (stdout === readFileSync('./answer', 'utf8')) {
    console.log('Correct Answer');
  } else {
    console.log('Wrong Answer');
  }
  writeFileSync('./output', stdout);
});
