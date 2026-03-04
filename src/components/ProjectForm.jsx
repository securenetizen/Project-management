import { useState } from 'react';

export default function ProjectForm({ project, onSave, onClose }) {
    const [form, setForm] = useState({
        donor: project?.donor || '',
        contractStart: project?.contractStart || '',
        contractEnd: project?.contractEnd || '',
        totalBudget: project?.totalBudget || '',
        currency: project?.currency || 'USD',
        status: project?.status || 'Not Started',
        reportingSchedules: project?.reportingSchedules || []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleReportChange = (index, field, value) => {
        const newSchedules = [...form.reportingSchedules];
        newSchedules[index] = { ...newSchedules[index], [field]: value };
        setForm(prev => ({ ...prev, reportingSchedules: newSchedules }));
    };

    const addReport = () => {
        setForm(prev => ({
            ...prev,
            reportingSchedules: [
                ...prev.reportingSchedules,
                { period: 'Quarterly', type: 'Narrative', deadline: '', status: 'Pending' }
            ]
        }));
    };

    const removeReport = (index) => {
        setForm(prev => ({
            ...prev,
            reportingSchedules: prev.reportingSchedules.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            totalBudget: Number(form.totalBudget) || 0,
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{project ? 'Edit Project' : 'New Project'}</h3>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Donor / Funder</label>
                            <input
                                className="form-input"
                                name="donor"
                                value={form.donor}
                                onChange={handleChange}
                                placeholder="e.g. UNICEF, Luminate..."
                                required
                                autoFocus
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Contract Start</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    name="contractStart"
                                    value={form.contractStart}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contract End</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    name="contractEnd"
                                    value={form.contractEnd}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Total Budget</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="totalBudget"
                                    value={form.totalBudget}
                                    onChange={handleChange}
                                    placeholder="0"
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Currency</label>
                                <select className="form-select" name="currency" value={form.currency} onChange={handleChange}>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="BDT">BDT (৳)</option>
                                    <option value="DKK">DKK (kr)</option>
                                    <option value="GBP">GBP (£)</option>
                                    <option value="CHF">CHF</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                                <option value="Not Started">Not Started</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Terminated">Terminated</option>
                            </select>
                        </div>

                        <div className="form-divider" style={{ margin: '24px 0 16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Reporting Schedules</h4>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={addReport}>＋ Add Report</button>
                        </div>

                        {form.reportingSchedules.map((report, index) => (
                            <div key={index} className="form-row" style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', marginBottom: '12px', position: 'relative' }}>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Period</label>
                                    <select className="form-select" value={report.period} onChange={(e) => handleReportChange(index, 'period', e.target.value)}>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Final">Final</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Type</label>
                                    <select className="form-select" value={report.type} onChange={(e) => handleReportChange(index, 'type', e.target.value)}>
                                        <option value="Narrative">Narrative</option>
                                        <option value="Financial">Financial</option>
                                        <option value="Both">Both (Narrative & Financial)</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="form-label">Deadline Date</label>
                                    <input
                                        className="form-input"
                                        type="date"
                                        value={report.deadline}
                                        onChange={(e) => handleReportChange(index, 'deadline', e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => removeReport(index)}
                                    style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--bg-card)', borderRadius: '50%', border: '1px solid var(--border-color)', width: '24px', height: '24px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    title="Remove Report"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {project ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
