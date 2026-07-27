/**
 * Helper: Mark all existing migrations as "already run" on the existing database.
 *
 * Use this script when adding Knex to an existing project where all tables
 * already exist. It inserts migration records so Knex won't try to re-create
 * tables that already exist.
 *
 * Run with: node setup-knex-existing-db.js
 */
const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dealer_motor',
    port: 3306,
  },
});

async function setup() {
  try {
    console.log('Connecting to database...');

    // Check if knex_migrations table exists
    const hasTable = await db.schema.hasTable('knex_migrations');

    if (!hasTable) {
      console.log('Creating knex_migrations table...');
      await db.schema.createTable('knex_migrations', (table) => {
        table.increments('id').primary();
        table.string('name', 255).nullable();
        table.integer('batch').nullable();
        table.timestamp('migration_time').nullable();
      });
      console.log('knex_migrations table created.');
    } else {
      console.log('knex_migrations table already exists.');
    }

    // Migration files (must match actual filenames in migrations/ directory)
    const migrations = [
      '20260727000001_create_kategori.js',
      '20260727000002_create_user.js',
      '20260727000003_create_contact.js',
      '20260727000004_create_faq.js',
      '20260727000005_create_testimoni.js',
      '20260727000006_create_tipe.js',
      '20260727000007_create_varian.js',
      '20260727000008_create_motor.js',
      '20260727000009_create_warna.js',
      '20260727000010_create_spesifikasi_motor.js',
      '20260727000011_create_pengajuan.js',
      '20260727000012_create_simulasi_kredit.js',
    ];

    // Check which migrations are already recorded
    const existing = await db('knex_migrations').select('name');
    const existingNames = new Set(existing.map((r) => r.name));
    const toInsert = migrations.filter((m) => !existingNames.has(m));

    if (toInsert.length === 0) {
      console.log('All migrations are already recorded. Nothing to do.');
      return;
    }

    console.log(`Marking ${toInsert.length} migrations as already run...`);
    const now = new Date();
    await db('knex_migrations').insert(
      toInsert.map((name) => ({
        name,
        batch: 1,
        migration_time: now,
      }))
    );

    console.log('Done! All migrations have been marked as already run.');
    console.log('');
    console.log('You can now:');
    console.log('  - Run "npm run migrate" for future migrations');
    console.log('  - Run "npm run seed" to reseed master data (use with caution!)');
    console.log('  - Run "npm run rollback" to rollback the last batch');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await db.destroy();
  }
}

setup();
