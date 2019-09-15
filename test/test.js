/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');

const configName = '.babelrc';
const roots = [
  path.join(__dirname, configName),
  path.join(__dirname, '..', configName),
  path.join(__dirname, '../..', configName),
  path.join(__dirname, '../../..', configName),
];
const target = roots.find(configPath => fs.existsSync(configPath));
if (target) {
  const source = fs.readFileSync(target).toString();
  const config = Object.assign(JSON.parse(source), {
    ignore: [/node_modules/],
  });
  require('@babel/register')(config);
}
