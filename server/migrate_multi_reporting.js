const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('Starting migration to add reporting_schedules table...');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS reporting_schedules (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        period TEXT,
        type TEXT,
        deadline TEXT,
        status TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
    )`, (err) => {
        if (err) {
            console.error('Error creating reporting_schedules table:', err.message);
        } else {
            console.log('reporting_schedules table created or already exists.');
        }
    });

    // Also remove the old columns if needed later, but for now we'll keep them to avoid breaking the current server until updated
    console.log('Migration complete.');
    db.close();
});
