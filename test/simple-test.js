const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const { exec } = require('child_process');
const { output } = require('../webpack.config.js');

const colors = require('colors/safe');

colors.setTheme({
  RE: 'yellow',
  WA: 'yellow',
  AC: ['green', 'bold']
});

// Start test
const scriptPath = resolve(output.path, output.filename);
exec(`node ${scriptPath} < ./input`, (error, stdout, stderr) => {
  if (stderr) {
    console.log(colors.RE('Runtime Error'), 'See ./stderr');
    writeFileSync('./stderr', stderr);
  } else if (stdout !== readFileSync('./answer', 'utf8')) {
    console.log(colors.WA('Wrong Answer'), 'See ./stdout');
    writeFileSync('./stdout', stdout);
  } else {
    console.log(colors.AC('Accepted!'));
    writeFileSync('./stdout', stdout);
  }
});
