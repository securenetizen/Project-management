import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDate, formatCurrency, getStatusClass, getProgress } from '../data/utils.js';
import ProjectForm from '../components/ProjectForm.jsx';
import ActivityForm from '../components/ActivityForm.jsx';
import DisbursementForm from '../components/DisbursementForm.jsx';

export default function ProjectDetail({
    projects,
    onUpdateProject,
    onDeleteProject,
    onAddActivity,
    onUpdateActivity,
    onDeleteActivity,
    onAddDisbursement,
    onUpdateDisbursement,
    onDeleteDisbursement,
    onUploadFile,
    onDownloadFile,
    onDeleteFile,
}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === id);

    const [activeTab, setActiveTab] = useState('activities');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showActivityForm, setShowActivityForm] = useState(false);
    const [editActivity, setEditActivity] = useState(null);
    const [showDisbursementForm, setShowDisbursementForm] = useState(false);
    const [editDisbursement, setEditDisbursement] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [confirmDeleteProject, setConfirmDeleteProject] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [confirmDeleteFile, setConfirmDeleteFile] = useState(null);

    if (!project) {
        return (
            <div className="fade-in">
                <Link to="/" className="back-link">← Back to Dashboard</Link>
                <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <p>Project not found</p>
                </div>
            </div>
        );
    }

    const progress = getProgress(project);
    const completedCount = project.activities?.filter(a => a.status === 'Completed').length || 0;
    const totalDisbursed = project.disbursements
        ?.filter(d => d.status === 'Completed')
        .reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
    const totalDisbursements = project.disbursements
        ?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;

    const handleDeleteProject = () => {
        onDeleteProject(project.id);
        navigate('/');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            await onUploadFile(project.id, file);
        } catch (err) {
            console.error('File upload failed:', err);
        } finally {
            setUploading(false);
            e.target.value = ''; // Reset input
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <div className="fade-in">
            <Link to="/" className="back-link">← Back to Dashboard</Link>

            {/* Header */}
            <div className="detail-header">
                <div className="detail-header-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <h2>{project.donor}</h2>
                        <span className={`status-badge ${getStatusClass(project.status)}`}>
                            {project.status}
                        </span>
                    </div>
                    <div className="detail-meta">
                        <div className="detail-meta-item">
                            <span className="detail-meta-label">Contract Period</span>
                            <span className="detail-meta-value">
                                {formatDate(project.contractStart)} — {formatDate(project.contractEnd)}
                            </span>
                        </div>
                        <div className="detail-meta-item">
                            <span className="detail-meta-label">Budget</span>
                            <span className="detail-meta-value">
                                {project.totalBudget ? formatCurrency(project.totalBudget, project.currency) : '—'}
                            </span>
                        </div>
                        <div className="detail-meta-item">
                            <span className="detail-meta-label">Progress</span>
                            <span className="detail-meta-value">
                                {completedCount}/{project.activities?.length || 0} ({progress}%)
                            </span>
                        </div>
                        <div className="detail-meta-item">
                            <span className="detail-meta-label">Disbursed</span>
                            <span className="detail-meta-value">
                                {formatCurrency(totalDisbursed, project.currency)}
                                {totalDisbursements > 0 ? ` / ${formatCurrency(totalDisbursements, project.currency)}` : ''}
                            </span>
                        </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{ marginTop: '16px', maxWidth: '400px' }}>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
                <div className="detail-header-actions">
                    <button className="btn btn-secondary btn-sm" onClick={() => setShowProjectForm(true)}>
                        ✏️ Edit
                    </button>
                    {!confirmDeleteProject ? (
                        <button className="btn btn-danger btn-sm" onClick={() => setConfirmDeleteProject(true)}>
                            🗑️
                        </button>
                    ) : (
                        <div className="confirm-delete">
                            <span>Delete?</span>
                            <button className="btn btn-danger btn-sm" onClick={handleDeleteProject}>Yes</button>
                            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDeleteProject(false)}>No</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'activities' ? 'active' : ''}`}
                    onClick={() => setActiveTab('activities')}
                >
                    Activities ({project.activities?.length || 0})
                </button>
                <button
                    className={`tab ${activeTab === 'disbursements' ? 'active' : ''}`}
                    onClick={() => setActiveTab('disbursements')}
                >
                    Fund Disbursements ({project.disbursements?.length || 0})
                </button>
                <button
                    className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
                    onClick={() => setActiveTab('documents')}
                >
                    Documents ({project.attachments?.length || 0})
                </button>
            </div>

            {/* Activities Tab */}
            {activeTab === 'activities' && (
                <div className="slide-in">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => { setEditActivity(null); setShowActivityForm(true); }}
                        >
                            ＋ Add Activity
                        </button>
                    </div>

                    {(!project.activities || project.activities.length === 0) ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📝</div>
                            <p>No activities yet</p>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => { setEditActivity(null); setShowActivityForm(true); }}
                            >
                                Add first activity
                            </button>
                        </div>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Activity</th>
                                    <th>Lead</th>
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.activities.map(activity => (
                                    <tr key={activity.id}>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{activity.title}</div>
                                            {activity.description && (
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                    {activity.description}
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ color: activity.lead ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                            {activity.lead || '—'}
                                        </td>
                                        <td>{formatDate(activity.deadline)}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(activity.status)}`}>
                                                {activity.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => { setEditActivity(activity); setShowActivityForm(true); }}
                                                >
                                                    ✏️
                                                </button>
                                                {confirmDelete === activity.id ? (
                                                    <div className="confirm-delete">
                                                        <button className="btn btn-danger btn-sm" onClick={() => { onDeleteActivity(project.id, activity.id); setConfirmDelete(null); }}>Yes</button>
                                                        <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(null)}>No</button>
                                                    </div>
                                                ) : (
                                                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(activity.id)}>
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Disbursements Tab */}
            {activeTab === 'disbursements' && (
                <div className="slide-in">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => { setEditDisbursement(null); setShowDisbursementForm(true); }}
                        >
                            ＋ Add Disbursement
                        </button>
                    </div>

                    {(!project.disbursements || project.disbursements.length === 0) ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">💰</div>
                            <p>No disbursements yet</p>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => { setEditDisbursement(null); setShowDisbursementForm(true); }}
                            >
                                Add first disbursement
                            </button>
                        </div>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Milestone</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {project.disbursements.map(d => (
                                    <tr key={d.id}>
                                        <td style={{ fontWeight: 500 }}>{d.label}</td>
                                        <td style={{ fontWeight: 600 }}>
                                            {d.amount ? formatCurrency(d.amount, d.currency || project.currency) : '—'}
                                        </td>
                                        <td>{formatDate(d.date)}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(d.status)}`}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="actions-cell">
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => { setEditDisbursement(d); setShowDisbursementForm(true); }}
                                                >
                                                    ✏️
                                                </button>
                                                {confirmDelete === d.id ? (
                                                    <div className="confirm-delete">
                                                        <button className="btn btn-danger btn-sm" onClick={() => { onDeleteDisbursement(project.id, d.id); setConfirmDelete(null); }}>Yes</button>
                                                        <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(null)}>No</button>
                                                    </div>
                                                ) : (
                                                    <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(d.id)}>
                                                        🗑️
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
                <div className="slide-in">
                    <div className="file-upload-section">
                        <label className="file-upload-card">
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            <div className="file-upload-content">
                                <span className="file-upload-icon">{uploading ? '⏳' : '📁'}</span>
                                <div className="file-upload-text">
                                    <strong>{uploading ? 'Uploading...' : 'Click to Upload Document'}</strong>
                                    <p>Concept note, proposal, agreement, or budget file</p>
                                </div>
                            </div>
                        </label>
                    </div>

                    {(!project.attachments || project.attachments.length === 0) ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📂</div>
                            <p>No documents uploaded yet</p>
                        </div>
                    ) : (
                        <div className="files-grid">
                            {project.attachments.map(file => (
                                <div className="file-card" key={file.id}>
                                    <div className="file-card-icon">📄</div>
                                    <div className="file-card-details">
                                        <div className="file-card-name" title={file.originalName}>
                                            {file.originalName}
                                        </div>
                                        <div className="file-card-meta">
                                            {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                                        </div>
                                    </div>
                                    <div className="file-card-actions">
                                        <button
                                            className="btn btn-ghost btn-sm"
                                            onClick={() => onDownloadFile(file.id, file.originalName)}
                                            title="Download"
                                        >
                                            📥
                                        </button>
                                        {confirmDeleteFile === file.id ? (
                                            <div className="confirm-delete small">
                                                <button className="btn btn-danger btn-sm" onClick={() => { onDeleteFile(file.id); setConfirmDeleteFile(null); }}>Yes</button>
                                                <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDeleteFile(null)}>No</button>
                                            </div>
                                        ) : (
                                            <button
                                                className="btn btn-ghost btn-sm btn-danger-hover"
                                                onClick={() => setConfirmDeleteFile(file.id)}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Modals */}
            {showProjectForm && (
                <ProjectForm
                    project={project}
                    onSave={(data) => {
                        onUpdateProject(project.id, data);
                        setShowProjectForm(false);
                    }}
                    onClose={() => setShowProjectForm(false)}
                />
            )}

            {showActivityForm && (
                <ActivityForm
                    activity={editActivity}
                    onSave={(data) => {
                        if (editActivity) {
                            onUpdateActivity(project.id, editActivity.id, data);
                        } else {
                            onAddActivity(project.id, data);
                        }
                        setShowActivityForm(false);
                        setEditActivity(null);
                    }}
                    onClose={() => { setShowActivityForm(false); setEditActivity(null); }}
                />
            )}

            {showDisbursementForm && (
                <DisbursementForm
                    disbursement={editDisbursement}
                    currencies={[project.currency]}
                    onSave={(data) => {
                        if (editDisbursement) {
                            onUpdateDisbursement(project.id, editDisbursement.id, data);
                        } else {
                            onAddDisbursement(project.id, data);
                        }
                        setShowDisbursementForm(false);
                        setEditDisbursement(null);
                    }}
                    onClose={() => { setShowDisbursementForm(false); setEditDisbursement(null); }}
                />
            )}
        </div>
    );
}
