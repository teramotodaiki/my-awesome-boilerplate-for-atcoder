const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { exec } = require('child_process');
const { output } = require('../webpack.config.js');

// Start test
const scriptPath = resolve(output.path, output.filename);
exec(`node ${scriptPath} < ./input`, (error, stdout, stderr) => {
  if (stderr) {
    console.log('Runtime Error. (See ./stderr)');
    writeFileSync('./stderr', stderr);
  } else if (stdout !== readFileSync('./answer', 'utf8')) {
    console.log('Wrong Answer. (See ./stdout)');
    writeFileSync('./stdout', stdout);
  } else {
    console.log('Accepted!');
  }
});
