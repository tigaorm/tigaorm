import { configure, processCLIArgs, run } from '@japa/runner';
import { expect } from '@japa/expect';
import { assert } from '@japa/assert';
import { fileSystem } from '@japa/file-system';

processCLIArgs(process.argv.splice(2));
configure({
  files: ['tests/**/*.spec.ts'],
  plugins: [assert(), fileSystem(), expect()],
});

run();
