import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

function UserForm({ user, onSave, onClose }) {
    const [form, setForm] = useState({
        username: user?.username || '',
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'viewer',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...form };
        if (user && !data.password) delete data.password; // don't overwrite password if blank
        onSave(data);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{user ? 'Edit User' : 'Add User'}</h3>
                    <button className="btn btn-ghost" onClick={onClose}>✕</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="form-label">Username</label>
                            <input
                                className="form-input"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Username for login"
                                required
                                autoFocus
                                disabled={!!user} // can't change username once created
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                className="form-input"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Full name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email address"
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Role</label>
                                <select className="form-select" name="role" value={form.role} onChange={handleChange}>
                                    <option value="Admin">Admin</option>
                                    <option value="Editor">Editor</option>
                                    <option value="Viewer">Viewer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">{user ? 'New Password (leave blank to keep)' : 'Password'}</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder={user ? '••••••••' : 'Set password'}
                                    required={!user}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">
                            {user ? 'Save Changes' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function UserManagement() {
    const { users, currentUser, addUser, updateUser, deleteUser, isAdmin } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    if (!isAdmin) {
        return (
            <div className="fade-in">
                <div className="page-header">
                    <div>
                        <h2>User Management</h2>
                        <p className="page-header-subtitle">You don't have permission to manage users</p>
                    </div>
                </div>
                <div className="empty-state">
                    <div className="empty-state-icon">🔒</div>
                    <p>Only administrators can manage users.</p>
                </div>
            </div>
        );
    }

    const getRoleBadgeClass = (role) => {
        if (role === 'Admin') return 'in-progress';
        if (role === 'Editor') return 'pending';
        return 'not-started';
    };

    return (
        <div className="fade-in">
            <div className="page-header">
                <div>
                    <h2>User Management</h2>
                    <p className="page-header-subtitle">Manage who has access to the dashboard</p>
                </div>
                <button className="btn btn-primary" onClick={() => { setEditUser(null); setShowForm(true); }}>
                    ＋ Add User
                </button>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-label">Total Users</div>
                    <div className="stat-card-value accent">{users.length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-label">Admins</div>
                    <div className="stat-card-value info">{users.filter(u => u.role === 'Admin').length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-label">Editors</div>
                    <div className="stat-card-value warning">{users.filter(u => u.role === 'Editor').length}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-label">Viewers</div>
                    <div className="stat-card-value success">{users.filter(u => u.role === 'Viewer').length}</div>
                </div>
            </div>

            {/* Users Table */}
            <table className="data-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div className="user-avatar">
                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>{user.name}</div>
                                        {user.id === currentUser?.id && (
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-accent)' }}>You</span>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>{user.username}</td>
                            <td style={{ color: user.email ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                {user.email || '—'}
                            </td>
                            <td>
                                <span className={`status-badge ${getRoleBadgeClass(user.role)}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <div className="actions-cell">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => { setEditUser(user); setShowForm(true); }}
                                    >
                                        ✏️
                                    </button>
                                    {user.id === currentUser?.id ? (
                                        <button className="btn btn-ghost btn-sm" disabled title="Can't delete yourself">
                                            🔒
                                        </button>
                                    ) : confirmDelete === user.id ? (
                                        <div className="confirm-delete">
                                            <button className="btn btn-danger btn-sm" onClick={() => { deleteUser(user.id); setConfirmDelete(null); }}>Yes</button>
                                            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmDelete(null)}>No</button>
                                        </div>
                                    ) : (
                                        <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(user.id)}>
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* User Form Modal */}
            {showForm && (
                <UserForm
                    user={editUser}
                    onSave={(data) => {
                        if (editUser) {
                            updateUser(editUser.id, data);
                        } else {
                            addUser(data);
                        }
                        setShowForm(false);
                        setEditUser(null);
                    }}
                    onClose={() => { setShowForm(false); setEditUser(null); }}
                />
            )}
        </div>
    );
}
