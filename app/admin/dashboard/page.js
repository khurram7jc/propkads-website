'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CLIENT_STATUSES = [
  'New',
  'Contacted',
  'Not Responding',
  'Qualified',
  'Meeting / Proposal',
  'In Negotiation',
  'Deal Closed',
  'Future Prospect',
  'Lost',
  'Not Interested',
  'Unqualified',
];

const PROJECT_STATUSES = [
  'New',
  'Contacted',
  'Not Responding',
  'Qualified',
  'Site Visit',
  'In Negotiation',
  'Deal Closed',
  'Future Prospect',
  'Not Interested',
  'Lost',
];

const STATUSES = CLIENT_STATUSES;

const AVAILABLE_PERMISSIONS = [
  { key: 'leads', label: 'Client Leads' },
  { key: 'project_leads', label: 'Project Leads' },
  { key: 'applications', label: 'Job Applications' },
  { key: 'blogs', label: 'News & Blogs' },
  { key: 'newsletter', label: 'Newsletter' },
];

const Icons = {
  leads: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  projectLeads: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  applications: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  blogs: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  ),
  newsletter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  team: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  menu: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  collapse: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  expand: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  logout: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  external: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
};

const baseUi = {
  layout: {
    display: 'flex',
    height: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
    background: '#F8FAFC',
    fontFamily: 'Inter, system-ui, sans-serif',
    width: '100%',
  },
  sidebar: (collapsed) => ({
    width: collapsed ? '68px' : '240px',
    background: '#0F172A',
    color: '#E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 40,
    borderRight: '1px solid #1E293B',
    userSelect: 'none',
    flexShrink: 0,
    overflow: 'hidden',
  }),
  sidebarHeader: (collapsed) => ({
    padding: collapsed ? '18px 0' : '18px 20px',
    borderBottom: '1px solid #1E293B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    minHeight: '62px',
    boxSizing: 'border-box',
  }),
  sidebarNav: {
    padding: '14px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1,
    overflowY: 'auto',
  },
  sidebarItem: (active, collapsed) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: collapsed ? '11px 0' : '11px 14px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    borderRadius: '8px',
    background: active ? '#14A750' : 'transparent',
    color: active ? '#FFFFFF' : '#94A3B8',
    fontWeight: active ? 600 : 500,
    fontSize: '13.5px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    transition: 'background 0.15s, color 0.15s',
    position: 'relative',
  }),
  sidebarBadge: {
    marginLeft: 'auto',
    background: 'rgba(255, 255, 255, 0.2)',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: 700,
    padding: '2px 7px',
    borderRadius: '10px',
  },
  sidebarFooter: {
    padding: '12px 14px',
    borderTop: '1px solid #1E293B',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: '#0B1120',
  },
  topBar: {
    height: '62px',
    flexShrink: 0,
    background: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    zIndex: 30,
  },
  body: {
    padding: '28px 32px',
    flex: 1,
    minWidth: 0,
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },
  statRow: { display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  statCard: { background: '#fff', border: '1px solid #E7E8EA', padding: '18px 22px', minWidth: 140 },
  statNum: { fontSize: 26, fontWeight: 700 },
  statLbl: { fontSize: 12, color: '#70757D', marginTop: 4 },
  toolbar: { display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' },
  input: { padding: '9px 12px', border: '1px solid #CBD5E1', fontSize: 13.5, minWidth: 220, borderRadius: '6px', outline: 'none' },
  select: {
    padding: '9px 34px 9px 12px',
    border: '1px solid #CBD5E1',
    borderRadius: '6px',
    fontSize: 13.5,
    fontWeight: '500',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '12px',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    minHeight: '38px',
  },
  selectInput: {
    width: '100%',
    padding: '10px 36px 10px 12px',
    border: '1px solid #CBD5E1',
    borderRadius: '6px',
    fontSize: 14,
    fontWeight: '500',
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '12px',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    minHeight: '40px',
  },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', minWidth: 800 },
  th: { textAlign: 'left', padding: 10, fontSize: 12, color: '#70757D', borderBottom: '2px solid #E7E8EA', textTransform: 'uppercase' },
  td: { padding: 10, fontSize: 13.5, borderBottom: '1px solid #E7E8EA' },
  statusPill: (s) => {
    switch (s) {
      case 'Deal Closed':
      case 'Closed':
      case 'Booked':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#E9F7EE',
          color: '#14A750',
          border: '1px solid rgba(20, 167, 80, 0.25)',
        };
      case 'Meeting / Proposal':
      case 'Qualified':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#EEF2FF',
          color: '#4F46E5',
          border: '1px solid rgba(79, 70, 229, 0.25)',
        };
      case 'In Negotiation':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#FEF3C7',
          color: '#D97706',
          border: '1px solid rgba(217, 119, 6, 0.25)',
        };
      case 'Future Prospect':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#E0F2FE',
          color: '#0284C7',
          border: '1px solid rgba(2, 132, 199, 0.25)',
        };
      case 'Contacted':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#FFF6E5',
          color: '#946200',
          border: '1px solid rgba(148, 98, 0, 0.25)',
        };
      case 'Not Responding':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#FFF1F2',
          color: '#BE123C',
          border: '1px solid rgba(190, 18, 60, 0.25)',
        };
      case 'Site Visit':
      case 'Site Visit Scheduled':
      case 'Site Visit Completed':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#F5F3FF',
          color: '#7C3AED',
          border: '1px solid rgba(124, 58, 237, 0.25)',
        };
      case 'Not Interested':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#FEE2E2',
          color: '#DC2626',
          border: '1px solid rgba(220, 38, 38, 0.25)',
        };
      case 'Lost':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#FFF1F2',
          color: '#BE123C',
          border: '1px solid rgba(190, 18, 60, 0.25)',
        };
      case 'Unqualified':
      case 'Un-Qualified':
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#F1F5F9',
          color: '#64748B',
          border: '1px solid rgba(100, 116, 139, 0.25)',
        };
      case 'New':
      default:
        return {
          fontSize: 11.5,
          fontWeight: 700,
          padding: '4px 10px',
          display: 'inline-block',
          borderRadius: '6px',
          background: '#F1F2F3',
          color: '#3F434A',
          border: '1px solid #E2E8F0',
        };
    }
  },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(20,22,26,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 },
  modal: { background: '#fff', width: '560px', maxWidth: '100%', maxHeight: '88vh', overflowY: 'auto', padding: 32 },
  label: { fontSize: 11.5, fontWeight: 600, color: '#70757D', textTransform: 'uppercase', display: 'block', marginBottom: 6, marginTop: 14 },
  fieldInput: { width: '100%', padding: '10px 12px', border: '1px solid #E7E8EA', fontSize: 14, boxSizing: 'border-box' },
  btnGreen: { background: '#14A750', color: '#fff', border: 'none', padding: '11px 18px', fontSize: 13.5, fontWeight: 600 },
  btnGhost: { background: 'transparent', color: '#3F434A', border: '1px solid #E7E8EA', padding: '11px 18px', fontSize: 13.5 },
  btnDanger: { background: 'transparent', color: '#B3261E', border: '1px solid #B3261E', padding: '11px 18px', fontSize: 13.5 },
};

