import { PGlite } from '@electric-sql/pglite';
import { createServer } from 'pglite-server';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../prisma/pgdata');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log(`[PGlite] Initializing embedded PostgreSQL in ${dataDir}...`);
const db = new PGlite(dataDir);
await db.waitReady;
console.log(`[PGlite] Engine ready.`);

const server = createServer(db, { logLevel: 1 /* Warn */ });

const PORT = 5432;
const HOST = '127.0.0.1';

server.listen(PORT, HOST, () => {
  console.log(`[PGlite] PostgreSQL wire-protocol server listening on ${HOST}:${PORT}`);
});

function shutdown() {
  console.log('[PGlite] Shutting down database server...');
  server.close(async () => {
    await db.close();
    console.log('[PGlite] Database closed.');
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
