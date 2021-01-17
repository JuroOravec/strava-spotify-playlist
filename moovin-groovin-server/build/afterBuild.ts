import path from 'path';
import s from 'shelljs';
import glob from 'glob';

import config from '../tsconfig.json';

const outDir = config.compilerOptions.outDir;

// Copy all YAML and SQL files to build
const filesToCopy = glob
  .sync('**/*.{yml,yaml,*sql}', {
    ignore: ['**/node_modules/**'],
  })
  .map((file) => ({
    src: file,
    dest: `${outDir}/${file.replace(/^src(\/|\\)/, '')}`,
  }));

s.mkdir(
  '-p',
  filesToCopy.map((f) => path.dirname(f.dest))
);
filesToCopy.forEach((file) => s.cp(file.src, file.dest));
