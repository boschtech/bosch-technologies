import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  cpSync, existsSync, lstatSync, mkdirSync, readFileSync, readdirSync,
  renameSync, rmSync, statSync, writeFileSync,
} from 'node:fs';
import { basename, dirname, join, resolve, sep } from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

/**
 * Unlike tamiabosch's static-only Hostinger site, this project deploys as a
 * genuine Node.js "Web App": Hostinger runs `npm install` against the
 * release's package.json and starts src/index.js, which itself serves the
 * built frontend (apps/web's Vite output) as well as the /api and /uploads
 * routes. The release therefore bundles:
 *   - apps/server/src (the Express app, unmodified)
 *   - apps/server/.env.example (reference only; real values are configured
 *     as environment variables in hPanel's Node.js app settings, never
 *     committed or shipped as a real .env file)
 *   - a package.json containing only apps/server's runtime dependencies and
 *     a "start" script, so `npm install` on the server stays production-only
 *     (devDependencies, test files, and workspace-wide tooling are excluded)
 *   - web/ — apps/web's production build, served by the Express app itself
 *     (see apps/server/src/app.js's webDistDir handling)
 */
const allowedRoots = new Set(['package.json', '.env.example', 'src', 'seed', 'web']);
const disallowedPatterns = /node_modules|(^|\/)\.env$|(^|\/)\.git(ignore)?$/;

export function buildRelease(destination) {
  const releaseDir = resolve(destination);
  assert(!releaseDir.startsWith(root) || releaseDir.startsWith(resolve(root, 'dist')),
    'Release directory must live outside the repository (use dist/)');
  rmSync(releaseDir, { recursive: true, force: true });
  mkdirSync(releaseDir, { recursive: true });

  // --- package.json: runtime dependencies only, no workspaces/devDeps ---
  const serverPkg = JSON.parse(readFileSync(join(root, 'apps/server/package.json'), 'utf8'));
  assert(serverPkg.dependencies && Object.keys(serverPkg.dependencies).length > 0,
    'apps/server/package.json has no dependencies to package');
  writeFileSync(join(releaseDir, 'package.json'), `${JSON.stringify({
    name: 'bosch-technologies-server',
    version: '0.0.0',
    private: true,
    type: 'module',
    engines: serverPkg.engines,
    scripts: { start: 'node src/index.js' },
    dependencies: serverPkg.dependencies,
  }, null, 2)}\n`);

  // --- Server source and env reference ---
  cpSync(join(root, 'apps/server/src'), join(releaseDir, 'src'), { recursive: true });
  cpSync(join(root, 'apps/server/.env.example'), join(releaseDir, '.env.example'));
  // Seed data copied into an empty DATA_DIR on first start (see src/index.js).
  cpSync(join(root, 'apps/server/seed'), join(releaseDir, 'seed'), { recursive: true });

  // --- Built frontend (must already exist: run `npm run build` first) ---
  const webBuildDir = join(root, 'dist/apps/web');
  assert(existsSync(join(webBuildDir, 'index.html')),
    'apps/web has not been built; run `npm run build` before packaging');
  cpSync(webBuildDir, join(releaseDir, 'web'), { recursive: true });

  return releaseDir;
}

export function validateRelease(releaseDir) {
  const files = [];
  function visit(relative = '') {
    for (const name of readdirSync(join(releaseDir, relative))) {
      const path = relative ? `${relative}/${name}` : name;
      assert(allowedRoots.has(path.split('/')[0]), `Unexpected deployment content: ${path}`);
      assert(!disallowedPatterns.test(path), `Disallowed deployment content: ${path}`);
      const info = lstatSync(join(releaseDir, path));
      assert(!info.isSymbolicLink(), `Deployment cannot contain symlinks: ${path}`);
      if (info.isDirectory()) {
        visit(path);
      } else {
        assert(info.isFile(), `Deployment entry is not a regular file: ${path}`);
        files.push(path);
      }
    }
  }
  visit();

  for (const required of ['package.json', '.env.example', 'src/index.js', 'src/app.js', 'web/index.html']) {
    assert(files.includes(required), `Missing required deployment file: ${required}`);
  }
  const pkg = JSON.parse(readFileSync(join(releaseDir, 'package.json'), 'utf8'));
  assert(pkg.scripts?.start === 'node src/index.js', 'package.json is missing the expected start script');
  assert(!pkg.devDependencies, 'Release package.json must not include devDependencies');

  const html = readFileSync(join(releaseDir, 'web/index.html'), 'utf8');
  assert(html.includes('id="root"') && /<script[^>]+type="module"/.test(html),
    'Missing production application bootstrap in web/index.html');

  return files;
}

export function packageRelease(releaseDir, archive) {
  const archivePath = resolve(archive);
  assert(!archivePath.startsWith(`${releaseDir}${sep}`) && archivePath !== releaseDir,
    'Archive must be written outside the release directory');
  const files = validateRelease(releaseDir);
  mkdirSync(dirname(archivePath), { recursive: true });
  const temporaryArchive = `${archivePath}.tmp`;
  const result = spawnSync('tar', ['-czf', temporaryArchive, '-C', releaseDir, '.'], {
    encoding: 'utf8',
    env: { ...process.env, COPYFILE_DISABLE: '1' },
  });
  if (result.error) throw result.error;
  assert(result.status === 0, `tar failed: ${result.stderr}`);
  assert(statSync(temporaryArchive).size > 0, 'Deployment archive is empty');
  renameSync(temporaryArchive, archivePath);
  const sha256 = createHash('sha256').update(readFileSync(archivePath)).digest('hex');
  writeFileSync(`${archivePath}.sha256`, `${sha256}  ${basename(archivePath)}\n`);
  return { archive: archivePath, sha256, fileCount: files.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const releaseDir = buildRelease(join(root, 'dist/hostinger-release'));
  const release = packageRelease(releaseDir, join(root, 'dist/bosch-technologies-hostinger.tar.gz'));
  console.log(`Validated and packaged ${release.fileCount} files: ${release.archive}`);
  console.log(`SHA-256: ${release.sha256}`);
}
