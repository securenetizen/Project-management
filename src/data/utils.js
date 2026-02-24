// Simple UUID v4 generator
export function v4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function formatCurrency(amount, currency = 'USD') {
    if (!amount && amount !== 0) return '—';
    const symbols = { USD: '$', EUR: '€', BDT: '৳', DKK: 'kr ' };
    const symbol = symbols[currency] || currency + ' ';
    return symbol + Number(amount).toLocaleString('en-US');
}

export function getStatusClass(status) {
    if (!status) return 'not-started';
    const s = status.toLowerCase().trim();
    if (s === 'completed') return 'completed';
    if (s === 'in progress' || s === 'active') return 'in-progress';
    if (s === 'not started') return 'not-started';
    if (s === 'pending') return 'pending';
    if (s === 'terminated') return 'terminated';
    return 'not-started';
}

export function getOverallStatus(project) {
    if (project.status === 'Terminated') return 'Terminated';
    if (!project.activities || project.activities.length === 0) return project.status || 'Not Started';
    const all = project.activities.length;
    const completed = project.activities.filter(a => a.status === 'Completed').length;
    if (completed === all) return 'Completed';
    if (completed > 0 || project.activities.some(a => a.status === 'In Progress')) return 'Active';
    return 'Not Started';
}

export function getProgress(project) {
    if (!project.activities || project.activities.length === 0) return 0;
    const completed = project.activities.filter(a => a.status === 'Completed').length;
    return Math.round((completed / project.activities.length) * 100);
}
