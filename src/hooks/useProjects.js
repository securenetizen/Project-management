import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:5001/api';
const TOKEN_KEY = 'pm_token';

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = useCallback(async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/projects`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) setProjects(data);
        } catch (err) {
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const addProject = useCallback(async (project) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/projects`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(project)
            });
            const data = await res.json();
            if (res.ok) {
                setProjects(prev => [...prev, data]);
                return data;
            }
        } catch (err) {
            console.error('Error adding project:', err);
        }
    }, []);

    const updateProject = useCallback(async (id, updates) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (res.ok) {
                setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
                return data;
            }
        } catch (err) {
            console.error('Error updating project:', err);
        }
    }, []);

    const deleteProject = useCallback(async (id) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setProjects(prev => prev.filter(p => p.id !== id));
                return true;
            }
        } catch (err) {
            console.error('Error deleting project:', err);
        }
        return false;
    }, []);

    const addActivity = useCallback(async (projectId, activity) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/activities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...activity, projectId })
            });
            const data = await res.json();
            if (res.ok) {
                setProjects(prev => prev.map(p => {
                    if (p.id !== projectId) return p;
                    return { ...p, activities: [...(p.activities || []), data] };
                }));
                return data;
            }
        } catch (err) {
            console.error('Error adding activity:', err);
        }
    }, []);

    const updateActivity = useCallback(async (projectId, activityId, updates) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/activities/${activityId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (res.ok) {
                setProjects(prev => prev.map(p => {
                    if (p.id !== projectId) return p;
                    return {
                        ...p,
                        activities: p.activities.map(a => a.id === activityId ? { ...a, ...data } : a)
                    };
                }));
                return data;
            }
        } catch (err) {
            console.error('Error updating activity:', err);
        }
    }, []);

    const deleteActivity = useCallback(async (projectId, activityId) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/activities/${activityId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setProjects(prev => prev.map(p => {
                    if (p.id !== projectId) return p;
                    return { ...p, activities: p.activities.filter(a => a.id !== activityId) };
                }));
                return true;
            }
        } catch (err) {
            console.error('Error deleting activity:', err);
        }
        return false;
    }, []);

    const addDisbursement = useCallback(async (projectId, disbursement) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/disbursements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...disbursement, projectId })
            });
            const data = await res.json();
            if (res.ok) {
                setProjects(prev => prev.map(p => {
                    if (p.id !== projectId) return p;
                    return { ...p, disbursements: [...(p.disbursements || []), data] };
                }));
                return data;
            }
        } catch (err) {
            console.error('Error adding disbursement:', err);
        }
    }, []);

    const updateDisbursement = useCallback(async (projectId, disbursementId, updates) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/disbursements/${disbursementId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
            const data = await res.json();
            if (res.ok) {
                setProjects(prev => prev.map(p => {
                    if (p.id !== projectId) return p;
                    return {
                        ...p,
                        disbursements: p.disbursements.map(d => d.id === disbursementId ? { ...d, ...data } : d)
                    };
                }));
                return data;
            }
        } catch (err) {
            console.error('Error updating disbursement:', err);
        }
    }, []);

    const deleteDisbursement = useCallback(async (projectId, disbursementId) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const res = await fetch(`${API_BASE}/disbursements/${disbursementId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchProjects();
                return true;
            }
        } catch (err) {
            console.error('Error deleting disbursement:', err);
        }
        return false;
    }, [fetchProjects]);

    // --- File Management ---

    const uploadFile = useCallback(async (projectId, file) => {
        const formData = new FormData();
        formData.append('projectId', projectId);
        formData.append('file', file);

        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const response = await fetch(`${API_BASE}/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                fetchProjects();
                return true;
            }
        } catch (err) {
            console.error('Error uploading file:', err);
        }
        return false;
    }, [fetchProjects]);

    const downloadFile = useCallback(async (attachmentId, originalName) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const response = await fetch(`${API_BASE}/download/${attachmentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = originalName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
                return true;
            }
        } catch (err) {
            console.error('Error downloading file:', err);
        }
        return false;
    }, []);

    const deleteFile = useCallback(async (attachmentId) => {
        const token = localStorage.getItem(TOKEN_KEY);
        try {
            const response = await fetch(`${API_BASE}/attachments/${attachmentId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchProjects();
                return true;
            }
        } catch (err) {
            console.error('Error deleting file:', err);
        }
        return false;
    }, [fetchProjects]);

    return {
        projects,
        loading,
        addProject,
        updateProject,
        deleteProject,
        addActivity,
        updateActivity,
        deleteActivity,
        addDisbursement,
        updateDisbursement,
        deleteDisbursement,
        uploadFile,
        downloadFile,
        deleteFile
    };
}
