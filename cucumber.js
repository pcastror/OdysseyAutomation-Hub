let common = [
  'features/**/*.feature',
  '--require-module ts-node/register',
  '--require step-definitions/**/*.ts',
  //'--require hooks/*.ts',
  '--format progress-bar',
  '--format progress',                                    // Load custom formatter
  '--publish'
].join(' ');

module.exports = {
  default: common
};
