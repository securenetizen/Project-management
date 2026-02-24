import { useState } from 'react';

export default function DisbursementForm({ disbursement, currencies, onSave, onClose }) {
    const [form, setForm] = useState({
        label: disbursement?.label || '',
        amount: disbursement?.amount || '',
        currency: disbursement?.currency || currencies?.[0] || 'USD',
        status: disbursement?.status || 'Pending',
        date: disbursement?.date || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...form,
            amount: Number(form.amount) || 0,
        });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{disbursement ? 'Edit Disbursement' : 'New Disbursement'}</h3>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Milestone Label</label>
                            <input
                                className="form-input"
                                name="label"
                                value={form.label}
                                onChange={handleChange}
                                placeholder="e.g. First instalment on signing..."
                                required
                                autoFocus
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Amount</label>
                                <input
                                    className="form-input"
                                    type="number"
                                    name="amount"
                                    value={form.amount}
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
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Expected Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {disbursement ? 'Save Changes' : 'Add Disbursement'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
