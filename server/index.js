const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db, initDb } = require('./db');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = 'digitally-right-secret-key'; // In production, use env variable

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Multer Configuration ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// --- Middleware ---

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ error: 'Requires Admin role' });
    next();
};

// --- Auth Endpoints ---

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(401).json({ error: 'Invalid username or password' });

        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) return res.status(401).json({ error: 'Invalid username or password' });

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role, name: user.name }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ token, user: { id: user.id, username: user.username, role: user.role, name: user.name } });
    });
});

// --- User Management (Admin Only) ---

app.get('/api/users', authenticateToken, isAdmin, (req, res) => {
    db.all('SELECT id, username, role, name FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/users', authenticateToken, isAdmin, (req, res) => {
    const { username, password, role, name } = req.body;
    const id = uuidv4();
    const hashedPass = bcrypt.hashSync(password, 10);

    db.run('INSERT INTO users (id, username, password, role, name) VALUES (?, ?, ?, ?, ?)',
        [id, username, hashedPass, role, name],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, username, role, name });
        });
});

app.put('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
    const { username, password, role, name } = req.body;
    const { id } = req.params;

    if (password) {
        const hashedPass = bcrypt.hashSync(password, 10);
        db.run('UPDATE users SET username = ?, password = ?, role = ?, name = ? WHERE id = ?',
            [username, hashedPass, role, name, id],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id, username, role, name });
            });
    } else {
        db.run('UPDATE users SET username = ?, role = ?, name = ? WHERE id = ?',
            [username, role, name, id],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id, username, role, name });
            });
    }
});

app.delete('/api/users/:id', authenticateToken, isAdmin, (req, res) => {
    const { id } = req.params;
    if (id === req.user.id) return res.status(400).json({ error: 'Cannot delete yourself' });

    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- Project Endpoints ---

app.get('/api/projects', authenticateToken, (req, res) => {
    db.all('SELECT * FROM projects', [], async (err, projects) => {
        if (err) return res.status(500).json({ error: err.message });

        // Fetch activities, disbursements, and attachments for each project
        const fullProjects = await Promise.all(projects.map(async (p) => {
            const activities = await new Promise((resolve) => {
                db.all('SELECT * FROM activities WHERE projectId = ?', [p.id], (err, rows) => resolve(rows || []));
            });
            const disbursements = await new Promise((resolve) => {
                db.all('SELECT * FROM disbursements WHERE projectId = ?', [p.id], (err, rows) => resolve(rows || []));
            });
            const attachments = await new Promise((resolve) => {
                db.all('SELECT * FROM attachments WHERE projectId = ?', [p.id], (err, rows) => resolve(rows || []));
            });
            return { ...p, activities, disbursements, attachments };
        }));

        res.json(fullProjects);
    });
});

app.post('/api/projects', authenticateToken, (req, res) => {
    const { id, donor, contractStart, contractEnd, totalBudget, currency, status, reportingQuarterly, reportingYearly, reportingFinal } = req.body;
    db.run('INSERT INTO projects (id, donor, contractStart, contractEnd, totalBudget, currency, status, reportingQuarterly, reportingYearly, reportingFinal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id || uuidv4(), donor, contractStart, contractEnd, totalBudget, currency, status, reportingQuarterly, reportingYearly, reportingFinal],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(req.body);
        });
});

app.put('/api/projects/:id', authenticateToken, (req, res) => {
    const { donor, contractStart, contractEnd, totalBudget, currency, status, reportingQuarterly, reportingYearly, reportingFinal } = req.body;
    db.run('UPDATE projects SET donor = ?, contractStart = ?, contractEnd = ?, totalBudget = ?, currency = ?, status = ?, reportingQuarterly = ?, reportingYearly = ?, reportingFinal = ? WHERE id = ?',
        [donor, contractStart, contractEnd, totalBudget, currency, status, reportingQuarterly, reportingYearly, reportingFinal, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json(req.body);
        });
});

app.delete('/api/projects/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- Activity Endpoints ---

app.post('/api/activities', authenticateToken, (req, res) => {
    const { id, projectId, title, description, deadline, status, lead } = req.body;
    db.run('INSERT INTO activities (id, projectId, title, description, deadline, status, lead) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id || uuidv4(), projectId, title, description, deadline, status, lead],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(req.body);
        });
});

app.put('/api/activities/:id', authenticateToken, (req, res) => {
    const { title, description, deadline, status, lead } = req.body;
    db.run('UPDATE activities SET title = ?, description = ?, deadline = ?, status = ?, lead = ? WHERE id = ?',
        [title, description, deadline, status, lead, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json(req.body);
        });
});

app.delete('/api/activities/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM activities WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- Disbursement Endpoints ---

app.post('/api/disbursements', authenticateToken, (req, res) => {
    const { id, projectId, label, amount, currency, status, date } = req.body;
    db.run('INSERT INTO disbursements (id, projectId, label, amount, currency, status, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id || uuidv4(), projectId, label, amount, currency, status, date],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json(req.body);
        });
});

app.put('/api/disbursements/:id', authenticateToken, (req, res) => {
    const { label, amount, currency, status, date } = req.body;
    db.run('UPDATE disbursements SET label = ?, amount = ?, currency = ?, status = ?, date = ? WHERE id = ?',
        [label, amount, currency, status, date, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json(req.body);
        });
});

app.delete('/api/disbursements/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM disbursements WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// --- Attachment Endpoints ---

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
    const { projectId } = req.body;
    const { filename, originalname, mimetype, size } = req.file;
    const id = uuidv4();
    const uploadedAt = new Date().toISOString();

    db.run('INSERT INTO attachments (id, projectId, filename, originalName, mimeType, size, uploadedAt) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [id, projectId, filename, originalname, mimetype, size, uploadedAt],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id, projectId, filename, originalName: originalname, mimeType: mimetype, size, uploadedAt });
        });
});

app.get('/api/download/:id', authenticateToken, (req, res) => {
    db.get('SELECT * FROM attachments WHERE id = ?', [req.params.id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: 'File not found' });
        const filePath = path.join(__dirname, 'uploads', row.filename);
        res.download(filePath, row.originalName);
    });
});

app.delete('/api/attachments/:id', authenticateToken, (req, res) => {
    db.get('SELECT * FROM attachments WHERE id = ?', [req.params.id], (err, row) => {
        if (err || !row) return res.status(404).json({ error: 'File not found' });

        const filePath = path.join(__dirname, 'uploads', row.filename);

        // Delete from DB
        db.run('DELETE FROM attachments WHERE id = ?', [req.params.id], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            // Delete from FS
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
            res.json({ success: true });
        });
    });
});

// --- Initialization ---

initDb().then(() => {
    console.log('Database initialized');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
});
