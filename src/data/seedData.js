import { v4 } from './utils.js';

export const seedProjects = [
    {
        id: v4(),
        donor: "Access Now",
        contractStart: "2025-12-01",
        contractEnd: "2026-07-31",
        totalBudget: 18000,
        currency: "USD",
        status: "Active",
        activities: [
            {
                id: v4(),
                title: "Analysis of IT information and preparation of a final report",
                description: "",
                deadline: "2026-07-31",
                status: "In Progress",
                lead: ""
            }
        ],
        disbursements: [
            {
                id: v4(),
                label: "Full payment (one part) upon invoice",
                amount: 18000,
                currency: "USD",
                status: "Pending",
                date: ""
            }
        ]
    },
    {
        id: v4(),
        donor: "APC/UNHCR",
        contractStart: "2025-09-15",
        contractEnd: "2025-12-31",
        totalBudget: 16800,
        currency: "USD",
        status: "Completed",
        activities: [
            { id: v4(), title: "Manual and digital monitoring of Facebook, YouTube and TikTok", description: "October - December 2025", deadline: "2025-12-31", status: "Completed", lead: "" },
            { id: v4(), title: "Bi-weekly briefings", description: "October - December 2025", deadline: "2025-12-31", status: "Completed", lead: "" },
            { id: v4(), title: "Draft analysis report", description: "", deadline: "2025-12-20", status: "Completed", lead: "" },
            { id: v4(), title: "Presentation of findings", description: "", deadline: "2025-12-22", status: "Completed", lead: "" },
            { id: v4(), title: "Final analysis report", description: "", deadline: "2025-12-31", status: "Completed", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "First instalment 50%", amount: 8400, currency: "USD", status: "Completed", date: "" },
            { id: v4(), label: "Second instalment 50% on completion", amount: 8400, currency: "USD", status: "Completed", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "FOJO/SIDA Long Term",
        contractStart: "2024-11-01",
        contractEnd: "2027-04-30",
        totalBudget: 0,
        currency: "USD",
        status: "Active",
        activities: [
            { id: v4(), title: "Digital Hygiene Training (18 sessions)", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Digital Safety Protocol", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Digital Threats Mapping", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Support Desk and Resource Centre", description: "", deadline: "", status: "Not Started", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "Payment request Jan 2025 (Nov 2024 – Nov 2025)", amount: 0, currency: "USD", status: "Completed", date: "2025-01-15" },
            { id: v4(), label: "Payment request Dec 2025 (Dec 2025 – Dec 2026)", amount: 0, currency: "USD", status: "Completed", date: "2025-12-01" },
            { id: v4(), label: "Payment request Apr 2027 (Jan – Apr 2027)", amount: 0, currency: "USD", status: "Pending", date: "2027-04-01" }
        ]
    },
    {
        id: v4(),
        donor: "FOJO/SIDA Election",
        contractStart: "2024-11-01",
        contractEnd: "2027-04-30",
        totalBudget: 0,
        currency: "USD",
        status: "Active",
        activities: [
            { id: v4(), title: "Residential Safety training for frontline journalists (4 Batches)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Election safety roundtable discussion with newsroom leadership", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Safety support and emergency helpdesk (3 months)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Post-election learning debrief for trained participants", description: "", deadline: "", status: "Completed", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "Same as FOJO/SIDA Long Term", amount: 0, currency: "USD", status: "Completed", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "Swiss (SDC)",
        contractStart: "2025-12-01",
        contractEnd: "2026-04-30",
        totalBudget: 1201746,
        currency: "BDT",
        status: "Active",
        activities: [
            { id: v4(), title: "Two separate workshops, each with 12 participants", description: "Personalized support workshops", deadline: "", status: "Completed", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "First instalment after signing", amount: 800000, currency: "BDT", status: "Completed", date: "" },
            { id: v4(), label: "Final instalment after approval of final report", amount: 401746, currency: "BDT", status: "Pending", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "EPD",
        contractStart: "2025-10-01",
        contractEnd: "2027-01-31",
        totalBudget: 70000,
        currency: "EUR",
        status: "Active",
        activities: [
            { id: v4(), title: "Short briefing on pre-electoral online environment (3-4 pages)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Zoom meeting with partners on pre-electoral briefing", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Risk matrix and mitigation strategy (2 pages max)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Actor-based Social Media Monitoring Pilot Tool", description: "Functional tool for monitoring election actors", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Election disinformation update reports (Nov 2025 – Feb 2026)", description: "Monthly newsletters", deadline: "2026-02-28", status: "In Progress", lead: "" },
            { id: v4(), title: "40 factcheck reports on election misinformation (Nov 2025 – Mar 2026)", description: "", deadline: "2026-03-31", status: "Completed", lead: "" },
            { id: v4(), title: "3 training/peer learning sessions on digital safety (Nov–Dec 2025)", description: "", deadline: "2025-12-31", status: "Completed", lead: "" },
            { id: v4(), title: "Monthly progress reports", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Misinformation trends in 2026 Election: trends analysis report", description: "Nov 2025 – Feb 2026", deadline: "2026-02-28", status: "In Progress", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "Invoice 1 (40%) – inception report & risk assessment", amount: 28000, currency: "EUR", status: "Completed", date: "" },
            { id: v4(), label: "Invoice 2 (30%) – trainings, tool/dashboard", amount: 21000, currency: "EUR", status: "Pending", date: "" },
            { id: v4(), label: "Invoice 3 (30%) – fact-checks, newsletter, final report", amount: 21000, currency: "EUR", status: "Pending", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "GMR FIMI",
        contractStart: "2025-10-01",
        contractEnd: "2026-03-31",
        totalBudget: 0,
        currency: "USD",
        status: "Terminated",
        activities: [
            { id: v4(), title: "Onboarding and training (OSINT, DISARM/Stix, Bloom Analytics)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Set up Situation Room for FIMI monitoring", description: "3 months pre-election, 1 month post-election", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Baseline monitoring report and periodic bulletins (bi-weekly)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Coordinate with GMR and partners on distribution", description: "", deadline: "", status: "Not Started", lead: "" },
            { id: v4(), title: "Final post-election report", description: "", deadline: "", status: "Not Started", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "First Installment (40%) on signing", amount: 0, currency: "USD", status: "Completed", date: "" },
            { id: v4(), label: "Second Installment (30%) on baseline report + 2 bulletins", amount: 0, currency: "USD", status: "Pending", date: "" },
            { id: v4(), label: "Final Installment (30%) on post-election report", amount: 0, currency: "USD", status: "Pending", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "IFES",
        contractStart: "2025-11-13",
        contractEnd: "2025-12-15",
        totalBudget: 0,
        currency: "USD",
        status: "Completed",
        activities: [
            { id: v4(), title: "8-10 page research paper on Youth Digital Habits and Electoral Participation", description: "", deadline: "2025-12-01", status: "Completed", lead: "" },
            { id: v4(), title: "Inception note with methodology overview", description: "", deadline: "2025-11-20", status: "Completed", lead: "" },
            { id: v4(), title: "Presentation of findings at IFES Youth Democracy Festival", description: "Tentatively 13-14 December", deadline: "2025-12-14", status: "Completed", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "100% upon delivery, acceptance, and invoice", amount: 0, currency: "USD", status: "Completed", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "IMS",
        contractStart: "2026-01-01",
        contractEnd: "2027-06-30",
        totalBudget: 941189,
        currency: "DKK",
        status: "Active",
        activities: [
            { id: v4(), title: "Digital and Physical Safety Training (4 trainings, 48 journalists)", description: "Pre/post assessments, photos, narrative event reports", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "SAFETAG Audits for high-risk media outlets", description: "Selection report, 4 audit reports, needs identification", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Digital security infrastructure support", description: "Based on SAFETAG audit findings", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Mapping of Emerging Independent Media", description: "Nationwide mapping, 10-15 outlets profiled", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Training on revenue diversification", description: "Digital revenue, monetization, business planning", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Framework for Independent Media Alliance", description: "Selection criteria, vetting, decision-making structures", deadline: "", status: "Not Started", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "Upon signing: 70% of Year 1 budget", amount: 411819, currency: "DKK", status: "Completed", date: "" },
            { id: v4(), label: "Upon Year 1 Interim Report: 20%", amount: 117663, currency: "DKK", status: "Pending", date: "" },
            { id: v4(), label: "Upon Year 1 Annual Report + Audit: 10%", amount: 58831, currency: "DKK", status: "Pending", date: "" },
            { id: v4(), label: "Upon Year 2 Budget approval: 70%", amount: 247013, currency: "DKK", status: "Pending", date: "" },
            { id: v4(), label: "Upon Year 2 Interim Report: 20%", amount: 70575, currency: "DKK", status: "Pending", date: "" },
            { id: v4(), label: "Upon Year 2 Annual Report + Audit: 10%", amount: 35288, currency: "DKK", status: "Pending", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "Luminate",
        contractStart: "2025-10-01",
        contractEnd: "2027-09-30",
        totalBudget: 225000,
        currency: "USD",
        status: "Active",
        activities: [
            { id: v4(), title: "Monitoring tool with key platform APIs", description: "Develop, maintain, and update", deadline: "2027-09-30", status: "In Progress", lead: "" },
            { id: v4(), title: "12 newsletters + 12 long-form reports + 2 research reports", description: "Focused on emerging threats", deadline: "2027-09-30", status: "In Progress", lead: "" },
            { id: v4(), title: "Digital verification fellows", description: "", deadline: "2027-09-30", status: "Not Started", lead: "" },
            { id: v4(), title: "Facebook 20K followers + Instagram 92 followers by Oct 2026", description: "", deadline: "2026-10-08", status: "In Progress", lead: "" },
            { id: v4(), title: "Facebook 30K followers + Instagram 138 followers by Oct 2027", description: "", deadline: "2027-10-08", status: "Not Started", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "20% by end of Dec 2025", amount: 45000, currency: "USD", status: "Completed", date: "2025-12-31" },
            { id: v4(), label: "40% by end of May 2026", amount: 90000, currency: "USD", status: "Pending", date: "2026-05-31" },
            { id: v4(), label: "20% by end of Sep 2026", amount: 45000, currency: "USD", status: "Pending", date: "2026-09-30" },
            { id: v4(), label: "20% upon completion", amount: 45000, currency: "USD", status: "Pending", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "Meta",
        contractStart: "",
        contractEnd: "",
        totalBudget: 27000,
        currency: "USD",
        status: "Active",
        activities: [
            { id: v4(), title: "Summarize recent regulatory changes impacting tech platforms in Bangladesh", description: "", deadline: "", status: "Not Started", lead: "" },
            { id: v4(), title: "Highlight implications for platform operations and compliance", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Outline connections between regulations and upcoming election", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Identify risks and opportunities for tech platforms during election", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Recommend actions for platform readiness and policy alignment", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Provide concise overview of key findings and next steps", description: "", deadline: "", status: "In Progress", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "Contract payment", amount: 27000, currency: "USD", status: "Completed", date: "" }
        ]
    },
    {
        id: v4(),
        donor: "Nextar",
        contractStart: "2025-10-01",
        contractEnd: "2026-09-30",
        totalBudget: 250000,
        currency: "USD",
        status: "Active",
        activities: [
            { id: v4(), title: "National Convening on digital rights + outcome report", description: "", deadline: "", status: "Not Started", lead: "" },
            { id: v4(), title: "Tech Policy Fellowship (6-8 fellows, 4 research papers)", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "10 long-form data-driven reports on disinformation", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "50 fact-checks on online harm and disinformation", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "News Monitoring Tool prototype with dashboard", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Fellowship and Internship Program for election monitoring", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "3 digital safety training sessions", description: "For civil society groups and election observers", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Digital Safety Support Desk during election cycle", description: "", deadline: "", status: "In Progress", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "Initial payment at signing", amount: 5000, currency: "USD", status: "Completed", date: "" },
            { id: v4(), label: "Payment by end of Oct 2025", amount: 85000, currency: "USD", status: "Completed", date: "2025-10-31" },
            { id: v4(), label: "Payment by end of Mar 2026", amount: 80000, currency: "USD", status: "Completed", date: "2026-03-31" },
            { id: v4(), label: "Payment by end of Sep 2026", amount: 80000, currency: "USD", status: "Pending", date: "2026-09-30" }
        ]
    },
    {
        id: v4(),
        donor: "The Asia Foundation",
        contractStart: "2025-01-01",
        contractEnd: "2026-03-31",
        totalBudget: 8146370,
        currency: "BDT",
        status: "Active",
        activities: [
            { id: v4(), title: "High-Quality Research Report (35-40 pages)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "National Fact-Checkers' Convening", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Disinformation Trend Analysis (Four Reports)", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Production of 50 Fact-Check Articles", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Public Dissemination Event of Research Findings", description: "", deadline: "", status: "In Progress", lead: "" },
            { id: v4(), title: "Social Media Best Practices Guidelines for Political Parties", description: "", deadline: "", status: "Completed", lead: "" },
            { id: v4(), title: "Guidelines Sharing Session with Political Parties", description: "", deadline: "", status: "Completed", lead: "" }
        ],
        disbursements: [
            { id: v4(), label: "1st Installment", amount: 3759885, currency: "BDT", status: "Completed", date: "" },
            { id: v4(), label: "2nd Installment (by Sep 2025)", amount: 3007907, currency: "BDT", status: "Completed", date: "2025-09-01" },
            { id: v4(), label: "3rd Installment (by Nov 2025)", amount: 1117719, currency: "BDT", status: "Completed", date: "2025-11-01" },
            { id: v4(), label: "4th Installment – final 10% (by Mar 2026)", amount: 260859, currency: "BDT", status: "Pending", date: "2026-03-01" }
        ]
    },
    {
        id: v4(),
        donor: "GIGA",
        contractStart: "",
        contractEnd: "",
        totalBudget: 0,
        currency: "USD",
        status: "Not Started",
        activities: [],
        disbursements: []
    },
    {
        id: v4(),
        donor: "Embassy of Norway",
        contractStart: "",
        contractEnd: "",
        totalBudget: 0,
        currency: "USD",
        status: "Not Started",
        activities: [],
        disbursements: []
    },
    {
        id: v4(),
        donor: "Porticus",
        contractStart: "",
        contractEnd: "",
        totalBudget: 0,
        currency: "USD",
        status: "Not Started",
        activities: [],
        disbursements: []
    },
    {
        id: v4(),
        donor: "University of Kansas",
        contractStart: "",
        contractEnd: "",
        totalBudget: 0,
        currency: "USD",
        status: "Not Started",
        activities: [],
        disbursements: []
    }
];
