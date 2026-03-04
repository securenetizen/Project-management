const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Users Table
            db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        name TEXT
      )`);

            // Projects Table
            db.run(`CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        donor TEXT,
        contractStart TEXT,
        contractEnd TEXT,
        totalBudget REAL,
        currency TEXT,
        status TEXT,
        reportingQuarterly TEXT,
        reportingYearly TEXT,
        reportingFinal TEXT
      )`);

            // Activities Table
            db.run(`CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        title TEXT,
        description TEXT,
        deadline TEXT,
        status TEXT,
        lead TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
      )`);

            // Disbursements Table
            db.run(`CREATE TABLE IF NOT EXISTS disbursements (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        label TEXT,
        amount REAL,
        currency TEXT,
        status TEXT,
        date TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
      )`);

            // Attachments Table
            db.run(`CREATE TABLE IF NOT EXISTS attachments (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        filename TEXT,
        originalName TEXT,
        mimeType TEXT,
        size INTEGER,
        uploadedAt TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
      )`);

            // Reporting Schedules Table
            db.run(`CREATE TABLE IF NOT EXISTS reporting_schedules (
        id TEXT PRIMARY KEY,
        projectId TEXT,
        period TEXT,
        type TEXT,
        deadline TEXT,
        status TEXT,
        FOREIGN KEY (projectId) REFERENCES projects (id) ON DELETE CASCADE
      )`);

            // Create default admin if not exists
            const adminId = 'admin-001';
            const adminPass = bcrypt.hashSync('admin123', 10);
            db.run(`INSERT OR IGNORE INTO users (id, username, password, role, name) VALUES (?, ?, ?, ?, ?)`,
                [adminId, 'admin', adminPass, 'Admin', 'Administrator'], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    });
};

module.exports = { db, initDb };
