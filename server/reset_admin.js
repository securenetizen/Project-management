const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

const resetAdmin = (newPassword) => {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.run('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, 'admin'], function (err) {
        if (err) {
            console.error('Error resetting password:', err.message);
        } else if (this.changes === 0) {
            console.log('User "admin" not found. Creating a new admin user...');
            const adminId = 'admin-' + Date.now();
            db.run('INSERT INTO users (id, username, password, role, name) VALUES (?, ?, ?, ?, ?)',
                [adminId, 'admin', hashedPassword, 'Admin', 'Administrator'], (err) => {
                    if (err) console.error('Error creating admin user:', err.message);
                    else console.log('Admin user created successfully with password:', newPassword);
                });
        } else {
            console.log('Password for "admin" has been reset successfully to:', newPassword);
        }
        db.close();
    });
};

const newPass = process.argv[2] || 'admin123';
resetAdmin(newPass);
