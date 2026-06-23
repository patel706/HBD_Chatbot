import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './sidebar/Sidebar';
import { useTheme } from '../hooks/useTheme';

export default function Layout({
  isLoggedIn, setIsLoggedIn,
  session, setSession,
  currentSessionId, setCurrentSessionId,
  chatList, setChatList,
  chatListLoading, setChatListLoading,
  onNewChat,
  onLoadSession,
  onDeleteSession,
  toast,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSession({ type: 'GUEST', phone: null, businessId: null });
    if (setCurrentSessionId) setCurrentSessionId(null);
    if (setChatList) setChatList([]);
    toast?.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isLoggedIn={isLoggedIn}
        session={session}
        onLogout={handleLogout}
        chatList={chatList || []}
        chatListLoading={chatListLoading || false}
        currentSessionId={currentSessionId}
        onNewChat={onNewChat}
        onLoadSession={onLoadSession}
        onDeleteSession={onDeleteSession}
        onLoadChatList={() => {}}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main content */}
      <div className="main-content">
        {/* Mobile top bar */}
        <div style={{
          display: 'none',
          padding: '12px 16px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          alignItems: 'center',
          gap: 12,
          position: 'sticky', top: 0, zIndex: 30,
        }}
          id="mobile-topbar"
          className="mobile-topbar"
        >
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              padding: 7, borderRadius: 8, border: 'none',
              background: 'var(--bg-surface-2)', cursor: 'pointer',
              color: 'var(--text-secondary)', display: 'flex', alignItems: 'center',
            }}
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>
          <div style={{
            width: 28, height: 28, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
          }}>🐝</div>
          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>CityHangAround AI</span>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}