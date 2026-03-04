import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import { useProjects } from './hooks/useProjects.js';
import Dashboard from './pages/Dashboard.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import LoginPage from './pages/LoginPage.jsx';
import UserManagement from './pages/UserManagement.jsx';
import AllActivities from './pages/AllActivities.jsx';

function Sidebar({ isOpen, onClose }) {
    const { currentUser, logout, isAdmin } = useAuth();

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-logo">
                <img src="/logo.png" alt="Digitally Right" className="sidebar-logo-img" />
            </div>
            <nav className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose} end>
                    <span className="nav-icon">📊</span>
                    Dashboard
                </NavLink>
                {isAdmin && (
                    <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={onClose}>
                        <span className="nav-icon">👥</span>
                        User Management
                    </NavLink>
                )}
            </nav>
            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="user-avatar">
                        {currentUser?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">{currentUser?.name}</div>
                        <div className="sidebar-user-role">{currentUser?.role}</div>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={logout} title="Sign out">
                        🚪
                    </button>
                </div>
            </div>
        </aside>
    );
}

function AuthenticatedApp() {
    const {
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
    } = useProjects();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-layout">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
            </button>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="main-content">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Dashboard
                                projects={projects}
                                loading={loading}
                                onAddProject={addProject}
                                onUpdateProject={updateProject}
                                onDeleteProject={deleteProject}
                            />
                        }
                    />
                    <Route
                        path="/project/:id"
                        element={
                            <ProjectDetail
                                projects={projects}
                                onUpdateProject={updateProject}
                                onDeleteProject={deleteProject}
                                onAddActivity={addActivity}
                                onUpdateActivity={updateActivity}
                                onDeleteActivity={deleteActivity}
                                onAddDisbursement={addDisbursement}
                                onUpdateDisbursement={updateDisbursement}
                                onDeleteDisbursement={deleteDisbursement}
                                onUploadFile={uploadFile}
                                onDownloadFile={downloadFile}
                                onDeleteFile={deleteFile}
                                onAddReport={addReport}
                                onUpdateReport={updateReport}
                                onDeleteReport={deleteReport}
                            />
                        }
                    />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/activities" element={<AllActivities projects={projects} />} />
                </Routes>
            </main>
        </div>
    );
}

function AppRouter() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <LoginPage />;
    }

    return <AuthenticatedApp />;
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthProvider>
    );
}
