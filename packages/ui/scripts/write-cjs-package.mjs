import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const libDir = resolve(root, 'lib');

mkdirSync(libDir, { recursive: true });
writeFileSync(resolve(libDir, 'package.json'), '{\n  "type": "commonjs"\n}\n');