export default function Dashboard() {
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [tab, setTab] = useState('leads');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [readNotifications, setReadNotifications] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 860;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ui = {
    ...baseUi,
    layout: {
      ...baseUi.layout,
      position: 'relative',
    },
    body: {
      ...baseUi.body,
      padding: isMobile ? '16px 12px 40px' : '28px 32px',
      minWidth: 0,
    },
    topBar: {
      ...baseUi.topBar,
      padding: isMobile ? '0 12px' : '0 28px',
    },
    statRow: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: isMobile ? '10px' : '16px',
      marginBottom: 20,
    },
    statCard: {
      ...baseUi.statCard,
      padding: isMobile ? '12px 14px' : '18px 22px',
      minWidth: 0,
      borderRadius: '8px',
    },
    statNum: {
      ...baseUi.statNum,
      fontSize: isMobile ? 22 : 26,
    },
    overlay: {
      ...baseUi.overlay,
      padding: isMobile ? 10 : 20,
      zIndex: 110,
    },
    modal: {
      ...baseUi.modal,
      width: '560px',
      maxWidth: '100%',
      maxHeight: isMobile ? '92vh' : '88vh',
      padding: isMobile ? '20px 16px' : 32,
      borderRadius: '10px',
      boxSizing: 'border-box',
    },
    input: {
      ...baseUi.input,
      minWidth: isMobile ? '100%' : 220,
      flex: isMobile ? '1 1 100%' : 'none',
      boxSizing: 'border-box',
      borderRadius: '6px',
    },
    select: {
      ...baseUi.select,
      borderRadius: '6px',
      boxSizing: 'border-box',
      width: isMobile ? '100%' : 'auto',
      maxWidth: '100%',
    },
    selectInput: {
      ...baseUi.selectInput,
      borderRadius: '6px',
      boxSizing: 'border-box',
    },
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pk_read_notifications');
      if (stored) setReadNotifications(JSON.parse(stored));
    } catch {}
  }, []);

  const markAsRead = (key) => {
    setReadNotifications((prev) => {
      if (prev.includes(key)) return prev;
      const updated = [...prev, key];
      try {
        localStorage.setItem('pk_read_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markAllAsRead = () => {
    const allKeys = newNotifications.map((l) => l.notifKey);
    setReadNotifications((prev) => {
      const merged = Array.from(new Set([...prev, ...allKeys]));
      try {
        localStorage.setItem('pk_read_notifications', JSON.stringify(merged));
      } catch {}
      return merged;
    });
  };

  // Client Leads state (Developers / Builders from Home & Contact Us)
  const [leads, setLeads] = useState([]);
  const [totalClientCount, setTotalClientCount] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [newNoteDate, setNewNoteDate] = useState('');
  const [newNoteAction, setNewNoteAction] = useState('Call');

  // Project Leads state (Buyers / Investors per Project, e.g. Karachi Enclave)
  const [projectLeads, setProjectLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState('Karachi Enclave');
  const [projSearch, setProjSearch] = useState('');
  const [projUnitFilter, setProjUnitFilter] = useState('');
  const [projStatusFilter, setProjStatusFilter] = useState('');


  const hasAccess = (permKey) => {
    if (!me) return false;
    if (me.role === 'admin') return true;
    const userPerms = Array.isArray(me.permissions) ? me.permissions : [];
    return userPerms.includes('all') || userPerms.includes(permKey);
  };

  // Team state
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    permissions: [],
  });
  const [teamError, setTeamError] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [updatingPerms, setUpdatingPerms] = useState(false);
  const [createdInvite, setCreatedInvite] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  // Newsletter state
  const [subscribers, setSubscribers] = useState([]);

  // Applications state
  const [applications, setApplications] = useState([]);
  const [appSearch, setAppSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogPlacementFilter, setBlogPlacementFilter] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isBlogSaving, setIsBlogSaving] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setMe(d.user);
          if (d.user.role !== 'admin') {
            const userPerms = Array.isArray(d.user.permissions) ? d.user.permissions : [];
            if (!userPerms.includes('all') && !userPerms.includes('leads')) {
              const firstAllowed = AVAILABLE_PERMISSIONS.find((p) => userPerms.includes(p.key));
              if (firstAllowed) setTab(firstAllowed.key);
            }
          }
        } else {
          router.push('/admin');
        }
      });
  }, []);

  useEffect(() => {
    if (!me) return;
    if (tab === 'leads' && hasAccess('leads')) loadLeads();
    if (tab === 'project_leads' && hasAccess('project_leads')) loadProjectLeads();
    if (tab === 'team' && me.role === 'admin') loadUsers();
    if (tab === 'newsletter' && hasAccess('newsletter')) loadSubscribers();
    if (tab === 'applications' && hasAccess('applications')) loadApplications();
    if (tab === 'blogs' && hasAccess('blogs')) loadBlogs();
  }, [tab, me]);

  useEffect(() => {
    if (!me) return;
    if (hasAccess('leads')) loadLeads();
    if (hasAccess('project_leads')) loadProjectLeads();
    if (hasAccess('applications')) loadApplications();
    if (hasAccess('newsletter')) loadSubscribers();
    const interval = setInterval(() => {
      if (hasAccess('leads')) loadLeads();
      if (hasAccess('project_leads')) loadProjectLeads();
      if (hasAccess('applications')) loadApplications();
      if (hasAccess('newsletter')) loadSubscribers();
    }, 30000);
    return () => clearInterval(interval);
  }, [me]);

  const loadLeads = async () => {
    const res = await fetch('/api/admin/leads?category=client');
    const d = await res.json();
    if (d.success) {
      setLeads(d.leads);
      setTotalClientCount(d.leads.length);
    }
  };

  const loadProjectLeads = async () => {
    const params = new URLSearchParams();
    params.set('category', 'project');
    const res = await fetch(`/api/admin/leads?${params.toString()}`);
    const d = await res.json();
    if (d.success) setProjectLeads(d.leads);
  };


  const loadUsers = async () => {
    const res = await fetch('/api/admin/users');
    const d = await res.json();
    if (d.success) setUsers(d.users);
  };

  const loadSubscribers = async () => {
    const res = await fetch('/api/admin/newsletter');
    const d = await res.json();
    if (d.success) setSubscribers(d.subscribers);
  };

  const loadApplications = async () => {
    const params = new URLSearchParams();
    if (appSearch) params.set('search', appSearch);
    const res = await fetch(`/api/admin/applications?${params.toString()}`);
    const d = await res.json();
    if (d.success) setApplications(d.applications);
  };

  const deleteApplication = async (app) => {
    if (!confirm(`Delete application for "${app.full_name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/applications?id=${app.id}`, { method: 'DELETE' });
    const d = await res.json();
    if (d.success) {
      if (selectedApp?.id === app.id) setSelectedApp(null);
      loadApplications();
    }
  };

  const loadBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      const d = await res.json();
      if (d.success && Array.isArray(d.blogs)) {
        setBlogs(d.blogs);
      }
    } catch (e) {
      console.error('Failed to load blogs:', e);
    }
  };

  const openNewBlogModal = () => {
    setSelectedBlog({
      id: '',
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      readTime: '4 min read',
      image: '',
      excerpt: '',
      fullContent: '',
      takeawaysText: '',
      placement: 'grid',
    });
  };

  const openEditBlogModal = (b) => {
    setSelectedBlog({
      ...b,
      placement: b.isFeatured ? 'featured' : b.isTrending ? 'trending' : 'grid',
      takeawaysText: Array.isArray(b.takeaways) ? b.takeaways.join('\n') : '',
    });
  };

  const handleBlogImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 1200;

        if (width > height && width > MAX_DIM) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else if (height > MAX_DIM) {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        setSelectedBlog((prev) => ({ ...prev, image: compressedBase64 }));
      };
      img.src = loadEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  const saveBlogArticle = async () => {
    if (!selectedBlog.title || !selectedBlog.title.trim()) {
      alert('Please enter an article title.');
      return;
    }

    setIsBlogSaving(true);
    try {
      const payload = {
        id: selectedBlog.id || undefined,
        title: selectedBlog.title.trim(),
        date: selectedBlog.date || 'Nov 2025',
        readTime: selectedBlog.readTime || '4 min read',
        image: selectedBlog.image || '',
        excerpt: selectedBlog.excerpt || '',
        fullContent: selectedBlog.fullContent || '',
        takeaways: selectedBlog.takeawaysText
          ? selectedBlog.takeawaysText.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
        isFeatured: selectedBlog.placement === 'featured',
        isTrending: selectedBlog.placement === 'trending',
      };

      const method = selectedBlog.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (d.success) {
        setSelectedBlog(null);
        await loadBlogs();
      } else {
        alert(d.error || 'Failed to save article.');
      }
    } catch (err) {
      alert('Network error while saving article.');
    } finally {
      setIsBlogSaving(false);
    }
  };

  const deleteBlogArticle = async (b) => {
    if (!confirm(`Delete article "${b.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(b.id)}`, {
        method: 'DELETE',
      });
      const d = await res.json();
      if (d.success) {
        if (selectedBlog?.id === b.id) setSelectedBlog(null);
        loadBlogs();
      } else {
        alert(d.error || 'Failed to delete article.');
      }
    } catch (err) {
      alert('Network error while deleting article.');
    }
  };

  const getActionMeta = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'whatsapp':
        return { icon: '💬', label: 'WhatsApp', color: '#16A34A', bg: '#DCFCE7' };
      case 'email':
        return { icon: '✉️', label: 'Email', color: '#2563EB', bg: '#DBEAFE' };
      case 'meeting':
        return { icon: '🤝', label: 'Meeting', color: '#7C3AED', bg: '#EDE9FE' };
      case 'sms':
        return { icon: '📱', label: 'SMS', color: '#D97706', bg: '#FEF3C7' };
      case 'call':
      default:
        return { icon: '📞', label: 'Call', color: '#059669', bg: '#D1FAE5' };
    }
  };

  const openLead = async (lead) => {
    markAsRead(`${lead.lead_category || 'client'}-${lead.id}`);
    setSelected({ ...lead });
    setNewNote('');
    setNewNoteDate(lead.next_followup_date || '');
    setNewNoteAction(lead.next_action_type || 'Call');
    const res = await fetch(`/api/admin/leads/notes?leadId=${lead.id}`);
    const d = await res.json();
    if (d.success) setNotes(d.notes);
  };

  const saveLead = async () => {
    const payload = {
      ...selected,
      next_followup_date: newNoteDate || selected.next_followup_date || null,
      next_action_type: newNoteDate ? (newNoteAction || 'Call') : (selected.next_action_type || null),
    };
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSelected(null);
    loadLeads();
    loadProjectLeads();
  };

  const clearReminder = async () => {
    if (!selected) return;
    const updated = { ...selected, next_followup_date: null, next_action_type: null };
    setSelected(updated);
    setNewNoteDate('');
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, next_followup_date: null, next_action_type: null }),
    });
    setLeads((prev) => prev.map((l) => (l.id === selected.id ? updated : l)));
    setProjectLeads((prev) => prev.map((l) => (l.id === selected.id ? updated : l)));
  };

  const deleteLead = async () => {
    if (!confirm(`Delete the lead for "${selected.full_name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/leads?id=${selected.id}`, { method: 'DELETE' });
    setSelected(null);
    loadLeads();
    loadProjectLeads();
  };

  const addNote = async () => {
    if (!newNote.trim() && !newNoteDate) return;
    if (newNote.trim()) {
      await fetch('/api/admin/leads/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: selected.id, note: newNote.trim() }),
      });
    }

    const updatedLead = {
      ...selected,
      next_followup_date: newNoteDate ? newNoteDate : (selected.next_followup_date || null),
      next_action_type: newNoteDate ? (newNoteAction || 'Call') : (selected.next_action_type || null),
    };

    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedLead),
    });

    setSelected(updatedLead);
    setNewNote('');
    const res = await fetch(`/api/admin/leads/notes?leadId=${selected.id}`);
    const d = await res.json();
    if (d.success) setNotes(d.notes);
    loadLeads();
    loadProjectLeads();
  };


  const copyToClipboard = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key || 'copied');
      setTimeout(() => setCopiedKey(''), 2500);
    } catch {
      prompt('Copy this link:', text);
    }
  };

  const generateStrongPassword = () => {
    const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lower = 'abcdefghijkmnpqrstuvwxyz';
    const digits = '23456789';
    const symbols = '!@#$%&*';
    const all = upper + lower + digits + symbols;
    let pwd = '';
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += digits[Math.floor(Math.random() * digits.length)];
    pwd += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = 4; i < 12; i++) {
      pwd += all[Math.floor(Math.random() * all.length)];
    }
    pwd = pwd.split('').sort(() => 0.5 - Math.random()).join('');
    setNewUser((prev) => ({ ...prev, password: pwd }));
    setConfirmPassword(pwd);
    setShowPassword(true);
    setShowConfirmPassword(true);
    setTeamError('');
  };

  const addTeamMember = async (e) => {
    e.preventDefault();
    setTeamError('');

    // Password validation (if initial password or confirm password entered)
    if (newUser.password || confirmPassword) {
      if (newUser.password !== confirmPassword) {
        setTeamError('Passwords do not match. Please re-enter matching passwords.');
        return;
      }
      if (newUser.password.length < 8) {
        setTeamError('Password must be at least 8 characters long.');
        return;
      }
      if (!/[A-Z]/.test(newUser.password)) {
        setTeamError('Password must contain at least one uppercase letter (A-Z).');
        return;
      }
      if (!/[a-z]/.test(newUser.password)) {
        setTeamError('Password must contain at least one lowercase letter (a-z).');
        return;
      }
      if (!/[0-9]/.test(newUser.password)) {
        setTeamError('Password must contain at least one number (0-9).');
        return;
      }
      if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newUser.password)) {
        setTeamError('Password must contain at least one special symbol (@, #, $, etc.).');
        return;
      }
    }

    if (!newUser.permissions || newUser.permissions.length === 0) {
      setTeamError('Please select at least one permission section.');
      return;
    }

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const d = await res.json();
      if (d.success) {
        setShowAddMemberModal(false);
        if (d.verifyLink) {
          setCreatedInvite({
            name: newUser.name,
            email: newUser.email,
            link: d.verifyLink,
            emailSent: d.emailSent,
            message: d.message,
          });
        }
        setNewUser({ name: '', email: '', password: '', permissions: [] });
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        loadUsers();
      } else {
        setTeamError(d.error || 'Could not add team member.');
      }
    } catch (err) {
      setTeamError('Network error adding team member: ' + err.message);
    }
  };

  const resendInvite = async (userId, memberName) => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, action: 'resend_invite' }),
      });
      const d = await res.json();
      if (d.success) {
        setShowAddMemberModal(false);
        if (d.verifyLink) {
          copyToClipboard(d.verifyLink, `resend-${userId}`);
        }
        alert(d.message || 'Invitation resent! Link copied to clipboard.');
        loadUsers();
      } else {
        alert(d.error || 'Failed to resend invitation.');
      }
    } catch (err) {
      alert('Error resending invite: ' + err.message);
    }
  };

  const toggleNewUserPerm = (key) => {
    setNewUser((prev) => {
      const current = prev.permissions || [];
      if (key === 'all') {
        const isAllSelected = current.includes('all') || current.length === AVAILABLE_PERMISSIONS.length;
        return {
          ...prev,
          permissions: isAllSelected ? [] : ['all', ...AVAILABLE_PERMISSIONS.map((p) => p.key)],
        };
      }
      let updated;
      if (current.includes(key)) {
        updated = current.filter((k) => k !== key && k !== 'all');
      } else {
        updated = [...current.filter((k) => k !== 'all'), key];
        if (updated.length === AVAILABLE_PERMISSIONS.length) {
          updated.push('all');
        }
      }
      return { ...prev, permissions: updated };
    });
  };

  const toggleEditingPerm = (key) => {
    setEditingMember((prev) => {
      if (!prev) return null;
      const current = prev.permissions || [];
      if (key === 'all') {
        const isAllSelected = current.includes('all') || current.length === AVAILABLE_PERMISSIONS.length;
        return {
          ...prev,
          permissions: isAllSelected ? [] : ['all', ...AVAILABLE_PERMISSIONS.map((p) => p.key)],
        };
      }
      let updated;
      if (current.includes(key)) {
        updated = current.filter((k) => k !== key && k !== 'all');
      } else {
        updated = [...current.filter((k) => k !== 'all'), key];
        if (updated.length === AVAILABLE_PERMISSIONS.length) {
          updated.push('all');
        }
      }
      return { ...prev, permissions: updated };
    });
  };

  const savePermissions = async () => {
    if (!editingMember) return;
    setUpdatingPerms(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingMember.id,
          permissions: editingMember.permissions || [],
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to update permissions.');
        return;
      }
      setEditingMember(null);
      loadUsers();
    } catch (err) {
      alert('Error updating permissions: ' + err.message);
    } finally {
      setUpdatingPerms(false);
    }
  };

  const removeTeamMember = async (id, memberName, isPending = false) => {
    const actionLabel = isPending ? 'cancel the invitation for' : 'remove';
    if (!confirm(`Are you sure you want to ${actionLabel} "${memberName || 'this user'}"?`)) return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || `Could not ${actionLabel} team member.`);
        return;
      }
      loadUsers();
    } catch (err) {
      alert(`Network error: ${err.message}`);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (!me) return null;

  // Filtered Client Leads (real-time instant search & status filter)
  const visibleClientLeads = leads.filter((l) => {
    if (statusFilter && l.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hay = [
        l.full_name,
        l.company_name,
        l.phone,
        l.city,
        l.inventory_type,
        l.status,
        l.next_followup_date,
        l.next_action_type,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const total = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const contactedLeads = leads.filter((l) => l.status === 'Contacted').length;
  const dealsClosed = leads.filter((l) =>
    ['Deal Closed', 'Closed'].includes(l.status)
  ).length;
  const notInterested = leads.filter((l) => l.status === 'Not Interested').length;

  // Dynamic Multi-Project List (always includes Karachi Enclave + any new projects added in the future)
  const projectList = Array.from(
    new Set([
      'Karachi Enclave',
      ...projectLeads.map((l) => l.project_name).filter(Boolean),
    ])
  );

  // Leads scoped to the currently selected project tab (or All Projects if '')
  const scopedProjectLeads = projectLeads.filter((l) => {
    const pName = l.project_name || 'Karachi Enclave';
    if (selectedProject && pName !== selectedProject) return false;
    return true;
  });

  // Filtered project leads for the table (applying search, unit filter, status filter)
  const visibleProjectLeads = scopedProjectLeads.filter((l) => {
    if (projStatusFilter && l.status !== projStatusFilter) return false;
    if (projUnitFilter && !(l.unit_interest || '').toLowerCase().includes(projUnitFilter.toLowerCase())) return false;
    if (projSearch) {
      const q = projSearch.toLowerCase();
      const hay = [l.full_name, l.phone, l.city, l.project_name, l.unit_interest]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const projTotal = scopedProjectLeads.length;
  const projNewLeads = scopedProjectLeads.filter((l) => l.status === 'New').length;
  const projContactedLeads = scopedProjectLeads.filter((l) => l.status === 'Contacted').length;
  const projDealsClosed = scopedProjectLeads.filter((l) =>
    ['Deal Closed', 'Closed', 'Booked'].includes(l.status)
  ).length;
  const projNotInterested = scopedProjectLeads.filter((l) =>
    ['Not Interested', 'Lost'].includes(l.status)
  ).length;

  const allNavTabs = [
    { key: 'leads', label: 'Client Leads', icon: Icons.leads },
    { key: 'project_leads', label: 'Project Leads', icon: Icons.projectLeads },
    { key: 'applications', label: 'Job Applications', icon: Icons.applications },
    { key: 'blogs', label: 'News & Blogs', icon: Icons.blogs },
    { key: 'newsletter', label: 'Newsletter', icon: Icons.newsletter },
    ...(me?.role === 'admin' ? [{ key: 'team', label: 'Team Members', icon: Icons.team }] : []),
  ];

  const navTabs = allNavTabs.filter((t) => (t.key === 'team' ? me?.role === 'admin' : hasAccess(t.key)));

  const newClientLeads = leads
    .filter((l) => l.status === 'New')
    .map((l) => ({
      ...l,
      notifKey: `client-${l.id}`,
      lead_category: 'client',
      category_label: 'Client Lead',
      title: l.full_name,
      subtitle: l.company_name || l.inventory_type || l.phone,
      icon: Icons.leads,
    }));

  const newProjectLeads = projectLeads
    .filter((l) => l.status === 'New')
    .map((l) => ({
      ...l,
      notifKey: `project-${l.id}`,
      lead_category: 'project',
      category_label: l.project_name || 'Karachi Enclave',
      title: l.full_name,
      subtitle: `${l.unit_interest || 'Unit inquiry'} · ${l.phone}`,
      icon: Icons.projectLeads,
    }));

  const newAppLeads = applications.map((app) => ({
    ...app,
    notifKey: `app-${app.id}`,
    lead_category: 'application',
    category_label: 'Job Application',
    title: app.full_name,
    subtitle: `${app.position || 'Applicant'} · ${app.phone || app.email}`,
    icon: Icons.applications,
  }));

  const newSubscribers = subscribers.map((sub) => ({
    ...sub,
    notifKey: `sub-${sub.id}`,
    lead_category: 'newsletter',
    category_label: 'Newsletter',
    title: sub.email,
    subtitle: 'New Newsletter Subscriber',
    icon: Icons.newsletter,
  }));

  const newNotifications = [...newClientLeads, ...newProjectLeads, ...newAppLeads, ...newSubscribers]
    .filter((item) => {
      if (item.lead_category === 'client') return hasAccess('leads');
      if (item.lead_category === 'project') return hasAccess('project_leads');
      if (item.lead_category === 'application') return hasAccess('applications');
      if (item.lead_category === 'newsletter') return hasAccess('newsletter');
      return true;
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const unreadCount = newNotifications.filter(
    (l) => !readNotifications.includes(l.notifKey)
  ).length;

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return '';
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return new Date(dateStr).toLocaleDateString();
  };

  const currentTabObj = navTabs.find((t) => t.key === tab) || navTabs[0];

  return (
    <div style={ui.layout}>
      {/* Mobile Drawer Backdrop */}
      {isMobile && mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 85,
          }}
        />
      )}

      {/* WordPress-Style Left Sidebar / Mobile Drawer */}
      <aside
        style={
          isMobile
            ? {
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: mobileMenuOpen ? 0 : '-280px',
                width: '260px',
                background: '#0F172A',
                color: '#E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                transition: 'left 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 90,
                boxShadow: mobileMenuOpen ? '0 0 35px rgba(0, 0, 0, 0.6)' : 'none',
                borderRight: '1px solid #1E293B',
                userSelect: 'none',
              }
            : ui.sidebar(sidebarCollapsed)
        }
      >
        {/* Brand Header */}
        <div style={ui.sidebarHeader(isMobile ? false : sidebarCollapsed)}>
          {isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="/logo-white.png"
                  alt="Propkads"
                  style={{ height: '34px', width: 'auto', display: 'block', objectFit: 'contain' }}
                />
                <span style={{ fontSize: '11px', color: '#3ED17A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Admin
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  background: '#1E293B',
                  color: '#94A3B8',
                  border: 'none',
                  borderRadius: '6px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
          ) : !sidebarCollapsed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img
                src="/logo-white.png"
                alt="Propkads"
                style={{ height: '38px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
              <span style={{ fontSize: '11px', color: '#3ED17A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Admin
              </span>
            </div>
          ) : (
            <img
              src="/logo-k.png"
              alt="Propkads"
              style={{ height: '32px', width: 'auto', display: 'block', objectFit: 'contain' }}
            />
          )}
        </div>

        {/* Collapse Toggle Arrow (Desktop Only) */}
        {!isMobile && (
          <div style={{ padding: sidebarCollapsed ? '10px 8px 2px' : '10px 14px 2px', display: 'flex', justifyContent: sidebarCollapsed ? 'center' : 'flex-end' }}>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: '#1E293B',
                color: '#94A3B8',
                border: 'none',
                borderRadius: '6px',
                width: '34px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s',
              }}
              title={sidebarCollapsed ? 'Expand menu' : 'Collapse menu'}
            >
              {sidebarCollapsed ? Icons.expand : Icons.collapse}
            </button>
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav style={ui.sidebarNav} aria-label="Admin Navigation">
          {navTabs.map((item) => {
            const isActive = tab === item.key;
            const isItemCollapsed = !isMobile && sidebarCollapsed;
            return (
              <button
                key={item.key}
                type="button"
                style={ui.sidebarItem(isActive, isItemCollapsed)}
                onClick={() => {
                  setTab(item.key);
                  if (isMobile) setMobileMenuOpen(false);
                }}
                title={isItemCollapsed ? item.label : undefined}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#FFFFFF' : '#94A3B8' }}>
                  {item.icon}
                </span>
                {!isItemCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Profile */}
        <div style={ui.sidebarFooter}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: (!isMobile && sidebarCollapsed) ? 'center' : 'flex-start', gap: '10px', padding: '6px 4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#14A750', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>
              {(me?.name || 'A')[0].toUpperCase()}
            </div>
            {(isMobile || !sidebarCollapsed) && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {me?.name === 'Khurram' ? 'Khurram Mushtaq' : (me?.name || 'Admin')}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'capitalize' }}>
                  {me?.role || 'Admin'} Role
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
        {/* Top Navbar */}
        <header style={ui.topBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '10px' : '14px', minWidth: 0 }}>
            {isMobile && (
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  background: '#F1F5F9',
                  color: '#0F172A',
                  border: '1px solid #E2E8F0',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                aria-label="Open menu"
                title="Open navigation menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            )}
            <div style={{ fontSize: isMobile ? '13px' : '14px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {!isMobile && 'Dashboard / '}
              <strong style={{ color: '#0F172A', fontWeight: '700' }}>{currentTabObj.label}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '8px' : '14px' }}>
            {/* Real-time Notification Bell & Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setShowNotifications((prev) => !prev)}
                style={{
                  background: showNotifications ? '#E2E8F0' : '#F1F5F9',
                  color: '#0F172A',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.15s',
                }}
                title="New Leads Notifications"
              >
                {Icons.bell}
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      background: '#EF4444',
                      color: '#FFFFFF',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      borderRadius: '999px',
                      minWidth: '18px',
                      height: '18px',
                      padding: '0 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 0 2px #FFFFFF',
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Floating Notifications Dropdown Panel */}
              {showNotifications && (
                <>
                  <div
                    style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                    onClick={() => setShowNotifications(false)}
                  />
                  <div
                    style={{
                      position: isMobile ? 'fixed' : 'absolute',
                      top: isMobile ? '64px' : '44px',
                      right: isMobile ? '10px' : 0,
                      left: isMobile ? '10px' : 'auto',
                      width: isMobile ? 'auto' : '360px',
                      maxWidth: isMobile ? 'none' : '90vw',
                      background: '#FFFFFF',
                      borderRadius: '10px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #E2E8F0',
                      zIndex: 100,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#F8FAFC',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#0F172A' }}>Notifications</span>
                        {unreadCount > 0 ? (
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              padding: '2px 8px',
                              background: '#0F172A',
                              color: '#FFFFFF',
                              borderRadius: '999px',
                            }}
                          >
                            {unreadCount} New
                          </span>
                        ) : null}
                      </div>
                      {unreadCount > 0 ? (
                        <button
                          type="button"
                          onClick={markAllAsRead}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#475569',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: 0,
                            textDecoration: 'none',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
                        >
                          Mark all as read
                        </button>
                      ) : (
                        <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>All read</span>
                      )}
                    </div>

                    <div style={{ maxHeight: isMobile ? 'calc(100vh - 150px)' : '380px', overflowY: 'auto' }}>
                      {newNotifications.length > 0 ? (
                        newNotifications.map((item) => {
                          const isRead = readNotifications.includes(item.notifKey);
                          return (
                            <div
                              key={item.notifKey}
                              onClick={() => {
                                markAsRead(item.notifKey);
                                setShowNotifications(false);
                                if (item.lead_category === 'client') {
                                  setTab('leads');
                                  openLead(item);
                                } else if (item.lead_category === 'project') {
                                  setTab('project_leads');
                                  if (item.project_name) setSelectedProject(item.project_name);
                                  openLead(item);
                                } else if (item.lead_category === 'application') {
                                  setTab('applications');
                                  setSelectedApp(item);
                                } else if (item.lead_category === 'newsletter') {
                                  setTab('newsletter');
                                }
                              }}
                              style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid #F1F5F9',
                                cursor: 'pointer',
                                transition: 'background 0.15s',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px',
                                background: isRead ? '#FFFFFF' : '#F8FAFC',
                                borderLeft: isRead ? '3px solid transparent' : '3px solid #14A750',
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = '#F1F5F9')}
                              onMouseLeave={(e) => (e.currentTarget.style.background = isRead ? '#FFFFFF' : '#F8FAFC')}
                            >
                              <div
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '6px',
                                  background: '#FFFFFF',
                                  color: '#475569',
                                  border: '1px solid #E2E8F0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  marginTop: '2px',
                                }}
                              >
                                {item.icon}
                              </div>

                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '3px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                                    <span style={{ fontSize: '13px', fontWeight: isRead ? 500 : 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {item.title}
                                    </span>
                                    {!isRead && (
                                      <span
                                        style={{
                                          width: '6px',
                                          height: '6px',
                                          borderRadius: '50%',
                                          background: '#14A750',
                                          flexShrink: 0,
                                        }}
                                        title="Unread"
                                      />
                                    )}
                                  </div>
                                  <span style={{ fontSize: '11px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                                    {formatTimeAgo(item.created_at)}
                                  </span>
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span
                                    style={{
                                      fontSize: '10.5px',
                                      fontWeight: 500,
                                      padding: '1px 6px',
                                      borderRadius: '4px',
                                      background: '#F1F5F9',
                                      color: '#475569',
                                      border: '1px solid #E2E8F0',
                                      flexShrink: 0,
                                    }}
                                  >
                                    {item.category_label}
                                  </span>
                                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#64748B' }}>
                                    {item.subtitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94A3B8' }}>
                          <div style={{ fontSize: '28px', marginBottom: '6px' }}>🎉</div>
                          <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>All caught up!</div>
                          <div style={{ fontSize: '12px' }}>No new untouched leads waiting for response.</div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '12.5px',
                color: '#475569',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: isMobile ? '7px 9px' : '6px 12px',
                background: '#F1F5F9',
                borderRadius: '6px',
                fontWeight: '600',
              }}
              title="View Public Site"
            >
              {!isMobile && <span>View Site</span>}
              {Icons.external}
            </a>

            <button
              type="button"
              onClick={logout}
              style={{
                background: 'transparent',
                color: '#B3261E',
                border: '1px solid #FCA5A5',
                padding: isMobile ? '7px 9px' : '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title="Logout"
            >
              {Icons.logout}
              {!isMobile && <span>Logout</span>}
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main style={ui.body}>
        {tab === 'leads' && (
          <>
            {/* Dynamic Status Counter Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                {statusFilter ? `${statusFilter} Leads:` : 'Total Leads:'}
              </span>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#14A750' }}>
                {statusFilter || search.trim()
                  ? `${visibleClientLeads.length} / ${leads.length}`
                  : leads.length}
              </span>
              {search.trim() && (
                <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                  (matching "{search}")
                </span>
              )}
            </div>

            <div style={ui.toolbar}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minWidth: '220px' }}>
                <input
                  style={{ ...ui.input, width: '100%', paddingRight: search ? '30px' : '12px' }}
                  placeholder="Search name, phone, city, company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    title="Clear search"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 700,
                      padding: '2px',
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                <select
                  style={{
                    ...ui.select,
                    paddingRight: statusFilter ? '32px' : '12px',
                    fontWeight: statusFilter ? 600 : 400,
                    color: statusFilter ? '#0F172A' : '#64748B',
                  }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {CLIENT_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {statusFilter && (
                  <button
                    type="button"
                    onClick={() => setStatusFilter('')}
                    title="Clear status filter"
                    style={{
                      position: 'absolute',
                      right: '10px',
                      background: 'none',
                      border: 'none',
                      color: '#94A3B8',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 700,
                      padding: '2px',
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>

              <a
                style={{ ...ui.btnGhost, marginLeft: 'auto', textDecoration: 'none' }}
                href="/api/admin/leads/export?category=client"
              >
                Export CSV
              </a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={ui.table}>
                <thead>
                  <tr>
                    <th style={ui.th}>Name</th>
                    <th style={ui.th}>Company / Project</th>
                    <th style={ui.th}>Phone</th>
                    <th style={ui.th}>City</th>
                    <th style={ui.th}>Property Type</th>
                    <th style={ui.th}>Status</th>
                    <th style={ui.th}>Next Reminder</th>
                    <th style={ui.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleClientLeads.map((l) => (
                    <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => openLead(l)}>
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A' }}>{l.full_name}</td>
                      <td style={ui.td}>{l.company_name || '—'}</td>
                      <td style={ui.td}>{l.phone}</td>
                      <td style={ui.td}>{l.city || '—'}</td>
                      <td style={ui.td}>{l.inventory_type || '—'}</td>
                      <td style={ui.td}>
                        <span style={ui.statusPill(l.status)}>{l.status}</span>
                      </td>
                      <td style={ui.td}>
                        {l.next_followup_date ? (
                          (() => {
                            const act = getActionMeta(l.next_action_type);
                            return (
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  padding: '3px 8px',
                                  borderRadius: '6px',
                                  fontSize: '11.5px',
                                  fontWeight: 600,
                                  background: '#FEF3C7',
                                  color: '#92400E',
                                  border: '1px solid #FDE68A',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                <span>📅 {l.next_followup_date}</span>
                                <span
                                  style={{
                                    padding: '1px 5px',
                                    borderRadius: '4px',
                                    background: act.bg,
                                    color: act.color,
                                    fontSize: '10.5px',
                                    fontWeight: 700,
                                  }}
                                >
                                  {act.icon} {act.label}
                                </span>
                              </span>
                            );
                          })()
                        ) : (
                          <span style={{ color: '#94a3b8', fontSize: '12px' }}>—</span>
                        )}
                      </td>
                      <td style={ui.td}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {visibleClientLeads.length === 0 && (
                    <tr>
                      <td colSpan={8} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8' }}>
                        No client leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'project_leads' && (
          <>
            {/* Multi-Project Switcher Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '18px',
                borderBottom: '1px solid #E2E8F0',
              }}
            >
              {projectList.map((projName) => {
                const isSelected = selectedProject === projName;
                const count = projectLeads.filter((l) => (l.project_name || 'Karachi Enclave') === projName).length;
                return (
                  <button
                    key={projName}
                    type="button"
                    onClick={() => {
                      setSelectedProject(projName);
                      setProjUnitFilter('');
                    }}
                    style={{
                      padding: '0 4px 10px',
                      border: 'none',
                      borderBottom: isSelected ? '2px solid #14A750' : '2px solid transparent',
                      background: 'transparent',
                      color: isSelected ? '#14A750' : '#64748B',
                      fontWeight: 700,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      outline: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>{projName}</span>
                    <span
                      style={{
                        color: isSelected ? '#14A750' : '#64748B',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Project-Scoped Stat Cards */}
            <div style={ui.statRow}>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projTotal}</div>
                <div style={ui.statLbl}>Total Leads</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projNewLeads}</div>
                <div style={ui.statLbl}>New Leads</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projContactedLeads}</div>
                <div style={ui.statLbl}>Contacted Leads</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projDealsClosed}</div>
                <div style={ui.statLbl}>Deal Closed</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projNotInterested}</div>
                <div style={ui.statLbl}>Not Interested</div>
              </div>
            </div>

            {/* Project Leads Filter & Export Toolbar */}
            <div style={ui.toolbar}>
              <input
                style={ui.input}
                placeholder="Search buyer name, phone, city, unit..."
                value={projSearch}
                onChange={(e) => setProjSearch(e.target.value)}
              />

              <select
                style={ui.select}
                value={projUnitFilter}
                onChange={(e) => setProjUnitFilter(e.target.value)}
              >
                <option value="">All Unit Categories</option>
                <option value="Emerald">Emerald (1230 SQFT)</option>
                <option value="Ruby">Ruby (1230 SQFT)</option>
                <option value="Sapphire">Sapphire (935 SQFT)</option>
                <option value="Opal">Opal (840 SQFT)</option>
              </select>

              <select
                style={ui.select}
                value={projStatusFilter}
                onChange={(e) => setProjStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <a
                style={{ ...ui.btnGhost, marginLeft: 'auto', textDecoration: 'none' }}
                href={`/api/admin/leads/export?category=project&project=${encodeURIComponent(selectedProject)}&unit=${encodeURIComponent(projUnitFilter)}&status=${encodeURIComponent(projStatusFilter)}`}
              >
                Export {selectedProject || 'All Projects'} CSV
              </a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={ui.table}>
                <thead>
                  <tr>
                    <th style={ui.th}>Buyer Name</th>
                    <th style={ui.th}>Phone / WhatsApp</th>
                    <th style={ui.th}>City / Country</th>
                    <th style={ui.th}>Project</th>
                    <th style={ui.th}>Interested Unit / Category</th>
                    <th style={ui.th}>Status</th>
                    <th style={ui.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleProjectLeads.map((l) => (
                    <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => openLead(l)}>
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A' }}>{l.full_name}</td>
                      <td style={ui.td}>{l.phone}</td>
                      <td style={ui.td}>{l.city || '—'}</td>
                      <td style={{ ...ui.td, fontWeight: 600, color: '#14A750' }}>
                        {l.project_name || 'Karachi Enclave'}
                      </td>
                      <td style={{ ...ui.td, fontWeight: 500, color: '#334155' }}>
                        {l.unit_interest || '—'}
                      </td>
                      <td style={ui.td}><span style={ui.statusPill(l.status)}>{l.status}</span></td>
                      <td style={ui.td}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {visibleProjectLeads.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8' }}>
                        No buyer leads found for {selectedProject || 'any project'}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'applications' && (
          <>
            <div style={ui.statRow}>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{applications.length}</div>
                <div style={ui.statLbl}>Total Applications</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>
                  {applications.filter((a) => (a.position || '').toLowerCase().includes('design') || (a.position || '').toLowerCase().includes('animat') || (a.position || '').toLowerCase().includes('editor') || (a.position || '').toLowerCase().includes('video')).length}
                </div>
                <div style={ui.statLbl}>Creatives & Media</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>
                  {applications.filter((a) => (a.position || '').toLowerCase().includes('sales')).length}
                </div>
                <div style={ui.statLbl}>Sales Candidates</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{applications.filter((a) => a.has_resume).length}</div>
                <div style={ui.statLbl}>CVs Attached</div>
              </div>
            </div>

            <div style={ui.toolbar}>
              <input
                style={ui.input}
                placeholder="Search candidate name, email, phone, position..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadApplications()}
              />
              <button style={ui.btnGreen} onClick={loadApplications}>Search</button>
              {appSearch && (
                <button
                  style={ui.btnGhost}
                  onClick={() => {
                    setAppSearch('');
                    setTimeout(loadApplications, 0);
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', marginBottom: 20 }}>
              <table style={ui.table}>
                <thead>
                  <tr>
                    <th style={ui.th}>Date</th>
                    <th style={ui.th}>Candidate</th>
                    <th style={ui.th}>Position</th>
                    <th style={ui.th}>Contact</th>
                    <th style={ui.th}>Portfolio</th>
                    <th style={ui.th}>Resume / CV</th>
                    <th style={ui.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td style={ui.td}>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>
                          {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </td>
                      <td style={ui.td}>
                        <strong>{app.full_name}</strong>
                      </td>
                      <td style={ui.td}>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A', background: '#F1F5F9', padding: '3px 8px', borderRadius: '4px' }}>
                          {app.position || 'General'}
                        </span>
                      </td>
                      <td style={ui.td}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '12.5px' }}>
                          <a href={`mailto:${app.email}`} style={{ color: '#0284C7', textDecoration: 'none' }}>
                            {app.email}
                          </a>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span>{app.phone}</span>
                            <a
                              href={`https://wa.me/${(app.phone || '').replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#16A34A', fontWeight: '700', fontSize: '11px', textDecoration: 'none' }}
                            >
                              WhatsApp →
                            </a>
                          </div>
                        </div>
                      </td>
                      <td style={ui.td}>
                        {app.portfolio_link ? (
                          <a
                            href={app.portfolio_link.startsWith('http') ? app.portfolio_link : `https://${app.portfolio_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#14A750', fontWeight: '600', fontSize: '12px', textDecoration: 'none' }}
                          >
                            View Link ↗
                          </a>
                        ) : (
                          <span style={{ color: '#94A3B8', fontSize: '12px' }}>—</span>
                        )}
                      </td>
                      <td style={ui.td}>
                        {app.has_resume ? (
                          <a
                            href={`/api/admin/applications/download?id=${app.id}`}
                            download
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: 'rgba(20, 167, 80, 0.1)',
                              color: '#14A750',
                              border: '1px solid rgba(20, 167, 80, 0.3)',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: '11.5px',
                              fontWeight: '600',
                              textDecoration: 'none',
                            }}
                          >
                            ⬇ Download CV
                          </a>
                        ) : (
                          <span style={{ color: '#94A3B8', fontSize: '12px' }}>No CV file</span>
                        )}
                      </td>
                      <td style={ui.td}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            style={{ ...ui.btnGhost, padding: '4px 8px', fontSize: '12px' }}
                            onClick={() => setSelectedApp(app)}
                          >
                            View Details
                          </button>
                          <button
                            style={{ ...ui.btnDanger, padding: '4px 8px', fontSize: '12px' }}
                            onClick={() => deleteApplication(app)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ ...ui.td, textAlign: 'center', color: '#94A3B8', padding: '36px' }}>
                        No job applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'blogs' && (
          <>
            <div style={ui.statRow}>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{blogs.length}</div>
                <div style={ui.statLbl}>Total Real Estate Articles</div>
              </div>
              <div style={ui.statCard}>
                <div style={{ ...ui.statNum, color: '#14A750' }}>{blogs.filter((b) => b.isFeatured).length}</div>
                <div style={ui.statLbl}>Main Featured Story</div>
              </div>
              <div style={ui.statCard}>
                <div style={{ ...ui.statNum, color: '#0284C7' }}>{blogs.filter((b) => b.isTrending).length}</div>
                <div style={ui.statLbl}>Trending 4-Stack Stories</div>
              </div>
              <div style={ui.statCard}>
                <div style={{ ...ui.statNum, color: '#64748B' }}>{blogs.filter((b) => !b.isFeatured && !b.isTrending).length}</div>
                <div style={ui.statLbl}>Regular Grid Articles</div>
              </div>
            </div>

            <div style={ui.toolbar}>
              <input
                style={ui.input}
                placeholder="Search article title or summary..."
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
              />
              <select
                style={ui.select}
                value={blogPlacementFilter}
                onChange={(e) => setBlogPlacementFilter(e.target.value)}
              >
                <option value="">All Placements</option>
                <option value="featured">★ Main Featured (Top-Left Hero)</option>
                <option value="trending">🔥 Trending (Top-Right Stack)</option>
                <option value="grid">📰 Regular Grid (Bottom 3-Col)</option>
              </select>
              <button style={ui.btnGreen} onClick={openNewBlogModal}>
                + Add New Article
              </button>
              <a
                href="/blog"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...ui.btnGhost, marginLeft: 'auto', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                View Live News Page ↗
              </a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={ui.table}>
                <thead>
                  <tr>
                    <th style={{ ...ui.th, width: '70px' }}>Cover</th>
                    <th style={ui.th}>Article Title & Summary</th>
                    <th style={{ ...ui.th, width: '150px' }}>Placement</th>
                    <th style={{ ...ui.th, width: '130px' }}>Date / Read</th>
                    <th style={{ ...ui.th, width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs
                    .filter((b) => {
                      const matchesSearch =
                        !blogSearch ||
                        (b.title && b.title.toLowerCase().includes(blogSearch.toLowerCase())) ||
                        (b.excerpt && b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()));
                      if (!matchesSearch) return false;
                      if (blogPlacementFilter === 'featured') return b.isFeatured;
                      if (blogPlacementFilter === 'trending') return b.isTrending;
                      if (blogPlacementFilter === 'grid') return !b.isFeatured && !b.isTrending;
                      return true;
                    })
                    .map((b) => (
                      <tr key={b.id}>
                        <td style={ui.td}>
                          {b.image ? (
                            <img
                              src={b.image}
                              alt=""
                              style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E2E8F0', display: 'block' }}
                            />
                          ) : (
                            <div style={{ width: '56px', height: '42px', background: '#E2E8F0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94A3B8' }}>
                              No Img
                            </div>
                          )}
                        </td>
                        <td style={ui.td}>
                          <div style={{ fontWeight: '600', color: '#0F172A', fontSize: '13.5px', marginBottom: '4px', lineHeight: 1.35 }}>
                            {b.title}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B', lineHeight: 1.4, maxHeight: '34px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {b.excerpt || 'No summary excerpt provided.'}
                          </div>
                        </td>
                        <td style={ui.td}>
                          {b.isFeatured ? (
                            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', background: '#E9F7EE', color: '#14A750' }}>
                              ★ Main Featured
                            </span>
                          ) : b.isTrending ? (
                            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', background: '#E0F2FE', color: '#0284C7' }}>
                              🔥 Trending Stack
                            </span>
                          ) : (
                            <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '600', padding: '4px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#475569' }}>
                              📰 Regular Grid
                            </span>
                          )}
                        </td>
                        <td style={ui.td}>
                          <div style={{ fontSize: '12px', color: '#1E293B', fontWeight: '500' }}>{b.date || '—'}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{b.readTime || '—'}</div>
                        </td>
                        <td style={ui.td}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              style={{ ...ui.btnGhost, padding: '5px 10px', fontSize: '12px' }}
                              onClick={() => openEditBlogModal(b)}
                            >
                              Edit
                            </button>
                            <button
                              style={{ ...ui.btnDanger, padding: '5px 10px', fontSize: '12px' }}
                              onClick={() => deleteBlogArticle(b)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  {blogs.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ ...ui.td, textAlign: 'center', color: '#94A3B8', padding: '36px' }}>
                        No articles found. Click "+ Add New Article" to post your first real estate update.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}



        {tab === 'newsletter' && (
          <div>
            <div style={ui.toolbar}>
              <span style={{ fontSize: 13.5, color: '#70757D' }}>{subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}</span>
              <a style={{ ...ui.btnGhost, marginLeft: 'auto' }} href="/api/admin/newsletter/export">Export CSV</a>
            </div>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', marginBottom: 20 }}>
              <table style={{ ...ui.table, maxWidth: 700 }}>
                <thead>
                  <tr>
                    <th style={ui.th}>Email</th>
                    <th style={ui.th}>Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id}>
                      <td style={ui.td}>{s.email}</td>
                      <td style={ui.td}>{new Date(s.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {subscribers.length === 0 && (
                    <tr><td colSpan={2} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8' }}>No subscribers yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'team' && me.role === 'admin' && (
          <div>
            <div style={{ ...ui.toolbar, justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontSize: '13.5px', color: '#64748B', fontWeight: 500 }}>
                {users.length} registered team member{users.length !== 1 ? 's' : ''}
              </div>
              <button
                type="button"
                style={{
                  ...ui.btnGreen,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setTeamError('');
                  setNewUser({ name: '', email: '', password: '', permissions: [] });
                  setConfirmPassword('');
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                  setShowAddMemberModal(true);
                }}
              >
                <span style={{ fontSize: '16px', lineHeight: '1', fontWeight: 700 }}>+</span> Add New Member
              </button>
            </div>

            {isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 28 }}>
                {users.map((u) => {
                  const isCurrent = Boolean(
                    me?.email &&
                    u?.email &&
                    me.email.toLowerCase().trim() === u.email.toLowerCase().trim()
                  );
                  const isProtected = u.role === 'admin' && ['propkads@gmail.com', 'admin@propkads.com', 'khurram@propkads.com'].includes(u.email?.toLowerCase());
                  const perms = Array.isArray(u.permissions) ? u.permissions : [];
                  const hasAll = u.role === 'admin' || perms.includes('all') || perms.length === AVAILABLE_PERMISSIONS.length;

                  return (
                    <div
                      key={u.id}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '14px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>{u.name}</div>
                          <div style={{ fontSize: '12.5px', color: '#64748B' }}>{u.email}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 7px',
                              borderRadius: '4px',
                              background: u.role === 'admin' ? '#0F172A' : '#F1F5F9',
                              color: u.role === 'admin' ? '#FFFFFF' : '#475569',
                              textTransform: 'uppercase',
                            }}
                          >
                            {u.role === 'admin' ? 'Admin' : 'Team Member'}
                          </span>
                          {u.status === 'pending' ? (
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#FEF3C7', color: '#B45309' }}>
                              Pending
                            </span>
                          ) : (
                            <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#DCFCE7', color: '#166534' }}>
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Assigned Access Section directly visible under Role */}
                      <div style={{ margin: '10px 0', padding: '10px 12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                          Assigned Access:
                        </div>
                        {hasAll ? (
                          <span style={{ fontSize: '11.5px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#166534', display: 'inline-block' }}>
                            Full Access (All Sections)
                          </span>
                        ) : perms.length > 0 ? (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {perms.map((pKey) => {
                              const found = AVAILABLE_PERMISSIONS.find((p) => p.key === pKey);
                              return (
                                <span
                                  key={pKey}
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    padding: '2px 7px',
                                    borderRadius: '4px',
                                    background: '#FFFFFF',
                                    color: '#475569',
                                    border: '1px solid #E2E8F0',
                                  }}
                                >
                                  {found?.label || pKey}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94A3B8', fontStyle: 'italic' }}>
                            No access assigned
                          </span>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px', flexWrap: 'wrap' }}>
                        {isCurrent ? (
                          <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, fontStyle: 'italic' }}>
                            You (Active)
                          </span>
                        ) : isProtected ? (
                          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                            Primary Admin
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              style={{
                                background: '#F1F5F9',
                                color: '#0F172A',
                                border: '1px solid #CBD5E1',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '5px',
                                cursor: 'pointer',
                              }}
                              onClick={() =>
                                setEditingMember({
                                  ...u,
                                  permissions: Array.isArray(u.permissions)
                                    ? [...u.permissions]
                                    : (u.role === 'admin' ? ['all', ...AVAILABLE_PERMISSIONS.map((p) => p.key)] : []),
                                })
                              }
                            >
                              Edit Access
                            </button>
                            {u.status === 'pending' && u.verifyLink && (
                              <button
                                type="button"
                                style={{
                                  background: '#E0F2FE',
                                  color: '#0369A1',
                                  border: '1px solid #BAE6FD',
                                  padding: '6px 10px',
                                  fontSize: '11.5px',
                                  fontWeight: 600,
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                }}
                                onClick={() => copyToClipboard(u.verifyLink, u.id)}
                              >
                                {copiedKey === u.id ? 'Copied ✓' : 'Copy Invite Link'}
                              </button>
                            )}
                            {u.status === 'pending' && (
                              <button
                                type="button"
                                style={{
                                  background: '#E0F2FE',
                                  color: '#0369A1',
                                  border: '1px solid #BAE6FD',
                                  padding: '6px 12px',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  borderRadius: '5px',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                }}
                                onClick={() => resendInvite(u.id, u.name)}
                              >
                                <span>✉️</span> Resend Invite
                              </button>
                            )}
                            <button
                              type="button"
                              style={{
                                background: '#FEE2E2',
                                color: '#DC2626',
                                border: '1px solid #FCA5A5',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginLeft: 'auto',
                              }}
                              onClick={() => removeTeamMember(u.id, u.name, u.status === 'pending')}
                            >
                              {u.status === 'pending' ? 'Cancel Invitation' : 'Remove'}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%', marginBottom: 32 }}>
                <table style={{ ...ui.table, maxWidth: 960 }}>
                  <thead>
                    <tr>
                      <th style={ui.th}>Name</th>
                      <th style={ui.th}>Email</th>
                      <th style={ui.th}>Role</th>
                      <th style={ui.th}>Assigned Access</th>
                      <th style={ui.th}>Status</th>
                      <th style={{ ...ui.th, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const isCurrent = Boolean(
                        me?.email &&
                        u?.email &&
                        me.email.toLowerCase().trim() === u.email.toLowerCase().trim()
                      );
                      const isProtected = u.role === 'admin' && ['propkads@gmail.com', 'admin@propkads.com', 'khurram@propkads.com'].includes(u.email?.toLowerCase());
                      const perms = Array.isArray(u.permissions) ? u.permissions : [];
                      const hasAll = u.role === 'admin' || perms.includes('all') || perms.length === AVAILABLE_PERMISSIONS.length;

                      return (
                        <tr key={u.id}>
                          <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A' }}>{u.name}</td>
                          <td style={ui.td}>{u.email}</td>
                          <td style={ui.td}>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '4px',
                                background: u.role === 'admin' ? '#0F172A' : '#F1F5F9',
                                color: u.role === 'admin' ? '#FFFFFF' : '#475569',
                                textTransform: 'uppercase',
                              }}
                            >
                              {u.role === 'admin' ? 'Admin' : 'Team Member'}
                            </span>
                          </td>
                          <td style={{ ...ui.td, maxWidth: 260 }}>
                            {hasAll ? (
                              <span style={{ fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#166534', display: 'inline-block' }}>
                                Full Access (All Sections)
                              </span>
                            ) : perms.length > 0 ? (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {perms.map((pKey) => {
                                  const found = AVAILABLE_PERMISSIONS.find((p) => p.key === pKey);
                                  return (
                                    <span
                                      key={pKey}
                                      style={{
                                        fontSize: '11px',
                                        fontWeight: 500,
                                        padding: '2px 7px',
                                        borderRadius: '4px',
                                        background: '#F1F5F9',
                                        color: '#475569',
                                        border: '1px solid #E2E8F0',
                                      }}
                                    >
                                      {found?.label || pKey}
                                    </span>
                                  );
                                })}
                              </div>
                            ) : (
                              <span style={{ fontSize: '12px', color: '#94A3B8', fontStyle: 'italic' }}>
                                No access assigned
                              </span>
                            )}
                          </td>
                          <td style={ui.td}>
                            {u.status === 'pending' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '10.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#FEF3C7', color: '#B45309' }}>
                                  Pending Verification
                                </span>
                                {u.verifyLink && (
                                  <button
                                    type="button"
                                    style={{ background: 'transparent', border: 'none', color: '#0284C7', fontSize: '11px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                                    onClick={() => copyToClipboard(u.verifyLink, u.id)}
                                  >
                                    {copiedKey === u.id ? 'Copied ✓' : 'Copy Invite Link'}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: '#DCFCE7', color: '#166534' }}>
                                Active
                              </span>
                            )}
                          </td>
                          <td style={{ ...ui.td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {isCurrent ? (
                              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, fontStyle: 'italic' }}>
                                You (Active)
                              </span>
                            ) : isProtected ? (
                              <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                                Primary Admin
                              </span>
                            ) : (
                              <div style={{ display: 'inline-flex', gap: '6px' }}>
                                <button
                                  type="button"
                                  style={{
                                    background: '#F1F5F9',
                                    color: '#0F172A',
                                    border: '1px solid #CBD5E1',
                                    padding: '5px 10px',
                                    fontSize: '11.5px',
                                    fontWeight: 600,
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() =>
                                    setEditingMember({
                                      ...u,
                                      permissions: Array.isArray(u.permissions)
                                        ? [...u.permissions]
                                        : (u.role === 'admin' ? ['all', ...AVAILABLE_PERMISSIONS.map((p) => p.key)] : []),
                                    })
                                  }
                                >
                                  Edit Access
                                </button>
                                {u.status === 'pending' && (
                                  <button
                                    type="button"
                                    style={{
                                      background: '#E0F2FE',
                                      color: '#0369A1',
                                      border: '1px solid #BAE6FD',
                                      padding: '5px 10px',
                                      fontSize: '11.5px',
                                      fontWeight: 600,
                                      borderRadius: '5px',
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}
                                    onClick={() => resendInvite(u.id, u.name)}
                                    title="Resend verification email"
                                  >
                                    <span>✉️</span> Resend Invite
                                  </button>
                                )}
                                <button
                                  type="button"
                                  style={{
                                    background: '#FEE2E2',
                                    color: '#DC2626',
                                    border: '1px solid #FCA5A5',
                                    padding: '5px 10px',
                                    fontSize: '11.5px',
                                    fontWeight: 600,
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s',
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = '#FCA5A5')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = '#FEE2E2')}
                                  onClick={() => removeTeamMember(u.id, u.name, u.status === 'pending')}
                                >
                                  {u.status === 'pending' ? 'Cancel Invitation' : 'Remove'}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        </main>
      </div>

      {selectedApp && (
        <div style={ui.overlay} onClick={() => setSelectedApp(null)}>
          <div style={ui.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0, fontSize: 18, marginBottom: 16 }}>Application Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label style={ui.label}>Candidate Name</label>
                <div style={{ fontSize: 15, fontWeight: '700', color: '#0F172A' }}>{selectedApp.full_name}</div>
              </div>
              <div>
                <label style={ui.label}>Position Applied</label>
                <div style={{ fontSize: 14, fontWeight: '600', color: '#14A750' }}>{selectedApp.position || 'General'}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label style={ui.label}>Email Address</label>
                <div style={{ fontSize: 13.5 }}>
                  <a href={`mailto:${selectedApp.email}`} style={{ color: '#0284C7' }}>{selectedApp.email}</a>
                </div>
              </div>
              <div>
                <label style={ui.label}>Phone / WhatsApp</label>
                <div style={{ fontSize: 13.5, fontWeight: '600' }}>{selectedApp.phone}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
              <a style={{ ...ui.btnGhost, textAlign: 'center', flex: 1 }} href={`tel:${(selectedApp.phone || '').replace(/\s/g, '')}`}>
                📞 Call Candidate
              </a>
              <a
                style={{ ...ui.btnGhost, textAlign: 'center', flex: 1, color: '#16A34A', borderColor: '#16A34A' }}
                href={`https://wa.me/${(selectedApp.phone || '').replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat on WhatsApp
              </a>
            </div>

            {selectedApp.portfolio_link && (
              <div style={{ marginBottom: 16 }}>
                <label style={ui.label}>Portfolio / Profile Link</label>
                <div>
                  <a
                    href={selectedApp.portfolio_link.startsWith('http') ? selectedApp.portfolio_link : `https://${selectedApp.portfolio_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#14A750', fontWeight: '600', fontSize: '13.5px' }}
                  >
                    {selectedApp.portfolio_link} ↗
                  </a>
                </div>
              </div>
            )}

            {selectedApp.has_resume && (
              <div style={{ marginBottom: 20, padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: '500' }}>📄 {selectedApp.resume_name || 'Resume Attached'}</span>
                <a
                  href={`/api/admin/applications/download?id=${selectedApp.id}`}
                  download
                  style={{ ...ui.btnGreen, padding: '6px 14px', fontSize: '12px', textDecoration: 'none' }}
                >
                  Download CV ⬇
                </a>
              </div>
            )}

            <label style={ui.label}>Candidate Message / Cover Note</label>
            <div style={{ fontSize: 13.5, lineHeight: 1.6, background: '#F8FAFC', padding: 14, borderRadius: 8, border: '1px solid #E2E8F0', maxHeight: 150, overflowY: 'auto', marginBottom: 24, whiteSpace: 'pre-wrap' }}>
              {selectedApp.message || 'No message provided by candidate.'}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button style={ui.btnDanger} onClick={() => deleteApplication(selectedApp)}>Delete Application</button>
              <button style={{ ...ui.btnGhost, marginLeft: 'auto' }} onClick={() => setSelectedApp(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {selectedBlog && (
        <div style={ui.overlay} onClick={() => setSelectedBlog(null)}>
          <div style={{ ...ui.modal, width: '680px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0F172A' }}>
                {selectedBlog.id ? 'Edit Real Estate Article' : 'Add New Real Estate Article'}
              </h3>
              <button
                onClick={() => setSelectedBlog(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            <label style={ui.label}>Display Placement</label>
            <select
              style={ui.selectInput}
              value={selectedBlog.placement}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, placement: e.target.value })}
            >
              <option value="featured">★ Main Featured Story (Top-Left Hero - 60% Width)</option>
              <option value="trending">🔥 Trending Story (Top-Right Hero - 4 Compact Stories)</option>
              <option value="grid">📰 Regular Grid Article (Bottom 3-Column Grid)</option>
            </select>
            <p style={{ fontSize: '11px', color: '#94A3B8', margin: '4px 0 12px 0' }}>
              Tip: Only 1 article can be Main Featured at a time. Setting an article as Featured automatically adjusts others.
            </p>

            <label style={ui.label}>Article Title *</label>
            <input
              style={ui.fieldInput}
              placeholder="e.g. Malir Expressway Inauguration: How the 39km Corridor is Reshaping Property Valuations"
              value={selectedBlog.title || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={ui.label}>Publication Date</label>
                <input
                  style={ui.fieldInput}
                  placeholder="e.g. Nov 2025"
                  value={selectedBlog.date || ''}
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, date: e.target.value })}
                />
              </div>
              <div>
                <label style={ui.label}>Read Time</label>
                <input
                  style={ui.fieldInput}
                  placeholder="e.g. 5 min read"
                  value={selectedBlog.readTime || ''}
                  onChange={(e) => setSelectedBlog({ ...selectedBlog, readTime: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: 14, padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <label style={{ ...ui.label, marginTop: 0 }}>Cover Image</label>
              {selectedBlog.image && (
                <div style={{ marginBottom: 12 }}>
                  <img
                    src={selectedBlog.image}
                    alt="Preview"
                    style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1', display: 'block' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedBlog({ ...selectedBlog, image: '' })}
                      style={{ background: 'transparent', border: 'none', color: '#B3261E', fontSize: '11.5px', cursor: 'pointer', fontWeight: '600' }}
                    >
                      Remove Current Image
                    </button>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Option A: Upload from your Computer
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBlogImageUpload}
                    style={{ fontSize: '12.5px', color: '#475569' }}
                  />
                </div>
                <div style={{ marginTop: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '4px' }}>
                    Option B: Or Paste Image Web Link / URL
                  </span>
                  <input
                    style={{ ...ui.fieldInput, background: '#fff' }}
                    placeholder="https://images.unsplash.com/photo-..."
                    value={selectedBlog.image || ''}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, image: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <label style={ui.label}>Short Summary / Excerpt (Shown on Preview Cards)</label>
            <textarea
              style={{ ...ui.fieldInput, minHeight: '65px', lineHeight: 1.45, fontFamily: 'inherit' }}
              placeholder="A brief 1-2 sentence overview of the article..."
              value={selectedBlog.excerpt || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, excerpt: e.target.value })}
            />

            <label style={ui.label}>Key Takeaways (Bullet points for reader modal)</label>
            <textarea
              style={{ ...ui.fieldInput, minHeight: '80px', lineHeight: 1.45, fontFamily: 'inherit' }}
              placeholder="Enter one takeaway per line:&#10;Travel times between DHA and M-9 reduced by 60%&#10;Commercial land along expressway interchanges seeing double-digit growth"
              value={selectedBlog.takeawaysText || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, takeawaysText: e.target.value })}
            />

            <label style={ui.label}>Full Article Content (Markdown or Paragraphs)</label>
            <textarea
              style={{ ...ui.fieldInput, minHeight: '190px', lineHeight: 1.5, fontFamily: 'inherit' }}
              placeholder="Write the full comprehensive news story or insights here..."
              value={selectedBlog.fullContent || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, fullContent: e.target.value })}
            />

            <div style={{ display: 'flex', gap: 10, marginTop: 24, alignItems: 'center' }}>
              <button
                style={{ ...ui.btnGreen, opacity: isBlogSaving ? 0.7 : 1 }}
                disabled={isBlogSaving}
                onClick={saveBlogArticle}
              >
                {isBlogSaving ? 'Saving Article...' : 'Save Article'}
              </button>
              <button style={ui.btnGhost} onClick={() => setSelectedBlog(null)}>
                Cancel
              </button>
              {selectedBlog.id && (
                <button
                  style={{ ...ui.btnDanger, marginLeft: 'auto' }}
                  onClick={() => deleteBlogArticle(selectedBlog)}
                >
                  Delete Article
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {selected && (
        <div style={ui.overlay} onClick={() => setSelected(null)}>
          <div style={ui.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0, fontSize: 18 }}>
              {selected.lead_category === 'project' ? 'Project Buyer Lead Details' : 'Client Lead Details'}
            </h3>

            <label style={ui.label}>{selected.lead_category === 'project' ? 'Buyer Full Name' : 'Full Name'}</label>
            <input style={ui.fieldInput} value={selected.full_name || ''}
              onChange={(e) => setSelected({ ...selected, full_name: e.target.value })} />

            {selected.lead_category === 'project' ? (
              <>
                <label style={ui.label}>Project Name</label>
                <input
                  style={ui.fieldInput}
                  value={selected.project_name || 'Karachi Enclave'}
                  onChange={(e) => setSelected({ ...selected, project_name: e.target.value })}
                />

                <label style={ui.label}>Interested Unit / Category</label>
                <input
                  style={ui.fieldInput}
                  value={selected.unit_interest || ''}
                  onChange={(e) => setSelected({ ...selected, unit_interest: e.target.value })}
                />
              </>
            ) : (
              <>
                <label style={ui.label}>Company / Project</label>
                <input style={ui.fieldInput} value={selected.company_name || ''}
                  onChange={(e) => setSelected({ ...selected, company_name: e.target.value })} />

                <label style={ui.label}>Property Type</label>
                <select style={ui.selectInput} value={selected.inventory_type || ''}
                  onChange={(e) => setSelected({ ...selected, inventory_type: e.target.value })}>
                  <option value="">Select Property Type</option>
                  <option>Apartments</option>
                  <option>Houses / Villas</option>
                  <option>Plots / Land</option>
                  <option>Shops / Commercial</option>
                  <option>Farmhouses</option>
                </select>
              </>
            )}

            <label style={ui.label}>Phone / WhatsApp</label>
            <input style={ui.fieldInput} value={selected.phone || ''}
              onChange={(e) => setSelected({ ...selected, phone: e.target.value })} />

            <label style={ui.label}>City / Country</label>
            <input style={ui.fieldInput} value={selected.city || ''}
              onChange={(e) => setSelected({ ...selected, city: e.target.value })} />

            <label style={ui.label}>Status</label>
            <select
              style={ui.selectInput}
              value={selected.status}
              onChange={(e) => setSelected({ ...selected, status: e.target.value })}
            >
              {(() => {
                const list = selected.lead_category === 'project' ? PROJECT_STATUSES : CLIENT_STATUSES;
                const options = list.includes(selected.status) ? list : (selected.status ? [selected.status, ...list] : list);
                return options.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ));
              })()}
            </select>

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <a style={{ ...ui.btnGhost, textAlign: 'center', flex: 1 }} href={`tel:${(selected.phone || '').replace(/\s/g, '')}`}>Call</a>
              <a style={{ ...ui.btnGhost, textAlign: 'center', flex: 1 }}
                href={`https://wa.me/${(selected.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>

            <hr style={{ margin: '22px 0 16px', border: 'none', borderTop: '1px solid #E7E8EA' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <label style={{ ...ui.label, margin: 0 }}>Follow-up History</label>
              {selected.next_followup_date && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    color: '#065F46',
                  }}
                >
                  <span>📅 Next: {selected.next_followup_date}</span>
                  <span style={{ color: '#047857' }}>
                    · {getActionMeta(selected.next_action_type).icon} {getActionMeta(selected.next_action_type).label}
                  </span>
                  <button
                    type="button"
                    title="Clear next reminder"
                    onClick={clearReminder}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#EF4444',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '0 2px',
                      marginLeft: '3px',
                      fontSize: '12px',
                    }}
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 150, overflowY: 'auto', marginBottom: 12 }}>
              {notes.map((n) => (
                <div key={n.id} style={{ fontSize: 13, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px 10px' }}>
                  <div style={{ color: '#64748B', fontSize: 11, marginBottom: 4 }}>
                    {n.author_name || 'Team'} · {new Date(n.created_at).toLocaleString()}
                  </div>
                  <div style={{ color: '#1E293B', whiteSpace: 'pre-wrap' }}>{n.note}</div>
                </div>
              ))}
              {notes.length === 0 && <p style={{ fontSize: 12.5, color: '#94a3b8', margin: '4px 0' }}>No notes yet.</p>}
            </div>

            {/* New Follow-up & Next Action Box */}
            <div
              style={{
                padding: '12px',
                borderRadius: '8px',
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Add Follow-up Note:
                </span>
                <textarea
                  rows={2}
                  style={{
                    ...ui.fieldInput,
                    margin: 0,
                    width: '100%',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    fontSize: '12.5px',
                    fontFamily: 'inherit',
                    padding: '8px 10px',
                  }}
                  placeholder="Log discussion notes (e.g. Discussed proposal, client requested revised rates...)"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1 1 180px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
                    📅 Next Date:
                  </span>
                  <input
                    type="date"
                    style={{
                      ...ui.fieldInput,
                      margin: 0,
                      flex: 1,
                      padding: '6px 8px',
                      fontSize: '12px',
                    }}
                    value={newNoteDate}
                    onChange={(e) => setNewNoteDate(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: '1 1 140px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B', whiteSpace: 'nowrap' }}>
                    Action:
                  </span>
                  <select
                    style={{
                      ...ui.fieldInput,
                      margin: 0,
                      flex: 1,
                      padding: '6px 8px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                    value={newNoteAction}
                    onChange={(e) => setNewNoteAction(e.target.value)}
                  >
                    <option value="Call">📞 Call</option>
                    <option value="WhatsApp">💬 WhatsApp</option>
                    <option value="Email">✉️ Email</option>
                    <option value="Meeting">🤝 Meeting</option>
                    <option value="SMS">📱 SMS</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={addNote}
                  style={{
                    ...ui.btnGreen,
                    padding: '7px 14px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                >
                  Save Note & Action
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
              <button style={ui.btnGreen} onClick={saveLead}>Save Changes</button>
              <button style={ui.btnDanger} onClick={deleteLead}>Delete Lead</button>
              <button style={{ ...ui.btnGhost, marginLeft: 'auto' }} onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {editingMember && (
        <div style={ui.overlay} onClick={() => setEditingMember(null)}>
          <div style={{ ...ui.modal, width: '520px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, color: '#0F172A' }}>Edit Access Permissions</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: 13, color: '#64748B' }}>
                  {editingMember.name || 'Team Member'} ({editingMember.email})
                </p>
              </div>
              <button
                onClick={() => setEditingMember(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Assigned Sections</span>
                <button
                  type="button"
                  onClick={() => toggleEditingPerm('all')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#14A750',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {editingMember.permissions?.includes('all') || editingMember.permissions?.length === AVAILABLE_PERMISSIONS.length
                    ? 'Deselect All'
                    : 'Select All / Full Access'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {AVAILABLE_PERMISSIONS.map((perm) => {
                  const isChecked = editingMember.permissions?.includes('all') || editingMember.permissions?.includes(perm.key);
                  return (
                    <label
                      key={perm.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: isChecked ? '1px solid #14A750' : '1px solid #E2E8F0',
                        background: isChecked ? '#F0FDF4' : '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleEditingPerm(perm.key)}
                        style={{ width: '16px', height: '16px', accentColor: '#14A750', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '13.5px', fontWeight: isChecked ? '600' : '500', color: isChecked ? '#166534' : '#334155' }}>
                        {perm.label}
                      </span>
                    </label>
                  );
                })}
              </div>
              <p style={{ fontSize: '12px', color: '#94A3B8', margin: '10px 0 0 0' }}>
                Members can only view, manage, and receive notification alerts for their assigned sections.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button
                style={{ ...ui.btnGreen, flex: 1, padding: '10px 16px', justifyContent: 'center' }}
                onClick={savePermissions}
                disabled={updatingPerms}
              >
                {updatingPerms ? 'Saving Permissions...' : 'Save Permissions'}
              </button>
              <button
                style={{ ...ui.btnGhost, padding: '10px 16px' }}
                onClick={() => setEditingMember(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {createdInvite && (
        <div style={ui.overlay} onClick={() => setCreatedInvite(null)}>
          <div style={{ ...ui.modal, width: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  margin: '0 auto 10px',
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#0F172A', fontWeight: 700 }}>
                Team Member Added!
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                {createdInvite.message || `Account created for ${createdInvite.name} (${createdInvite.email}).`}
              </p>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 14px', marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '6px' }}>
                Invitation & Email Verification Link:
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  readOnly
                  value={createdInvite.link}
                  style={{ ...ui.input, flex: 1, minWidth: 0, fontSize: '12px', background: '#FFFFFF' }}
                  onClick={(e) => e.target.select()}
                />
                <button
                  style={{ ...ui.btnGreen, padding: '8px 14px', fontSize: '12px', whiteSpace: 'nowrap' }}
                  onClick={() => copyToClipboard(createdInvite.link, 'modal-invite-link')}
                >
                  {copiedKey === 'modal-invite-link' ? 'Copied ✓' : 'Copy Link'}
                </button>
              </div>
              <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '8px 0 0 0' }}>
                {createdInvite.emailSent
                  ? 'An automated email was sent to the member, but you can also share this link directly.'
                  : 'Share this link with your team member via WhatsApp or Email so they can verify and activate.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hello ${createdInvite.name}, please click this link to verify your email and activate your Propkads portal account: ${createdInvite.link}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...ui.btnGhost,
                  flex: 1,
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: '#16A34A',
                  borderColor: '#86EFAC',
                  background: '#F0FDF4',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                Share on WhatsApp 💬
              </a>
              <button
                style={{ ...ui.btnGhost, padding: '10px 20px', fontSize: '13px' }}
                onClick={() => setCreatedInvite(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddMemberModal && (
        <div style={ui.overlay} onClick={() => setShowAddMemberModal(false)}>
          <div style={{ ...ui.modal, width: '560px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0F172A', fontWeight: 700 }}>
                Add New Team Member
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMemberModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={addTeamMember} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Full Name *
                </label>
                <input
                  style={{ ...ui.input, width: '100%' }}
                  placeholder="e.g. Ali Ahmed"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Email Address *
                </label>
                <input
                  style={{ ...ui.input, width: '100%' }}
                  type="email"
                  placeholder="team@example.com"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>
                    Initial Password (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={generateStrongPassword}
                    style={{
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      color: '#15803D',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      borderRadius: '5px',
                      padding: '2px 8px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>⚡</span> Auto Suggest Strong Password
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{ ...ui.input, width: '100%', paddingRight: '40px' }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Set password or leave blank for invite link"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748B',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Re-enter Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{
                      ...ui.input,
                      width: '100%',
                      paddingRight: '40px',
                      borderColor:
                        confirmPassword && newUser.password
                          ? confirmPassword === newUser.password
                            ? '#16A34A'
                            : '#DC2626'
                          : undefined,
                    }}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Re-type password to match"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748B',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPassword && (
                  <div
                    style={{
                      fontSize: '11.5px',
                      marginTop: '4px',
                      fontWeight: 600,
                      color: confirmPassword === newUser.password ? '#16A34A' : '#DC2626',
                    }}
                  >
                    {confirmPassword === newUser.password ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </div>
                )}
              </div>

              {newUser.password && (
                <div
                  style={{
                    padding: '10px 12px',
                    background: '#F8FAFC',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#475569', marginBottom: '6px', fontSize: '11.5px' }}>
                    Password Security Requirements:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: newUser.password.length >= 8 ? '#16A34A' : '#94A3B8' }}>
                      <span style={{ fontWeight: 700 }}>{newUser.password.length >= 8 ? '✓' : '○'}</span>
                      <span>At least 8 characters</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: /[A-Z]/.test(newUser.password) ? '#16A34A' : '#94A3B8' }}>
                      <span style={{ fontWeight: 700 }}>{/[A-Z]/.test(newUser.password) ? '✓' : '○'}</span>
                      <span>1 uppercase letter (A-Z)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: /[a-z]/.test(newUser.password) ? '#16A34A' : '#94A3B8' }}>
                      <span style={{ fontWeight: 700 }}>{/[a-z]/.test(newUser.password) ? '✓' : '○'}</span>
                      <span>1 lowercase letter (a-z)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: /[0-9]/.test(newUser.password) ? '#16A34A' : '#94A3B8' }}>
                      <span style={{ fontWeight: 700 }}>{/[0-9]/.test(newUser.password) ? '✓' : '○'}</span>
                      <span>1 number (0-9)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newUser.password) ? '#16A34A' : '#94A3B8' }}>
                      <span style={{ fontWeight: 700 }}>{/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newUser.password) ? '✓' : '○'}</span>
                      <span>1 special symbol (@, $, #, etc.)</span>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginTop: 6, padding: '14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                    Section Access Permissions:
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleNewUserPerm('all')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#14A750',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {newUser.permissions?.includes('all') || newUser.permissions?.length === AVAILABLE_PERMISSIONS.length
                      ? 'Deselect All'
                      : 'Select All / Full Access'}
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '8px' }}>
                  {AVAILABLE_PERMISSIONS.map((perm) => {
                    const isChecked = newUser.permissions?.includes('all') || newUser.permissions?.includes(perm.key);
                    return (
                      <label
                        key={perm.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          background: isChecked ? '#F0FDF4' : '#FFFFFF',
                          border: isChecked ? '1px solid #14A750' : '1px solid #E2E8F0',
                          cursor: 'pointer',
                          fontSize: '12.5px',
                          color: isChecked ? '#0F172A' : '#64748B',
                          fontWeight: isChecked ? 600 : 500,
                          userSelect: 'none',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(isChecked)}
                          onChange={() => toggleNewUserPerm(perm.key)}
                          style={{ accentColor: '#14A750', width: 16, height: 16, cursor: 'pointer' }}
                        />
                        <span>{perm.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {teamError && <p style={{ color: '#B3261E', fontSize: 13, margin: 0 }}>{teamError}</p>}

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  style={{ ...ui.btnGreen, flex: 1, padding: '11px', borderRadius: '6px', justifyContent: 'center' }}
                  type="submit"
                >
                  Send Invitation & Add Member
                </button>
                <button
                  type="button"
                  style={{ ...ui.btnGhost, padding: '11px 18px', borderRadius: '6px' }}
                  onClick={() => setShowAddMemberModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
