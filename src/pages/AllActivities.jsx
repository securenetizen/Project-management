import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getStatusClass } from '../data/utils.js';

export default function AllActivities({ projects }) {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const allActivities = useMemo(() => {
        const activities = [];
        projects.forEach(project => {
            if (project.activities) {
                project.activities.forEach(activity => {
                    activities.push({
                        ...activity,
                        projectName: project.donor,
                        projectId: project.id
                    });
                });
            }
        });
        return activities;
    }, [projects]);

    const filtered = useMemo(() => {
        return allActivities.filter(a => {
            const matchSearch = !search ||
                a.title.toLowerCase().includes(search.toLowerCase()) ||
                a.projectName.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === 'All' || a.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [allActivities, search, statusFilter]);

    const groupedByProject = useMemo(() => {
        const groups = {};
        filtered.forEach(a => {
            if (!groups[a.projectName]) {
                groups[a.projectName] = {
                    id: a.projectId,
                    name: a.projectName,
                    activities: []
                };
            }
            groups[a.projectName].activities.push(a);
        });
        return Object.values(groups).sort((a, b) => a.name.localeCompare(b.name));
    }, [filtered]);

    const statuses = ['All', 'Not Started', 'In Progress', 'Completed'];

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <div className="breadcrumb">
                        <Link to="/">Dashboard</Link> / <span>Activities</span>
                    </div>
                    <h2>All Activities</h2>
                    <p className="page-header-subtitle">Comprehensive list of activities across all projects</p>
                </div>
            </div>

            <div className="toolbar">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search activities or projects..."
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

            <div className="activities-project-list">
                {groupedByProject.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <p>No activities found</p>
                    </div>
                ) : (
                    groupedByProject.map(group => (
                        <div key={group.id} className="activity-group-card">
                            <div className="activity-group-header">
                                <Link to={`/project/${group.id}`} className="activity-group-title">
                                    {group.name}
                                </Link>
                                <span className="activity-count-badge">
                                    {group.activities.length} {group.activities.length === 1 ? 'activity' : 'activities'}
                                </span>
                            </div>
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Activity</th>
                                            <th>Lead</th>
                                            <th>Deadline</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {group.activities.map(activity => (
                                            <tr key={activity.id}>
                                                <td className="activity-title-cell">
                                                    <div className="activity-title">{activity.title}</div>
                                                    {activity.description && <div className="activity-desc">{activity.description}</div>}
                                                </td>
                                                <td>{activity.lead || '—'}</td>
                                                <td>{activity.deadline ? formatDate(activity.deadline) : '—'}</td>
                                                <td>
                                                    <span className={`status-badge ${getStatusClass(activity.status)}`}>
                                                        {activity.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
