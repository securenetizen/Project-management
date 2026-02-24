import { useState } from 'react';

export default function ProjectForm({ project, onSave, onClose }) {
    const [form, setForm] = useState({
        donor: project?.donor || '',
        contractStart: project?.contractStart || '',
        contractEnd: project?.contractEnd || '',
        totalBudget: project?.totalBudget || '',
        currency: project?.currency || 'USD',
        status: project?.status || 'Not Started',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
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
            <div className="modal" onClick={e => e.stopPropagation()}>
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
