const { db } = require('./db');

const migrate = () => {
    console.log('Starting migration to add reporting columns...');

    db.serialize(() => {
        // Add reportingQuarterly
        db.run('ALTER TABLE projects ADD COLUMN reportingQuarterly TEXT', (err) => {
            if (err) {
                if (err.message.includes('duplicate column name')) {
                    console.log('reportingQuarterly already exists.');
                } else {
                    console.error('Error adding reportingQuarterly:', err.message);
                }
            } else {
                console.log('Added reportingQuarterly column.');
            }
        });

        // Add reportingYearly
        db.run('ALTER TABLE projects ADD COLUMN reportingYearly TEXT', (err) => {
            if (err) {
                if (err.message.includes('duplicate column name')) {
                    console.log('reportingYearly already exists.');
                } else {
                    console.error('Error adding reportingYearly:', err.message);
                }
            } else {
                console.log('Added reportingYearly column.');
            }
        });

        // Add reportingFinal
        db.run('ALTER TABLE projects ADD COLUMN reportingFinal TEXT', (err) => {
            if (err) {
                if (err.message.includes('duplicate column name')) {
                    console.log('reportingFinal already exists.');
                } else {
                    console.error('Error adding reportingFinal:', err.message);
                }
            } else {
                console.log('Added reportingFinal column.');
            }
        });
    });
};

migrate();
