import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatCurrency, getStatusClass, getProgress } from '../data/utils.js';
import ProjectForm from '../components/ProjectForm.jsx';

export default function Dashboard({ projects, loading, onAddProject, onUpdateProject, onDeleteProject }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [showForm, setShowForm] = useState(false);

    const stats = useMemo(() => {
        // ... same logic
        const total = projects.length;
        const active = projects.filter(p => p.status === 'Active').length;
        const completed = projects.filter(p => p.status === 'Completed').length;
        const totalActivities = projects.reduce((sum, p) => sum + (p.activities?.length || 0), 0);

        const rates = { 'USD': 1, 'BDT': 1 / 110, 'EUR': 1.08, 'DKK': 0.14 };
        const getUSD = (amount, currency) => amount * (rates[currency] || 1);

        return {
            total, active, completed, totalActivities,
            budgets: {
                total: projects.reduce((sum, p) => sum + getUSD(p.totalBudget, p.currency), 0),
                completed: projects.filter(p => p.status === 'Completed').reduce((sum, p) => sum + getUSD(p.totalBudget, p.currency), 0),
                ongoing: projects.filter(p => p.status === 'Active').reduce((sum, p) => sum + getUSD(p.totalBudget, p.currency), 0),
                upcoming: projects.filter(p => p.status === 'Not Started').reduce((sum, p) => sum + getUSD(p.totalBudget, p.currency), 0),
            }
        };
    }, [projects]);

    const filtered = useMemo(() => {
        return projects.filter(p => {
            const matchSearch = !search || p.donor.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === 'All' || p.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [projects, search, statusFilter]);

    if (loading) {
        return (
            <div className="empty-state">
                <p>Loading projects...</p>
            </div>
        );
    }

    const statuses = ['All', 'Active', 'Completed', 'Not Started', 'Terminated'];

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h2>Dashboard</h2>
                    <p className="page-header-subtitle">Manage your projects and track progress</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    ＋ New Project
                </button>
            </div>

            {/* Main Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-label">Total Projects</div>
                    <div className="stat-card-value accent">{stats.total}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-label">Active</div>
                    <div className="stat-card-value info">{stats.active}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-label">Completed</div>
                    <div className="stat-card-value success">{stats.completed}</div>
                </div>
                <Link to="/activities" className="stat-card clickable-stat">
                    <div className="stat-card-label">Total Activities</div>
                    <div className="stat-card-value warning">
                        {stats.totalActivities}
                        <span className="stat-card-icon">↗</span>
                    </div>
                </Link>
            </div>

            {/* Budget Summary */}
            <div className="section-header">
                <h3>Budget Summary</h3>
                <span className="text-muted text-sm">(Converted to USD for comparison)</span>
            </div>
            <div className="stats-grid budget-summary-grid">
                <div className="stat-card budget-card total">
                    <div className="stat-card-label">Total Budget</div>
                    <div className="stat-card-value">{formatCurrency(stats.budgets.total, 'USD')}</div>
                </div>
                <div className="stat-card budget-card completed">
                    <div className="stat-card-label">Completed Projects Budget</div>
                    <div className="stat-card-value">{formatCurrency(stats.budgets.completed, 'USD')}</div>
                </div>
                <div className="stat-card budget-card ongoing">
                    <div className="stat-card-label">Ongoing Budget</div>
                    <div className="stat-card-value">{formatCurrency(stats.budgets.ongoing, 'USD')}</div>
                </div>
                <div className="stat-card budget-card upcoming">
                    <div className="stat-card-label">Upcoming Budget</div>
                    <div className="stat-card-value">{formatCurrency(stats.budgets.upcoming, 'USD')}</div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="toolbar">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-pills">
                    {statuses.map(s => (
                        <button
                            key={s}
                            className={`filter-pill ${statusFilter === s ? 'active' : ''}`}
                            onClick={() => setStatusFilter(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Project Grid */}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📋</div>
                    <p>No projects found</p>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                        Create your first project
                    </button>
                </div>
            ) : (
                <div className="projects-grid">
                    {filtered.map(project => {
                        const progress = getProgress(project);
                        const completed = project.activities?.filter(a => a.status === 'Completed').length || 0;
                        const total = project.activities?.length || 0;
                        return (
                            <Link to={`/project/${project.id}`} className="project-card" key={project.id}>
                                <div className="project-card-header">
                                    <div>
                                        <div className="project-card-donor">{project.donor}</div>
                                        <div className="project-card-dates">
                                            {formatDate(project.contractStart)} — {formatDate(project.contractEnd)}
                                        </div>
                                    </div>
                                    <span className={`status-badge ${getStatusClass(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <div className="project-card-body">
                                    <div className="project-card-progress">
                                        <div className="progress-bar-container">
                                            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                                        </div>
                                        <div className="progress-label">
                                            <span>{completed}/{total} activities</span>
                                            <span>{progress}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="project-card-footer">
                                    <div className="project-card-budget">
                                        {project.totalBudget ? formatCurrency(project.totalBudget, project.currency) : '—'}
                                    </div>
                                    <div className="project-card-stats">
                                        <span>{project.disbursements?.length || 0} disbursements</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Add Project Modal */}
            {showForm && (
                <ProjectForm
                    onSave={(data) => {
                        onAddProject(data);
                        setShowForm(false);
                    }}
                    onClose={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
