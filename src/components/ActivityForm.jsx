import { useState } from 'react';

export default function ActivityForm({ activity, onSave, onClose }) {
    const [form, setForm] = useState({
        title: activity?.title || '',
        description: activity?.description || '',
        deadline: activity?.deadline || '',
        status: activity?.status || 'Not Started',
        lead: activity?.lead || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{activity ? 'Edit Activity' : 'New Activity'}</h3>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Activity Title</label>
                            <input
                                className="form-input"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g. Digital Safety Training..."
                                required
                                autoFocus
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-textarea"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Additional details..."
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Deadline</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    name="deadline"
                                    value={form.deadline}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Activity Lead</label>
                            <input
                                className="form-input"
                                name="lead"
                                value={form.lead}
                                onChange={handleChange}
                                placeholder="Person responsible..."
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {activity ? 'Save Changes' : 'Add Activity'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
