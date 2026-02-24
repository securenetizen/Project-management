const { db, initDb } = require('./db');
const { v4: uuidv4 } = require('uuid');

const seedProjects = [
    {
        donor: "Access Now",
        contractStart: "2025-12-01",
        contractEnd: "2026-07-31",
        totalBudget: 18000,
        currency: "USD",
        status: "Active",
        activities: [
            {
                title: "Analysis of IT information and preparation of a final report",
                description: "",
                deadline: "2026-07-31",
                status: "In Progress",
                lead: ""
            }
        ],
        disbursements: [
            {
                label: "Full payment (one part) upon invoice",
                amount: 18000,
                currency: "USD",
                status: "Pending",
                date: ""
            }
        ]
    },
    {
        donor: "APC/UNHCR",
        contractStart: "2025-09-15",
        contractEnd: "2025-12-31",
        totalBudget: 16800,
        currency: "USD",
        status: "Completed",
        activities: [
            { title: "Manual and digital monitoring of Facebook, YouTube and TikTok", description: "October - December 2025", deadline: "2025-12-31", status: "Completed", lead: "" },
            { title: "Bi-weekly briefings", description: "October - December 2025", deadline: "2025-12-31", status: "Completed", lead: "" },
            { title: "Draft analysis report", description: "", deadline: "2025-12-20", status: "Completed", lead: "" },
            { title: "Presentation of findings", description: "", deadline: "2025-12-22", status: "Completed", lead: "" },
            { title: "Final analysis report", description: "", deadline: "2025-12-31", status: "Completed", lead: "" }
        ],
        disbursements: [
            { label: "First instalment 50%", amount: 8400, currency: "USD", status: "Completed", date: "" },
            { label: "Second instalment 50% on completion", amount: 8400, currency: "USD", status: "Completed", date: "" }
        ]
    },
    {
        donor: "FOJO/SIDA Long Term",
        contractStart: "2024-11-01",
        contractEnd: "2027-04-30",
        totalBudget: 0,
        currency: "USD",
        status: "Active",
        activities: [
            { title: "Digital Hygiene Training (18 sessions)", description: "", deadline: "", status: "In Progress", lead: "" },
            { title: "Digital Safety Protocol", description: "", deadline: "", status: "In Progress", lead: "" },
            { title: "Digital Threats Mapping", description: "", deadline: "", status: "In Progress", lead: "" },
            { title: "Support Desk and Resource Centre", description: "", deadline: "", status: "Not Started", lead: "" }
        ],
        disbursements: [
            { label: "Payment request Jan 2025 (Nov 2024 – Nov 2025)", amount: 0, currency: "USD", status: "Completed", date: "2025-01-15" },
            { label: "Payment request Dec 2025 (Dec 2025 – Dec 2026)", amount: 0, currency: "USD", status: "Completed", date: "2025-12-01" },
            { label: "Payment request Apr 2027 (Jan – Apr 2027)", amount: 0, currency: "USD", status: "Pending", date: "2027-04-01" }
        ]
    },
    {
        donor: "FOJO/SIDA Election",
        contractStart: "2024-11-01",
        contractEnd: "2027-04-30",
        totalBudget: 0,
        currency: "USD",
        status: "Active",
        activities: [
            { title: "Residential Safety training for frontline journalists (4 Batches)", description: "", deadline: "", status: "Completed", lead: "" },
            { title: "Election safety roundtable discussion with newsroom leadership", description: "", deadline: "", status: "Completed", lead: "" },
            { title: "Safety support and emergency helpdesk (3 months)", description: "", deadline: "", status: "Completed", lead: "" },
            { title: "Post-election learning debrief for trained participants", description: "", deadline: "", status: "Completed", lead: "" }
        ],
        disbursements: [
            { label: "Same as FOJO/SIDA Long Term", amount: 0, currency: "USD", status: "Completed", date: "" }
        ]
    },
    {
        donor: "Swiss (SDC)",
        contractStart: "2025-12-01",
        contractEnd: "2026-04-30",
        totalBudget: 1201746,
        currency: "BDT",
        status: "Active",
        activities: [
            { title: "Two separate workshops, each with 12 participants", description: "Personalized support workshops", deadline: "", status: "Completed", lead: "" }
        ],
        disbursements: [
            { label: "First instalment after signing", amount: 800000, currency: "BDT", status: "Completed", date: "" },
            { label: "Final instalment after approval of final report", amount: 401746, currency: "BDT", status: "Pending", date: "" }
        ]
    },
    {
        donor: "EPD",
        contractStart: "2025-10-01",
        contractEnd: "2027-01-31",
        totalBudget: 70000,
        currency: "EUR",
        status: "Active",
        activities: [
            { title: "Short briefing on pre-electoral online environment (3-4 pages)", description: "", deadline: "", status: "Completed", lead: "" },
            { title: "Zoom meeting with partners on pre-electoral briefing", description: "", deadline: "", status: "Completed", lead: "" },
            { title: "Risk matrix and mitigation strategy (2 pages max)", description: "", deadline: "", status: "Completed", lead: "" },
            { title: "Actor-based Social Media Monitoring Pilot Tool", description: "Functional tool for monitoring election actors", deadline: "", status: "Completed", lead: "" },
            { title: "Election disinformation update reports (Nov 2025 – Feb 2026)", description: "Monthly newsletters", deadline: "2026-02-28", status: "In Progress", lead: "" },
            { title: "40 factcheck reports on election misinformation (Nov 2025 – Mar 2026)", description: "", deadline: "2026-03-31", status: "Completed", lead: "" },
            { title: "3 training/peer learning sessions on digital safety (Nov–Dec 2025)", description: "", deadline: "2025-12-31", status: "Completed", lead: "" },
            { title: "Monthly progress reports", description: "", deadline: "", status: "In Progress", lead: "" },
            { title: "Misinformation trends in 2026 Election: trends analysis report", description: "Nov 2025 – Feb 2026", deadline: "2026-02-28", status: "In Progress", lead: "" }
        ],
        disbursements: [
            { label: "Invoice 1 (40%) – inception report & risk assessment", amount: 28000, currency: "EUR", status: "Completed", date: "" },
            { label: "Invoice 2 (30%) – trainings, tool/dashboard", amount: 21000, currency: "EUR", status: "Pending", date: "" },
            { label: "Invoice 3 (30%) – fact-checks, newsletter, final report", amount: 21000, currency: "EUR", status: "Pending", date: "" }
        ]
    }
    // ... truncated for brevity in the script, just to show how it works
];

const migrate = async () => {
    await initDb();
    console.log('Migrating data...');

    for (const p of seedProjects) {
        const projectId = uuidv4();
        db.run('INSERT INTO projects (id, donor, contractStart, contractEnd, totalBudget, currency, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [projectId, p.donor, p.contractStart, p.contractEnd, p.totalBudget, p.currency, p.status]);

        if (p.activities) {
            for (const a of p.activities) {
                db.run('INSERT INTO activities (id, projectId, title, description, deadline, status, lead) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [uuidv4(), projectId, a.title, a.description, a.deadline, a.status, a.lead]);
            }
        }

        if (p.disbursements) {
            for (const d of p.disbursements) {
                db.run('INSERT INTO disbursements (id, projectId, label, amount, currency, status, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [uuidv4(), projectId, d.label, d.amount, d.currency, d.status, d.date]);
            }
        }
    }

    console.log('Migration complete.');
};

migrate();
