'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ArticleContent from '@/components/ArticleContent';

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

const CLIENT_PROPERTY_TYPES = [
  'Apartments',
  'Houses / Villas',
  'Plots / Land',
  'Shops / Commercial',
  'Farmhouses',
];

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
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    background: '#FFFFFF',
    minWidth: '100%',
  },
  th: {
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: '11.5px',
    fontWeight: 700,
    color: '#64748B',
    borderBottom: '2px solid #E2E8F0',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    background: '#F8FAFC',
    verticalAlign: 'middle',
  },
  td: {
    padding: '12px 14px',
    fontSize: '13.5px',
    borderBottom: '1px solid #F1F5F9',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    color: '#334155',
  },
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
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setReadNotifications(parsed);
        } else {
          setReadNotifications([]);
        }
      }
      const lastExp = localStorage.getItem('propkads_last_client_export');
      if (lastExp) setLastExportedAt(lastExp);
      const lastProjExp = localStorage.getItem('propkads_last_project_export');
      if (lastProjExp) setLastProjExportedAt(lastProjExp);
      const lastAppExp = localStorage.getItem('propkads_last_app_export');
      if (lastAppExp) setLastAppExportedAt(lastAppExp);
      const lastNewsExp = localStorage.getItem('propkads_last_newsletter_export');
      if (lastNewsExp) setLastNewsExportedAt(lastNewsExp);
    } catch {}
  }, []);

  const markAsRead = (keyOrItem) => {
    if (!keyOrItem) return;

    let keysToAdd = [];
    if (typeof keyOrItem === 'string') {
      keysToAdd.push(keyOrItem);
    } else if (typeof keyOrItem === 'object') {
      if (keyOrItem.notifKey) keysToAdd.push(keyOrItem.notifKey);
      if (keyOrItem.id) {
        keysToAdd.push(`client-${keyOrItem.id}`);
        keysToAdd.push(`project-${keyOrItem.id}`);
        keysToAdd.push(`app-${keyOrItem.id}`);
        keysToAdd.push(`sub-${keyOrItem.id}`);
        keysToAdd.push(String(keyOrItem.id));
      }
    }

    setReadNotifications((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      const newSet = new Set([...arr, ...keysToAdd]);
      const updated = Array.from(newSet);
      try {
        localStorage.setItem('pk_read_notifications', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const markAllAsRead = () => {
    const allKeys = newNotifications.map((l) => l.notifKey);
    setReadNotifications((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      const merged = Array.from(new Set([...arr, ...allKeys]));
      try {
        localStorage.setItem('pk_read_notifications', JSON.stringify(merged));
      } catch {}
      return merged;
    });
  };

  // In-App Toast state (Zero native browser alerts)
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
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

  // Smart Export states
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportCategory, setExportCategory] = useState('client'); // 'client' | 'project'
  const [exportScope, setExportScope] = useState('new'); // 'new' | 'range' | 'all'
  const [exportFromDate, setExportFromDate] = useState('');
  const [exportToDate, setExportToDate] = useState('');
  const [lastExportedAt, setLastExportedAt] = useState(null);
  const [lastProjExportedAt, setLastProjExportedAt] = useState(null);
  const [lastAppExportedAt, setLastAppExportedAt] = useState(null);
  const [lastNewsExportedAt, setLastNewsExportedAt] = useState(null);

  // Custom Delete Confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeletingLead, setIsDeletingLead] = useState(false);

  // Client Leads Pagination state (20 leads per page)
  const [currentPage, setCurrentPage] = useState(1);
  const mainRef = useRef(null);
  const paginationRef = useRef(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Navigate client pages smoothly without scrolling/jumping to the top
  const goToPage = (e, targetPage) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentPage(targetPage);
    // Keep pagination bar completely anchored right where user is clicking
    requestAnimationFrame(() => {
      if (paginationRef.current) {
        paginationRef.current.scrollIntoView({ block: 'nearest' });
      }
    });
  };

  // Project Leads state (Buyers / Investors per Project, e.g. Karachi Enclave)
  const [projectLeads, setProjectLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState('Karachi Enclave');
  const [projSearch, setProjSearch] = useState('');
  const [projUnitFilter, setProjUnitFilter] = useState('');
  const [projStatusFilter, setProjStatusFilter] = useState('');

  // Project Leads Pagination state (20 leads per page)
  const [projCurrentPage, setProjCurrentPage] = useState(1);
  const projPaginationRef = useRef(null);

  useEffect(() => {
    setProjCurrentPage(1);
  }, [projSearch, selectedProject]);

  // Navigate project pages smoothly without scrolling/jumping to the top
  const goToProjPage = (e, targetPage) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setProjCurrentPage(targetPage);
    requestAnimationFrame(() => {
      if (projPaginationRef.current) {
        projPaginationRef.current.scrollIntoView({ block: 'nearest' });
      }
    });
  };


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
    designation: '',
    password: '',
    permissions: [],
  });
  const [teamError, setTeamError] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [updatingPerms, setUpdatingPerms] = useState(false);
  const [createdInvite, setCreatedInvite] = useState(null);
  const [createdMemberData, setCreatedMemberData] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editMemberNewPassword, setEditMemberNewPassword] = useState('');
  const [showSavedPassword, setShowSavedPassword] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedMemberToRemove, setSelectedMemberToRemove] = useState(null);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [isRemovingMember, setIsRemovingMember] = useState(false);

  // Newsletter state
  const [subscribers, setSubscribers] = useState([]);
  const [newsSearch, setNewsSearch] = useState('');
  const [selectedSubscriberToDelete, setSelectedSubscriberToDelete] = useState(null);
  const [showDeleteSubscriberConfirm, setShowDeleteSubscriberConfirm] = useState(false);
  const [isDeletingSubscriber, setIsDeletingSubscriber] = useState(false);

  // Newsletter Pagination state (20 subscribers per page)
  const [newsCurrentPage, setNewsCurrentPage] = useState(1);
  const newsPaginationRef = useRef(null);

  useEffect(() => {
    setNewsCurrentPage(1);
  }, [newsSearch]);

  const goToNewsPage = (e, targetPage) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setNewsCurrentPage(targetPage);
    requestAnimationFrame(() => {
      if (newsPaginationRef.current) {
        newsPaginationRef.current.scrollIntoView({ block: 'nearest' });
      }
    });
  };

  // Applications state
  const [applications, setApplications] = useState([]);
  const [appSearch, setAppSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDeleteAppConfirm, setShowDeleteAppConfirm] = useState(false);
  const [isDeletingApp, setIsDeletingApp] = useState(false);

  // Applications Pagination state (20 candidates per page)
  const [appCurrentPage, setAppCurrentPage] = useState(1);
  const appPaginationRef = useRef(null);

  useEffect(() => {
    setAppCurrentPage(1);
  }, [appSearch]);

  // Navigate application pages smoothly without scrolling/jumping to the top
  const goToAppPage = (e, targetPage) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAppCurrentPage(targetPage);
    requestAnimationFrame(() => {
      if (appPaginationRef.current) {
        appPaginationRef.current.scrollIntoView({ block: 'nearest' });
      }
    });
  };

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogSearch, setBlogSearch] = useState('');
  const [blogPlacementFilter, setBlogPlacementFilter] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isBlogSaving, setIsBlogSaving] = useState(false);
  const [blogCurrentPage, setBlogCurrentPage] = useState(1);
  const blogPaginationRef = useRef(null);
  const [selectedBlogToDelete, setSelectedBlogToDelete] = useState(null);
  const [showDeleteBlogConfirm, setShowDeleteBlogConfirm] = useState(false);
  const [isDeletingBlog, setIsDeletingBlog] = useState(false);

  useEffect(() => {
    setBlogCurrentPage(1);
  }, [blogSearch, blogPlacementFilter]);

  const goToBlogPage = (e, targetPage) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setBlogCurrentPage(targetPage);
    requestAnimationFrame(() => {
      if (blogPaginationRef.current) {
        blogPaginationRef.current.scrollIntoView({ block: 'nearest' });
      }
    });
  };

  const promptDeleteBlog = (b) => {
    setSelectedBlogToDelete(b);
    setShowDeleteBlogConfirm(true);
  };

  const handleConfirmDeleteBlog = async () => {
    if (!selectedBlogToDelete) return;
    setIsDeletingBlog(true);
    try {
      const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(selectedBlogToDelete.id)}`, {
        method: 'DELETE',
      });
      const d = await res.json();
      if (d.success) {
        if (selectedBlog?.id === selectedBlogToDelete.id) setSelectedBlog(null);
        setShowDeleteBlogConfirm(false);
        setSelectedBlogToDelete(null);
        loadBlogs();
        showToast('Article deleted successfully.', 'success');
      } else {
        showToast(d.error || 'Failed to delete article.', 'error');
      }
    } catch {
      showToast('Network error while deleting article.', 'error');
    } finally {
      setIsDeletingBlog(false);
    }
  };

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

  // Close active modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) { setShowDeleteConfirm(false); return; }
        if (showDeleteAppConfirm) { setShowDeleteAppConfirm(false); return; }
        if (showDeleteBlogConfirm) { setShowDeleteBlogConfirm(false); return; }
        if (showDeleteSubscriberConfirm) { setShowDeleteSubscriberConfirm(false); return; }
        if (showRemoveMemberModal) { setShowRemoveMemberModal(false); return; }
        if (showExportModal) { setShowExportModal(false); return; }
        if (showShareModal) { setShowShareModal(false); setCreatedMemberData(null); return; }
        if (showAddMemberModal) { setShowAddMemberModal(false); return; }
        if (editingMember) { setEditingMember(null); setEditMemberNewPassword(''); setShowSavedPassword(false); return; }
        if (selectedBlog) { setSelectedBlog(null); return; }
        if (selectedApp) { setSelectedApp(null); return; }
        if (selected) { setSelected(null); return; }
        if (showNotifications) { setShowNotifications(false); return; }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    showDeleteConfirm,
    showDeleteAppConfirm,
    showDeleteBlogConfirm,
    showDeleteSubscriberConfirm,
    showRemoveMemberModal,
    showExportModal,
    showShareModal,
    showAddMemberModal,
    editingMember,
    selectedBlog,
    selectedApp,
    selected,
    showNotifications,
  ]);

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
    try {
      const res = await fetch('/api/admin/newsletter');
      const d = await res.json();
      if (d.success && Array.isArray(d.subscribers)) {
        setSubscribers(d.subscribers);
      }
    } catch (err) {
      console.error('loadSubscribers error:', err);
    }
  };

  const handleDeleteSubscriber = (sub) => {
    setSelectedSubscriberToDelete(sub);
    setShowDeleteSubscriberConfirm(true);
  };

  const handleConfirmDeleteSubscriber = async () => {
    if (!selectedSubscriberToDelete) return;
    setIsDeletingSubscriber(true);
    try {
      await fetch(`/api/admin/newsletter?id=${selectedSubscriberToDelete.id}`, { method: 'DELETE' });
      setShowDeleteSubscriberConfirm(false);
      setSelectedSubscriberToDelete(null);
      loadSubscribers();
    } catch (err) {
      console.error('Delete subscriber error:', err);
    } finally {
      setIsDeletingSubscriber(false);
    }
  };

  const loadApplications = async () => {
    try {
      const res = await fetch('/api/admin/applications');
      const d = await res.json();
      if (d.success && Array.isArray(d.applications)) {
        setApplications(d.applications);
      }
    } catch (err) {
      console.error('loadApplications error:', err);
    }
  };

  const openApplication = (app) => {
    markAsRead(app);
    setSelectedApp(app);
  };

  const deleteApplication = (app) => {
    if (app) setSelectedApp(app);
    setShowDeleteAppConfirm(true);
  };

  const handleConfirmDeleteApp = async () => {
    if (!selectedApp) return;
    setIsDeletingApp(true);
    try {
      await fetch(`/api/admin/applications?id=${selectedApp.id}`, { method: 'DELETE' });
      setShowDeleteAppConfirm(false);
      setSelectedApp(null);
      loadApplications();
    } catch (err) {
      console.error('Delete application error:', err);
    } finally {
      setIsDeletingApp(false);
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
      image: '',
      excerpt: '',
      fullContent: '',
      placement: 'grid',
    });
  };

  const openEditBlogModal = (b) => {
    setSelectedBlog({
      ...b,
      placement: b.isFeatured ? 'featured' : b.isTrending ? 'trending' : 'grid',
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
      showToast('Please enter an article title.', 'error');
      return;
    }

    setIsBlogSaving(true);
    try {
      const words = `${selectedBlog.fullContent || ''} ${selectedBlog.excerpt || ''}`.trim().split(/\s+/).filter(Boolean).length;
      const autoReadTime = Math.max(1, Math.ceil(words / 200)) + ' min read';

      const autoDate = selectedBlog.id && selectedBlog.date
        ? selectedBlog.date
        : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      const payload = {
        id: selectedBlog.id || undefined,
        title: selectedBlog.title.trim(),
        date: autoDate,
        readTime: autoReadTime,
        image: selectedBlog.image || '',
        excerpt: selectedBlog.excerpt || '',
        fullContent: selectedBlog.fullContent || '',
        takeaways: [],
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
        showToast(selectedBlog.id ? 'Article updated successfully!' : 'Article published successfully!', 'success');
      } else {
        showToast(d.error || 'Failed to save article.', 'error');
      }
    } catch (err) {
      showToast('Network error while saving article.', 'error');
    } finally {
      setIsBlogSaving(false);
    }
  };

  const deleteBlogArticle = (b) => {
    promptDeleteBlog(b);
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
    markAsRead(lead);
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

  const deleteLead = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDeleteLead = async () => {
    if (!selected) return;
    setIsDeletingLead(true);
    try {
      await fetch(`/api/admin/leads?id=${selected.id}`, { method: 'DELETE' });
      setShowDeleteConfirm(false);
      setSelected(null);
      loadLeads();
      loadProjectLeads();
    } catch (err) {
      console.error('Delete lead error:', err);
    } finally {
      setIsDeletingLead(false);
    }
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
      showToast('Copied to clipboard!', 'success');
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        setCopiedKey(key || 'copied');
        setTimeout(() => setCopiedKey(''), 2500);
        showToast('Copied to clipboard!', 'success');
      } catch {
        showToast('Failed to copy to clipboard', 'error');
      }
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

  const shareMemberOnWhatsApp = (member) => {
    if (!member) return;
    const pwd = member.password || member.initial_password || '(Password as set by admin)';
    const roleText = member.designation || (member.role === 'admin' ? 'Primary Admin' : 'Team Member');
    const text = `*Propkads Team Portal Login Details*\n\nHello *${member.name}*,\nYour account is ready on the Propkads Admin Portal.\n\n👤 *Role / Designation:* ${roleText}\n🔗 *Login Link:* https://propkads.com/admin\n✉️ *Email:* ${member.email}\n🔑 *Password:* ${pwd}\n\nPlease keep your credentials safe and do not share them.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const copyCredentialsText = (member, key) => {
    if (!member) return;
    const pwd = member.password || member.initial_password || '(Password as set by admin)';
    const roleText = member.designation || (member.role === 'admin' ? 'Primary Admin' : 'Team Member');
    const text = `Propkads Team Portal Login Details\nName: ${member.name}\nRole / Designation: ${roleText}\nLogin Link: https://propkads.com/admin\nEmail: ${member.email}\nPassword: ${pwd}`;
    copyToClipboard(text, key || `creds-${member.email}`);
  };

  const addTeamMember = async (e) => {
    e.preventDefault();
    setTeamError('');

    if (!newUser.name.trim() || !newUser.email.trim()) {
      setTeamError('Name and email are required.');
      return;
    }
    if (!newUser.designation || !newUser.designation.trim()) {
      setTeamError('Role / Designation is required (e.g. Sales Executive).');
      return;
    }
    if (!newUser.password || newUser.password.length < 6) {
      setTeamError('Password is required and must be at least 6 characters long.');
      return;
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
        const memberInfo = d.user || {
          name: newUser.name,
          email: newUser.email,
          designation: newUser.designation,
          password: newUser.password,
        };
        setCreatedMemberData(memberInfo);
        setShowShareModal(true);
        setNewUser({ name: '', email: '', designation: '', password: '', permissions: [] });
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
        showToast(d.message || 'Invitation resent! Link copied to clipboard.', 'success');
        loadUsers();
      } else {
        showToast(d.error || 'Failed to resend invitation.', 'error');
      }
    } catch (err) {
      showToast('Error resending invite: ' + err.message, 'error');
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
      const payload = {
        id: editingMember.id,
        permissions: editingMember.permissions || [],
        designation: editingMember.designation?.trim() || 'Team Member',
      };
      if (editMemberNewPassword.trim()) {
        if (editMemberNewPassword.trim().length < 6) {
          showToast('New password must be at least 6 characters long.', 'error');
          setUpdatingPerms(false);
          return;
        }
        payload.password = editMemberNewPassword.trim();
      }
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast(data.error || 'Failed to update member.', 'error');
        return;
      }
      setEditingMember(null);
      setEditMemberNewPassword('');
      loadUsers();
      showToast('Team member updated successfully!', 'success');
    } catch (err) {
      showToast('Error updating member: ' + err.message, 'error');
    } finally {
      setUpdatingPerms(false);
    }
  };

  const promptRemoveMember = (user) => {
    setSelectedMemberToRemove(user);
    setShowRemoveMemberModal(true);
  };

  const handleConfirmRemoveMember = async () => {
    if (!selectedMemberToRemove) return;
    setIsRemovingMember(true);
    try {
      const res = await fetch(`/api/admin/users?id=${selectedMemberToRemove.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        showToast(data.error || 'Could not remove team member.', 'error');
        return;
      }
      setShowRemoveMemberModal(false);
      setSelectedMemberToRemove(null);
      loadUsers();
      showToast('Team member removed successfully.', 'success');
    } catch (err) {
      showToast(`Network error: ${err.message}`, 'error');
    } finally {
      setIsRemovingMember(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (!me) return null;

  // Filtered Client Leads (real-time instant search)
  const visibleClientLeads = leads.filter((l) => {
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const hay = [
        l.full_name,
        l.company_name,
        l.phone,
        l.city,
        l.inventory_type,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Client Leads Pagination (20 leads per page)
  const pageSize = 20;
  const totalClientLeads = visibleClientLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalClientLeads / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, totalClientLeads);
  const paginatedClientLeads = visibleClientLeads.slice(startIdx, endIdx);

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

  // Filtered project leads for the table (instant real-time search)
  const visibleProjectLeads = scopedProjectLeads.filter((l) => {
    if (projSearch.trim()) {
      const q = projSearch.trim().toLowerCase();
      const hay = [l.full_name, l.phone, l.city, l.project_name, l.unit_interest]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Project Leads Pagination (20 leads per page)
  const projPageSize = 20;
  const totalProjectLeads = visibleProjectLeads.length;
  const totalProjPages = Math.max(1, Math.ceil(totalProjectLeads / projPageSize));
  const safeProjCurrentPage = Math.min(projCurrentPage, totalProjPages);
  const projStartIdx = (safeProjCurrentPage - 1) * projPageSize;
  const projEndIdx = Math.min(projStartIdx + projPageSize, totalProjectLeads);
  const paginatedProjectLeads = visibleProjectLeads.slice(projStartIdx, projEndIdx);

  const projTotal = scopedProjectLeads.length;

  // Filtered applications for the table (instant real-time search)
  const visibleApplications = applications.filter((app) => {
    if (appSearch.trim()) {
      const q = appSearch.trim().toLowerCase();
      const hay = [app.full_name, app.position, app.email, app.phone]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // Applications Pagination (20 candidates per page)
  const appPageSize = 20;
  const totalApplications = visibleApplications.length;
  const totalAppPages = Math.max(1, Math.ceil(totalApplications / appPageSize));
  const safeAppCurrentPage = Math.min(appCurrentPage, totalAppPages);
  const appStartIdx = (safeAppCurrentPage - 1) * appPageSize;
  const appEndIdx = Math.min(appStartIdx + appPageSize, totalApplications);
  const paginatedApplications = visibleApplications.slice(appStartIdx, appEndIdx);

  // Filtered subscribers for the table (instant real-time search)
  const visibleSubscribers = subscribers.filter((sub) => {
    if (newsSearch.trim()) {
      const q = newsSearch.trim().toLowerCase();
      return (sub.email || '').toLowerCase().includes(q);
    }
    return true;
  });

  // Newsletter Pagination (20 subscribers per page)
  const newsPageSize = 20;
  const totalSubscribers = visibleSubscribers.length;
  const totalNewsPages = Math.max(1, Math.ceil(totalSubscribers / newsPageSize));
  const safeNewsCurrentPage = Math.min(newsCurrentPage, totalNewsPages);
  const newsStartIdx = (safeNewsCurrentPage - 1) * newsPageSize;
  const newsEndIdx = Math.min(newsStartIdx + newsPageSize, totalSubscribers);
  const paginatedSubscribers = visibleSubscribers.slice(newsStartIdx, newsEndIdx);

  // Blogs Filtering & Pagination (20 articles per page)
  const visibleBlogs = blogs.filter((b) => {
    const matchesSearch =
      !blogSearch ||
      (b.title && b.title.toLowerCase().includes(blogSearch.toLowerCase())) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()));
    if (!matchesSearch) return false;
    if (blogPlacementFilter === 'featured') return b.isFeatured;
    if (blogPlacementFilter === 'trending') return b.isTrending;
    if (blogPlacementFilter === 'grid') return !b.isFeatured && !b.isTrending;
    return true;
  });

  const blogPageSize = 20;
  const totalBlogs = visibleBlogs.length;
  const totalBlogPages = Math.max(1, Math.ceil(totalBlogs / blogPageSize));
  const safeBlogCurrentPage = Math.min(blogCurrentPage, totalBlogPages);
  const blogStartIdx = (safeBlogCurrentPage - 1) * blogPageSize;
  const blogEndIdx = Math.min(blogStartIdx + blogPageSize, totalBlogs);
  const paginatedBlogs = visibleBlogs.slice(blogStartIdx, blogEndIdx);

  // Smart Export Calculations (supports Client Leads, Project Leads, Job Applications & Newsletter)
  const activeExportPool = exportCategory === 'project'
    ? scopedProjectLeads
    : exportCategory === 'application'
    ? applications
    : exportCategory === 'newsletter'
    ? subscribers
    : leads;
  const activeLastExportedAt = exportCategory === 'project'
    ? lastProjExportedAt
    : exportCategory === 'application'
    ? lastAppExportedAt
    : exportCategory === 'newsletter'
    ? lastNewsExportedAt
    : lastExportedAt;

  const newLeadsSinceLastExport = activeExportPool.filter((l) => {
    if (!activeLastExportedAt) return true;
    return new Date(l.created_at) > new Date(activeLastExportedAt);
  });

  const leadsInRange = activeExportPool.filter((l) => {
    const rowDate = new Date(l.created_at);
    if (exportFromDate) {
      if (rowDate < new Date(`${exportFromDate}T00:00:00`)) return false;
    }
    if (exportToDate) {
      if (rowDate > new Date(`${exportToDate}T23:59:59.999`)) return false;
    }
    return true;
  });

  const readyToExportCount = (() => {
    if (exportScope === 'new') return newLeadsSinceLastExport.length;
    if (exportScope === 'range') return leadsInRange.length;
    return activeExportPool.length;
  })();

  const triggerExport = () => {
    let url = '';
    if (exportCategory === 'application') {
      url = `/api/admin/applications/export?scope=${exportScope}`;
      if (exportScope === 'new' && activeLastExportedAt) {
        url += `&since=${encodeURIComponent(activeLastExportedAt)}`;
      } else if (exportScope === 'range') {
        if (exportFromDate) url += `&from=${exportFromDate}`;
        if (exportToDate) url += `&to=${exportToDate}`;
      }
    } else if (exportCategory === 'newsletter') {
      url = `/api/admin/newsletter/export?scope=${exportScope}`;
      if (exportScope === 'new' && activeLastExportedAt) {
        url += `&since=${encodeURIComponent(activeLastExportedAt)}`;
      } else if (exportScope === 'range') {
        if (exportFromDate) url += `&from=${exportFromDate}`;
        if (exportToDate) url += `&to=${exportToDate}`;
      }
    } else {
      url = `/api/admin/leads/export?category=${exportCategory}&scope=${exportScope}`;
      if (exportCategory === 'project' && selectedProject) {
        url += `&project=${encodeURIComponent(selectedProject)}`;
      }
      if (exportScope === 'new' && activeLastExportedAt) {
        url += `&since=${encodeURIComponent(activeLastExportedAt)}`;
      } else if (exportScope === 'range') {
        if (exportFromDate) url += `&from=${exportFromDate}`;
        if (exportToDate) url += `&to=${exportToDate}`;
      }
    }

    window.location.href = url;

    const nowIso = new Date().toISOString();
    if (typeof window !== 'undefined') {
      try {
        const storeKey = exportCategory === 'project'
          ? 'propkads_last_project_export'
          : exportCategory === 'application'
          ? 'propkads_last_app_export'
          : exportCategory === 'newsletter'
          ? 'propkads_last_newsletter_export'
          : 'propkads_last_client_export';
        localStorage.setItem(storeKey, nowIso);
      } catch {}
    }
    if (exportCategory === 'project') setLastProjExportedAt(nowIso);
    else if (exportCategory === 'application') setLastAppExportedAt(nowIso);
    else if (exportCategory === 'newsletter') setLastNewsExportedAt(nowIso);
    else setLastExportedAt(nowIso);
    setShowExportModal(false);
  };

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

  const unreadCount = newNotifications.filter((l) => {
    const arr = Array.isArray(readNotifications) ? readNotifications : [];
    return !arr.includes(l.notifKey) && !arr.includes(`client-${l.id}`) && !arr.includes(`project-${l.id}`);
  }).length;

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
                          const isRead = (Array.isArray(readNotifications) ? readNotifications : []).some(
                            (k) => k === item.notifKey || k === `client-${item.id}` || k === `project-${item.id}`
                          );
                          return (
                            <div
                              key={item.notifKey}
                              onClick={() => {
                                markAsRead(item);
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
        <main ref={mainRef} style={ui.body}>
        {tab === 'leads' && (
          <>
            {/* Clean Header & Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>
                  Total Client Leads:
                </span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: '#14A750' }}>
                  {search.trim() ? `${visibleClientLeads.length} / ${leads.length}` : leads.length}
                </span>
                {search.trim() && (
                  <span style={{ fontSize: '12.5px', color: '#64748B', fontWeight: 500 }}>
                    (matching "{search}")
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 auto', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', maxWidth: '340px', width: '100%' }}>
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

                <button
                  type="button"
                  style={{
                    ...ui.btnGreen,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setExportCategory('client');
                    const stored = typeof window !== 'undefined' ? localStorage.getItem('propkads_last_client_export') : null;
                    if (stored) {
                      setLastExportedAt(stored);
                      const newCount = leads.filter((l) => new Date(l.created_at) > new Date(stored)).length;
                      if (newCount === 0) setExportScope('all');
                      else setExportScope('new');
                    } else {
                      setExportScope('new');
                    }
                    setShowExportModal(true);
                  }}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Clean Full-Width Leads Table (100% Fit) */}
            <div style={{ overflowX: 'auto', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <table style={{ ...ui.table, width: '100%', minWidth: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ ...ui.th, width: '20%' }}>Name</th>
                    <th style={{ ...ui.th, width: '22%' }}>Company / Project</th>
                    <th style={{ ...ui.th, width: '16%' }}>Phone</th>
                    <th style={{ ...ui.th, width: '14%' }}>City</th>
                    <th style={{ ...ui.th, width: '16%' }}>Property Type</th>
                    <th style={{ ...ui.th, width: '12%' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedClientLeads.map((l) => (
                    <tr
                      key={l.id}
                      style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                      onClick={() => openLead(l)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A', whiteSpace: 'normal' }}>{l.full_name}</td>
                      <td style={{ ...ui.td, whiteSpace: 'normal' }}>{l.company_name || '—'}</td>
                      <td style={{ ...ui.td, fontFamily: 'monospace', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>
                        {l.phone}
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'nowrap' }}>{l.city || '—'}</td>
                      <td style={ui.td}>
                        {l.inventory_type ? (
                          <span
                            style={{
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#334155',
                              background: '#F1F5F9',
                              padding: '3px 8px',
                              borderRadius: '5px',
                              whiteSpace: 'nowrap',
                              display: 'inline-block',
                            }}
                          >
                            {l.inventory_type}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={ui.td}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {totalClientLeads === 0 && (
                    <tr>
                      <td colSpan={6} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8', padding: '36px' }}>
                        No client leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls (20 leads per page) */}
            {totalClientLeads > 0 && (
              <div
                ref={paginationRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  padding: '12px 18px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Showing <strong style={{ color: '#0F172A' }}>{startIdx + 1}</strong>–<strong style={{ color: '#0F172A' }}>{endIdx}</strong> of{' '}
                  <strong style={{ color: '#0F172A' }}>{totalClientLeads}</strong> leads
                  {totalPages > 1 && (
                    <span style={{ marginLeft: '8px', color: '#94A3B8' }}>
                      (Page {safeCurrentPage} of {totalPages})
                    </span>
                  )}
                </div>

                {totalPages > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      disabled={safeCurrentPage === 1}
                      onClick={(e) => goToPage(e, Math.max(1, safeCurrentPage - 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeCurrentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                        color: safeCurrentPage === 1 ? '#94A3B8' : '#334155',
                        cursor: safeCurrentPage === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === safeCurrentPage;
                      return (
                        <button
                          key={pageNo}
                          type="button"
                          onClick={(e) => goToPage(e, pageNo)}
                          style={{
                            width: '34px',
                            height: '34px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            borderRadius: '6px',
                            border: isActive ? '1px solid #14A750' : '1px solid #CBD5E1',
                            background: isActive ? '#14A750' : '#FFFFFF',
                            color: isActive ? '#FFFFFF' : '#334155',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {pageNo}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={safeCurrentPage === totalPages}
                      onClick={(e) => goToPage(e, Math.min(totalPages, safeCurrentPage + 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeCurrentPage === totalPages ? '#F8FAFC' : '#FFFFFF',
                        color: safeCurrentPage === totalPages ? '#94A3B8' : '#334155',
                        cursor: safeCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
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

            {/* Project Leads Header & Action Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                  Total Buyer Leads:
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#14A750',
                  }}
                >
                  {scopedProjectLeads.length}
                </span>
                {projSearch.trim() && (
                  <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '4px' }}>
                    ({totalProjectLeads} matching)
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '280px' }}>
                  <input
                    style={{
                      ...ui.input,
                      width: '100%',
                      paddingRight: projSearch ? '28px' : '10px',
                      margin: 0,
                    }}
                    placeholder="Search name, phone, city, unit..."
                    value={projSearch}
                    onChange={(e) => setProjSearch(e.target.value)}
                  />
                  {projSearch && (
                    <button
                      type="button"
                      onClick={() => setProjSearch('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '2px',
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  style={{
                    ...ui.btnGreen,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setExportCategory('project');
                    const stored = typeof window !== 'undefined' ? localStorage.getItem('propkads_last_project_export') : null;
                    if (stored) {
                      setLastProjExportedAt(stored);
                      const newCount = scopedProjectLeads.filter((l) => new Date(l.created_at) > new Date(stored)).length;
                      if (newCount === 0) setExportScope('all');
                      else setExportScope('new');
                    } else {
                      setExportScope('new');
                    }
                    setShowExportModal(true);
                  }}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Clean Full-Width Project Leads Table (100% Fit) */}
            <div style={{ overflowX: 'auto', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <table style={{ ...ui.table, width: '100%', minWidth: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ ...ui.th, width: '22%' }}>Buyer Name</th>
                    <th style={{ ...ui.th, width: '17%' }}>Phone / WhatsApp</th>
                    <th style={{ ...ui.th, width: '15%' }}>City / Country</th>
                    <th style={{ ...ui.th, width: '18%' }}>Interested Unit</th>
                    <th style={{ ...ui.th, width: '16%' }}>Project</th>
                    <th style={{ ...ui.th, width: '12%' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProjectLeads.map((l) => (
                    <tr
                      key={l.id}
                      style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                      onClick={() => openLead(l)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A', whiteSpace: 'normal' }}>{l.full_name}</td>
                      <td style={{ ...ui.td, fontFamily: 'monospace', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>
                        {l.phone}
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'nowrap' }}>{l.city || '—'}</td>
                      <td style={{ ...ui.td, fontWeight: 600, color: '#14A750', whiteSpace: 'normal' }}>
                        {l.unit_interest ? (
                          <span
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 600,
                              color: '#15803D',
                              background: '#DCFCE7',
                              padding: '3px 8px',
                              borderRadius: '5px',
                              whiteSpace: 'normal',
                              display: 'inline-block',
                              lineHeight: 1.35,
                              maxWidth: '170px',
                            }}
                          >
                            {l.unit_interest}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td style={{ ...ui.td, fontWeight: 500, color: '#334155', whiteSpace: 'normal' }}>
                        {l.project_name || 'Karachi Enclave'}
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'nowrap' }}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {totalProjectLeads === 0 && (
                    <tr>
                      <td colSpan={6} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8', padding: '36px' }}>
                        No buyer leads found for {selectedProject || 'this project'}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Project Leads Pagination Controls (20 leads per page) */}
            {totalProjectLeads > 0 && (
              <div
                ref={projPaginationRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  padding: '12px 18px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Showing <strong style={{ color: '#0F172A' }}>{projStartIdx + 1}</strong>–<strong style={{ color: '#0F172A' }}>{projEndIdx}</strong> of{' '}
                  <strong style={{ color: '#0F172A' }}>{totalProjectLeads}</strong> leads
                  {totalProjPages > 1 && (
                    <span style={{ marginLeft: '8px', color: '#94A3B8' }}>
                      (Page {safeProjCurrentPage} of {totalProjPages})
                    </span>
                  )}
                </div>

                {totalProjPages > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      disabled={safeProjCurrentPage === 1}
                      onClick={(e) => goToProjPage(e, Math.max(1, safeProjCurrentPage - 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeProjCurrentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                        color: safeProjCurrentPage === 1 ? '#94A3B8' : '#334155',
                        cursor: safeProjCurrentPage === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: totalProjPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === safeProjCurrentPage;
                      return (
                        <button
                          key={pageNo}
                          type="button"
                          onClick={(e) => goToProjPage(e, pageNo)}
                          style={{
                            width: '34px',
                            height: '34px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            borderRadius: '6px',
                            border: isActive ? '1px solid #14A750' : '1px solid #CBD5E1',
                            background: isActive ? '#14A750' : '#FFFFFF',
                            color: isActive ? '#FFFFFF' : '#334155',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {pageNo}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={safeProjCurrentPage === totalProjPages}
                      onClick={(e) => goToProjPage(e, Math.min(totalProjPages, safeProjCurrentPage + 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeProjCurrentPage === totalProjPages ? '#F8FAFC' : '#FFFFFF',
                        color: safeProjCurrentPage === totalProjPages ? '#94A3B8' : '#334155',
                        cursor: safeProjCurrentPage === totalProjPages ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {tab === 'applications' && (
          <>
            {/* Job Applications Header & Action Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                  Total Applications:
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#14A750',
                  }}
                >
                  {applications.length}
                </span>
                {appSearch.trim() && (
                  <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '4px' }}>
                    ({totalApplications} matching)
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '280px' }}>
                  <input
                    style={{
                      ...ui.input,
                      width: '100%',
                      paddingRight: appSearch ? '28px' : '10px',
                      margin: 0,
                    }}
                    placeholder="Search name, position, email, phone..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                  />
                  {appSearch && (
                    <button
                      type="button"
                      onClick={() => setAppSearch('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '2px',
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  style={{
                    ...ui.btnGreen,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setExportCategory('application');
                    const stored = typeof window !== 'undefined' ? localStorage.getItem('propkads_last_app_export') : null;
                    if (stored) {
                      setLastAppExportedAt(stored);
                      const newCount = applications.filter((l) => new Date(l.created_at) > new Date(stored)).length;
                      if (newCount === 0) setExportScope('all');
                      else setExportScope('new');
                    } else {
                      setExportScope('new');
                    }
                    setShowExportModal(true);
                  }}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Clean Full-Width Applications Table (100% Fit, Zero Overflow) */}
            <div style={{ overflowX: 'auto', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <table style={{ ...ui.table, width: '100%', minWidth: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ ...ui.th, width: '19%' }}>Candidate Name</th>
                    <th style={{ ...ui.th, width: '18%' }}>Position Applied</th>
                    <th style={{ ...ui.th, width: '15%' }}>Phone / WhatsApp</th>
                    <th style={{ ...ui.th, width: '18%' }}>Email Address</th>
                    <th style={{ ...ui.th, width: '18%' }}>Portfolio / CV</th>
                    <th style={{ ...ui.th, width: '12%' }}>Applied Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplications.map((app) => (
                    <tr
                      key={app.id}
                      style={{ cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                      onClick={() => openApplication(app)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A', whiteSpace: 'normal', maxWidth: '160px' }}>
                        {app.full_name}
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'normal' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: '600',
                            color: '#0F172A',
                            background: '#F1F5F9',
                            padding: '3px 8px',
                            borderRadius: '5px',
                            border: '1px solid #E2E8F0',
                            whiteSpace: 'normal',
                            display: 'inline-block',
                            lineHeight: 1.3,
                            maxWidth: '150px',
                          }}
                        >
                          {app.position || 'General'}
                        </span>
                      </td>
                      <td style={{ ...ui.td, fontFamily: 'monospace', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap' }}>
                        {app.phone}
                      </td>
                      <td style={{ ...ui.td, color: '#0284C7', fontSize: '12.5px', whiteSpace: 'normal', wordBreak: 'break-all', maxWidth: '160px' }}>
                        {app.email}
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'nowrap' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          {app.has_resume ? (
                            <a
                              href={`/api/admin/applications/download?id=${app.id}`}
                              download
                              title="Download Candidate CV"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '3px',
                                background: '#14A750',
                                color: '#FFFFFF',
                                border: 'none',
                                padding: '3px 7px',
                                borderRadius: '4px',
                                fontSize: '11px',
                                fontWeight: '700',
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                              }}
                            >
                              <span>📄 CV</span>
                            </a>
                          ) : null}
                          {app.portfolio_link ? (
                            <a
                              href={app.portfolio_link.startsWith('http') ? app.portfolio_link : `https://${app.portfolio_link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: '#14A750',
                                fontWeight: '600',
                                fontSize: '11px',
                                textDecoration: 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '2px',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              <span>Link ↗</span>
                            </a>
                          ) : null}
                          {!app.has_resume && !app.portfolio_link && (
                            <span style={{ color: '#94A3B8', fontSize: '11.5px' }}>—</span>
                          )}
                        </div>
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'nowrap' }}>
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {totalApplications === 0 && (
                    <tr>
                      <td colSpan={6} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8', padding: '36px' }}>
                        No job applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls (20 applications per page) */}
            {totalApplications > 0 && (
              <div
                ref={appPaginationRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  padding: '12px 18px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Showing <strong style={{ color: '#0F172A' }}>{appStartIdx + 1}</strong>–<strong style={{ color: '#0F172A' }}>{appEndIdx}</strong> of{' '}
                  <strong style={{ color: '#0F172A' }}>{totalApplications}</strong> applications
                  {totalAppPages > 1 && (
                    <span style={{ marginLeft: '8px', color: '#94A3B8' }}>
                      (Page {safeAppCurrentPage} of {totalAppPages})
                    </span>
                  )}
                </div>

                {totalAppPages > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      disabled={safeAppCurrentPage === 1}
                      onClick={(e) => goToAppPage(e, Math.max(1, safeAppCurrentPage - 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeAppCurrentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                        color: safeAppCurrentPage === 1 ? '#94A3B8' : '#334155',
                        cursor: safeAppCurrentPage === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: totalAppPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === safeAppCurrentPage;
                      return (
                        <button
                          key={pageNo}
                          type="button"
                          onClick={(e) => goToAppPage(e, pageNo)}
                          style={{
                            width: '34px',
                            height: '34px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            borderRadius: '6px',
                            border: isActive ? '1px solid #14A750' : '1px solid #CBD5E1',
                            background: isActive ? '#14A750' : '#FFFFFF',
                            color: isActive ? '#FFFFFF' : '#334155',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {pageNo}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={safeAppCurrentPage === totalAppPages}
                      onClick={(e) => goToAppPage(e, Math.min(totalAppPages, safeAppCurrentPage + 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeAppCurrentPage === totalAppPages ? '#F8FAFC' : '#FFFFFF',
                        color: safeAppCurrentPage === totalAppPages ? '#94A3B8' : '#334155',
                        cursor: safeAppCurrentPage === totalAppPages ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {tab === 'blogs' && (
          <>
            {/* Clean Single-Line Header Bar & Action Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                    Total Articles:
                  </span>
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#14A750',
                    }}
                  >
                    {blogs.length}
                  </span>
                  {(blogSearch.trim() || blogPlacementFilter) && (
                    <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '4px' }}>
                      ({totalBlogs} matching)
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#166534', background: '#DCFCE7', padding: '3px 8px', borderRadius: '4px' }}>
                    ★ Main: {blogs.filter((b) => b.isFeatured).length}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#0369A1', background: '#E0F2FE', padding: '3px 8px', borderRadius: '4px' }}>
                    🔥 Trending: {blogs.filter((b) => b.isTrending).length}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', background: '#F1F5F9', padding: '3px 8px', borderRadius: '4px' }}>
                    📰 Grid: {blogs.filter((b) => !b.isFeatured && !b.isTrending).length}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '250px' }}>
                  <input
                    style={{
                      ...ui.input,
                      width: '100%',
                      paddingRight: blogSearch ? '28px' : '10px',
                      margin: 0,
                    }}
                    placeholder="Search title or summary..."
                    value={blogSearch}
                    onChange={(e) => setBlogSearch(e.target.value)}
                  />
                  {blogSearch && (
                    <button
                      type="button"
                      onClick={() => setBlogSearch('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '2px',
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <select
                  style={{ ...ui.select, margin: 0, height: '38px', fontSize: '13px' }}
                  value={blogPlacementFilter}
                  onChange={(e) => setBlogPlacementFilter(e.target.value)}
                >
                  <option value="">All Placements</option>
                  <option value="featured">★ Main Featured</option>
                  <option value="trending">🔥 Trending Stack</option>
                  <option value="grid">📰 Regular Grid</option>
                </select>

                <button
                  type="button"
                  style={{
                    ...ui.btnGreen,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={openNewBlogModal}
                >
                  + Add New Article
                </button>

                <a
                  href="/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...ui.btnGhost,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View Live News Page ↗
                </a>
              </div>
            </div>

            {/* Clean Full-Width Real Estate Articles Table (100% Fit, No Bottom Scrollbar Needed) */}
            <div style={{ overflowX: 'auto', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <table style={{ ...ui.table, minWidth: '100%', width: '100%', tableLayout: 'auto' }}>
                <thead>
                  <tr>
                    <th style={{ ...ui.th, width: '68px', minWidth: '68px' }}>Cover</th>
                    <th style={{ ...ui.th, width: 'auto' }}>Article Title & Summary</th>
                    <th style={{ ...ui.th, width: '140px', minWidth: '130px' }}>Placement</th>
                    <th style={{ ...ui.th, width: '115px', minWidth: '105px' }}>Date / Read</th>
                    <th
                      style={{
                        ...ui.th,
                        width: '140px',
                        minWidth: '130px',
                        textAlign: 'right',
                        paddingRight: '18px',
                        position: 'sticky',
                        right: 0,
                        background: '#F8FAFC',
                        zIndex: 2,
                        boxShadow: '-3px 0 6px rgba(0,0,0,0.04)',
                      }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedBlogs.map((b) => (
                    <tr
                      key={b.id}
                      style={{ transition: 'background-color 0.15s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      <td style={{ ...ui.td, width: '68px' }}>
                        {b.image ? (
                          <img
                            src={b.image}
                            alt=""
                            style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E2E8F0', display: 'block' }}
                          />
                        ) : (
                          <div style={{ width: '56px', height: '42px', background: '#F1F5F9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#94A3B8', border: '1px solid #E2E8F0' }}>
                            No Img
                          </div>
                        )}
                      </td>
                      <td style={{ ...ui.td, whiteSpace: 'normal', minWidth: '240px' }}>
                        <div style={{ fontWeight: '600', color: '#0F172A', fontSize: '13.5px', marginBottom: '4px', lineHeight: 1.35, whiteSpace: 'normal' }}>
                          {b.title}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#64748B',
                            lineHeight: 1.4,
                            maxHeight: '34px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'normal',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {b.excerpt || 'No summary excerpt provided.'}
                        </div>
                      </td>
                      <td style={{ ...ui.td, width: '140px', whiteSpace: 'nowrap' }}>
                        {b.isFeatured ? (
                          <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#166534' }}>
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
                      <td style={{ ...ui.td, width: '115px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: '600' }}>{b.date || '—'}</div>
                        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{b.readTime || '—'}</div>
                      </td>
                      <td
                        style={{
                          ...ui.td,
                          width: '140px',
                          textAlign: 'right',
                          paddingRight: '18px',
                          whiteSpace: 'nowrap',
                          position: 'sticky',
                          right: 0,
                          background: '#FFFFFF',
                          zIndex: 1,
                          boxShadow: '-3px 0 6px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            type="button"
                            style={{ ...ui.btnGhost, padding: '5px 12px', fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => openEditBlogModal(b)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            style={{ ...ui.btnDanger, padding: '5px 12px', fontSize: '12px', cursor: 'pointer' }}
                            onClick={() => promptDeleteBlog(b)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {totalBlogs === 0 && (
                    <tr>
                      <td colSpan={5} style={{ ...ui.td, textAlign: 'center', color: '#94A3B8', padding: '36px' }}>
                        No articles found. Click "+ Add New Article" to post your first real estate update.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Blogs Pagination Controls (20 articles per page) */}
            {totalBlogs > 0 && (
              <div
                ref={blogPaginationRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  padding: '12px 18px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Showing <strong style={{ color: '#0F172A' }}>{blogStartIdx + 1}</strong>–<strong style={{ color: '#0F172A' }}>{blogEndIdx}</strong> of{' '}
                  <strong style={{ color: '#0F172A' }}>{totalBlogs}</strong> articles
                  {totalBlogPages > 1 && (
                    <span style={{ marginLeft: '8px', color: '#94A3B8' }}>
                      (Page {safeBlogCurrentPage} of {totalBlogPages})
                    </span>
                  )}
                </div>

                {totalBlogPages > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      disabled={safeBlogCurrentPage === 1}
                      onClick={(e) => goToBlogPage(e, Math.max(1, safeBlogCurrentPage - 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeBlogCurrentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                        color: safeBlogCurrentPage === 1 ? '#94A3B8' : '#334155',
                        cursor: safeBlogCurrentPage === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: totalBlogPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === safeBlogCurrentPage;
                      return (
                        <button
                          key={pageNo}
                          type="button"
                          onClick={(e) => goToBlogPage(e, pageNo)}
                          style={{
                            minWidth: '34px',
                            height: '34px',
                            padding: '0 8px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            borderRadius: '6px',
                            border: isActive ? '1px solid #14A750' : '1px solid #CBD5E1',
                            background: isActive ? '#14A750' : '#FFFFFF',
                            color: isActive ? '#FFFFFF' : '#334155',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {pageNo}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={safeBlogCurrentPage === totalBlogPages}
                      onClick={(e) => goToBlogPage(e, Math.min(totalBlogPages, safeBlogCurrentPage + 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeBlogCurrentPage === totalBlogPages ? '#F8FAFC' : '#FFFFFF',
                        color: safeBlogCurrentPage === totalBlogPages ? '#94A3B8' : '#334155',
                        cursor: safeBlogCurrentPage === totalBlogPages ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}



        {tab === 'newsletter' && (
          <>
            {/* Newsletter Header & Action Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>
                  Total Subscribers:
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#14A750',
                  }}
                >
                  {subscribers.length}
                </span>
                {newsSearch.trim() && (
                  <span style={{ fontSize: '13px', color: '#64748B', marginLeft: '4px' }}>
                    ({totalSubscribers} matching)
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', width: '280px' }}>
                  <input
                    style={{
                      ...ui.input,
                      width: '100%',
                      paddingRight: newsSearch ? '28px' : '10px',
                      margin: 0,
                    }}
                    placeholder="Search subscriber email..."
                    value={newsSearch}
                    onChange={(e) => setNewsSearch(e.target.value)}
                  />
                  {newsSearch && (
                    <button
                      type="button"
                      onClick={() => setNewsSearch('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '14px',
                        padding: '2px',
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  style={{
                    ...ui.btnGreen,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setExportCategory('newsletter');
                    const stored = typeof window !== 'undefined' ? localStorage.getItem('propkads_last_newsletter_export') : null;
                    if (stored) {
                      setLastNewsExportedAt(stored);
                      const newCount = subscribers.filter((l) => new Date(l.created_at) > new Date(stored)).length;
                      if (newCount === 0) setExportScope('all');
                      else setExportScope('new');
                    } else {
                      setExportScope('new');
                    }
                    setShowExportModal(true);
                  }}
                >
                  📥 Export CSV
                </button>
              </div>
            </div>

            {/* Clean Full-Width Subscribers Table */}
            <div style={{ overflowX: 'auto', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <table style={{ ...ui.table, minWidth: '100%', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ ...ui.th, width: '54%' }}>Subscriber Email</th>
                    <th style={{ ...ui.th, width: '23%' }}>Subscribed Date</th>
                    <th style={{ ...ui.th, width: '23%', textAlign: 'right', paddingRight: '18px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedSubscribers.map((s) => (
                    <tr
                      key={s.id}
                      style={{ transition: 'background-color 0.15s ease' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                    >
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A' }}>
                        <a
                          href={`mailto:${s.email}`}
                          style={{ color: '#0F172A', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          title="Send email"
                        >
                          <span>✉️</span>
                          <span>{s.email}</span>
                        </a>
                      </td>
                      <td style={ui.td}>
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ ...ui.td, textAlign: 'right', paddingRight: '18px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <button
                            type="button"
                            style={{
                              ...ui.btnGhost,
                              padding: '4px 10px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              background: copiedKey === `sub-${s.id}` ? '#DCFCE7' : '#FFFFFF',
                              borderColor: copiedKey === `sub-${s.id}` ? '#86EFAC' : '#CBD5E1',
                              color: copiedKey === `sub-${s.id}` ? '#15803D' : '#334155',
                              fontWeight: 600,
                              transition: 'all 0.15s ease',
                            }}
                            onClick={() => copyToClipboard(s.email, `sub-${s.id}`)}
                          >
                            {copiedKey === `sub-${s.id}` ? '✓ Copied' : '📋 Copy'}
                          </button>
                          <button
                            type="button"
                            style={{
                              ...ui.btnDanger,
                              padding: '4px 10px',
                              fontSize: '12px',
                              cursor: 'pointer',
                            }}
                            onClick={() => handleDeleteSubscriber(s)}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {totalSubscribers === 0 && (
                    <tr>
                      <td colSpan={3} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8', padding: '36px' }}>
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Newsletter Pagination Controls (20 subscribers per page) */}
            {totalSubscribers > 0 && (
              <div
                ref={newsPaginationRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  padding: '12px 18px',
                  background: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  Showing <strong style={{ color: '#0F172A' }}>{newsStartIdx + 1}</strong>–<strong style={{ color: '#0F172A' }}>{newsEndIdx}</strong> of{' '}
                  <strong style={{ color: '#0F172A' }}>{totalSubscribers}</strong> subscribers
                  {totalNewsPages > 1 && (
                    <span style={{ marginLeft: '8px', color: '#94A3B8' }}>
                      (Page {safeNewsCurrentPage} of {totalNewsPages})
                    </span>
                  )}
                </div>

                {totalNewsPages > 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button
                      type="button"
                      disabled={safeNewsCurrentPage === 1}
                      onClick={(e) => goToNewsPage(e, Math.max(1, safeNewsCurrentPage - 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeNewsCurrentPage === 1 ? '#F8FAFC' : '#FFFFFF',
                        color: safeNewsCurrentPage === 1 ? '#94A3B8' : '#334155',
                        cursor: safeNewsCurrentPage === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      ← Previous
                    </button>

                    {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map((pageNo) => {
                      const isActive = pageNo === safeNewsCurrentPage;
                      return (
                        <button
                          key={pageNo}
                          type="button"
                          onClick={(e) => goToNewsPage(e, pageNo)}
                          style={{
                            width: '34px',
                            height: '34px',
                            fontSize: '13px',
                            fontWeight: isActive ? 700 : 500,
                            borderRadius: '6px',
                            border: isActive ? '1px solid #14A750' : '1px solid #CBD5E1',
                            background: isActive ? '#14A750' : '#FFFFFF',
                            color: isActive ? '#FFFFFF' : '#334155',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {pageNo}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      disabled={safeNewsCurrentPage === totalNewsPages}
                      onClick={(e) => goToNewsPage(e, Math.min(totalNewsPages, safeNewsCurrentPage + 1))}
                      style={{
                        padding: '6px 14px',
                        fontSize: '13px',
                        fontWeight: 500,
                        borderRadius: '6px',
                        border: '1px solid #CBD5E1',
                        background: safeNewsCurrentPage === totalNewsPages ? '#F8FAFC' : '#FFFFFF',
                        color: safeNewsCurrentPage === totalNewsPages ? '#94A3B8' : '#334155',
                        cursor: safeNewsCurrentPage === totalNewsPages ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
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
                              background: '#F1F5F9',
                              color: u.role === 'admin' ? '#0F172A' : '#475569',
                              border: '1px solid #CBD5E1',
                              textTransform: 'uppercase',
                              letterSpacing: '0.03em',
                            }}
                          >
                            {u.role === 'admin' ? 'Primary Admin' : (u.designation || 'Team Member')}
                          </span>
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
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                              onClick={() => {
                                setEditingMember({
                                  ...u,
                                  permissions: Array.isArray(u.permissions)
                                    ? [...u.permissions]
                                    : (u.role === 'admin' ? ['all', ...AVAILABLE_PERMISSIONS.map((p) => p.key)] : []),
                                });
                                setEditMemberNewPassword('');
                                setShowSavedPassword(false);
                              }}
                            >
                              <span>🔑</span> View / Edit
                            </button>
                            <button
                              type="button"
                              style={{
                                background: '#F0FDF4',
                                color: '#16A34A',
                                border: '1px solid #BBF7D0',
                                padding: '6px 12px',
                                fontSize: '12px',
                                fontWeight: 600,
                                borderRadius: '5px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                              }}
                              onClick={() => shareMemberOnWhatsApp(u)}
                            >
                              <span>💬</span> WhatsApp
                            </button>
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
                              onClick={() => promptRemoveMember(u)}
                            >
                              Remove
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ overflowX: 'auto', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: 32 }}>
                <table style={{ ...ui.table, minWidth: '100%', width: '100%', tableLayout: 'auto' }}>
                  <thead>
                    <tr>
                      <th style={{ ...ui.th, width: '24%' }}>Member Name</th>
                      <th style={{ ...ui.th, width: '26%' }}>Email</th>
                      <th style={{ ...ui.th, width: '120px' }}>Role</th>
                      <th style={{ ...ui.th, width: 'auto' }}>Assigned Access</th>
                      <th
                        style={{
                          ...ui.th,
                          width: '190px',
                          minWidth: '185px',
                          textAlign: 'right',
                          paddingRight: '16px',
                          position: 'sticky',
                          right: 0,
                          background: '#F8FAFC',
                          zIndex: 2,
                          boxShadow: '-3px 0 6px rgba(0,0,0,0.03)',
                        }}
                      >
                        Actions
                      </th>
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
                        <tr
                          key={u.id}
                          style={{ transition: 'background-color 0.15s ease' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                        >
                          <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A', whiteSpace: 'normal' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: '#F1F5F9',
                                  color: '#334155',
                                  border: '1px solid #E2E8F0',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '11px',
                                  fontWeight: 700,
                                  flexShrink: 0,
                                }}
                              >
                                {(u.name || 'U').slice(0, 2).toUpperCase()}
                              </div>
                              <span>{u.name}</span>
                            </div>
                          </td>
                          <td style={{ ...ui.td, whiteSpace: 'normal', wordBreak: 'break-all' }}>
                            <a
                              href={`mailto:${u.email}`}
                              style={{ color: '#0F172A', textDecoration: 'none' }}
                              title="Send email"
                            >
                              {u.email}
                            </a>
                          </td>
                          <td style={{ ...ui.td, whiteSpace: 'nowrap' }}>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '4px',
                                background: '#F1F5F9',
                                color: u.role === 'admin' ? '#0F172A' : '#475569',
                                border: '1px solid #CBD5E1',
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em',
                                display: 'inline-block',
                              }}
                            >
                              {u.role === 'admin' ? 'Primary Admin' : (u.designation || 'Team Member')}
                            </span>
                          </td>
                          <td style={{ ...ui.td, maxWidth: 260, whiteSpace: 'normal' }}>
                            {hasAll ? (
                              <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#166534', display: 'inline-block' }}>
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
                                        color: '#334155',
                                        border: '1px solid #E2E8F0',
                                        display: 'inline-block',
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
                          <td
                            style={{
                              ...ui.td,
                              width: '190px',
                              minWidth: '185px',
                              textAlign: 'right',
                              whiteSpace: 'nowrap',
                              paddingRight: '16px',
                              position: 'sticky',
                              right: 0,
                              background: '#FFFFFF',
                              zIndex: 1,
                              boxShadow: '-3px 0 6px rgba(0,0,0,0.03)',
                            }}
                          >
                            {isCurrent ? (
                              <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 600, fontStyle: 'italic' }}>
                                You (Active)
                              </span>
                            ) : isProtected ? (
                              <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
                                Primary Admin
                              </span>
                            ) : (
                              <div style={{ display: 'inline-flex', gap: '5px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <button
                                  type="button"
                                  style={{
                                    background: '#F1F5F9',
                                    color: '#0F172A',
                                    border: '1px solid #CBD5E1',
                                    padding: '4px 8px',
                                    fontSize: '11.5px',
                                    fontWeight: 600,
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                  }}
                                  onClick={() => {
                                    setEditingMember({
                                      ...u,
                                      permissions: Array.isArray(u.permissions)
                                        ? [...u.permissions]
                                        : (u.role === 'admin' ? ['all', ...AVAILABLE_PERMISSIONS.map((p) => p.key)] : []),
                                    });
                                    setEditMemberNewPassword('');
                                    setShowSavedPassword(false);
                                  }}
                                  title="View details & saved password"
                                >
                                  <span>🔑</span> Edit
                                </button>
                                <button
                                  type="button"
                                  style={{
                                    background: '#F0FDF4',
                                    color: '#16A34A',
                                    border: '1px solid #BBF7D0',
                                    padding: '4px 8px',
                                    fontSize: '11.5px',
                                    fontWeight: 600,
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                  }}
                                  onClick={() => shareMemberOnWhatsApp(u)}
                                  title="Share login details via WhatsApp"
                                >
                                  <span>💬</span> WhatsApp
                                </button>
                                <button
                                  type="button"
                                  style={{
                                    ...ui.btnDanger,
                                    padding: '4px 8px',
                                    fontSize: '11.5px',
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => promptRemoveMember(u)}
                                >
                                  Remove
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
        <div style={ui.overlay} onClick={() => { setSelectedApp(null); setShowDeleteAppConfirm(false); }}>
          <div style={ui.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0F172A', fontWeight: 700 }}>Application Details</h3>
              <button
                type="button"
                onClick={() => { setSelectedApp(null); setShowDeleteAppConfirm(false); }}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
            
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
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>📄 {selectedApp.resume_name || 'Resume Attached'}</span>
                <a
                  href={`/api/admin/applications/download?id=${selectedApp.id}`}
                  download
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    fontSize: '12.5px',
                    fontWeight: '700',
                    borderRadius: '6px',
                    background: '#14A750',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    boxShadow: '0 1px 3px rgba(20, 167, 80, 0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#0F8F43')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#14A750')}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download CV</span>
                </a>
              </div>
            )}

            <label style={ui.label}>Candidate Message / Cover Note</label>
            <div style={{ fontSize: 13.5, lineHeight: 1.6, background: '#F8FAFC', padding: 14, borderRadius: 8, border: '1px solid #E2E8F0', maxHeight: 150, overflowY: 'auto', marginBottom: 24, whiteSpace: 'pre-wrap' }}>
              {selectedApp.message || 'No message provided by candidate.'}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                style={ui.btnDanger}
                onClick={() => deleteApplication(selectedApp)}
              >
                Delete Application
              </button>
              <button
                type="button"
                style={{ ...ui.btnGhost, marginLeft: 'auto' }}
                onClick={() => {
                  setSelectedApp(null);
                  setShowDeleteAppConfirm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal for Applications */}
      {showDeleteAppConfirm && selectedApp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
          onClick={() => {
            if (!isDeletingApp) setShowDeleteAppConfirm(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '420px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E2E8F0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                    Delete Application?
                  </h4>
                  <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteAppConfirm(false)}
                disabled={isDeletingApp}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
              Are you sure you want to permanently delete the job application for{' '}
              <strong style={{ color: '#0F172A' }}>{selectedApp.full_name}</strong> ({selectedApp.position || 'General'})?
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                disabled={isDeletingApp}
                style={{
                  padding: '9px 16px',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  cursor: isDeletingApp ? 'not-allowed' : 'pointer',
                  opacity: isDeletingApp ? 0.6 : 1,
                }}
                onClick={() => setShowDeleteAppConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingApp}
                style={{
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  cursor: isDeletingApp ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                  opacity: isDeletingApp ? 0.7 : 1,
                }}
                onClick={handleConfirmDeleteApp}
              >
                {isDeletingApp ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal for Real Estate Articles */}
      {showDeleteBlogConfirm && selectedBlogToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
          onClick={() => {
            if (!isDeletingBlog) setShowDeleteBlogConfirm(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E2E8F0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                    Delete Article?
                  </h4>
                  <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                    This article will be permanently removed from the website.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteBlogConfirm(false)}
                disabled={isDeletingBlog}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
              Are you sure you want to delete{' '}
              <strong style={{ color: '#0F172A' }}>"{selectedBlogToDelete.title}"</strong>? This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                disabled={isDeletingBlog}
                style={{
                  padding: '9px 16px',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  cursor: isDeletingBlog ? 'not-allowed' : 'pointer',
                  opacity: isDeletingBlog ? 0.6 : 1,
                }}
                onClick={() => setShowDeleteBlogConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingBlog}
                style={{
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  cursor: isDeletingBlog ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                  opacity: isDeletingBlog ? 0.7 : 1,
                }}
                onClick={handleConfirmDeleteBlog}
              >
                {isDeletingBlog ? 'Deleting...' : 'Yes, Delete Article'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal for Newsletter Subscribers */}
      {showDeleteSubscriberConfirm && selectedSubscriberToDelete && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
          onClick={() => {
            if (!isDeletingSubscriber) setShowDeleteSubscriberConfirm(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '420px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E2E8F0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                    Remove Subscriber?
                  </h4>
                  <p style={{ margin: '2px 0 0', fontSize: '12.5px', color: '#64748B' }}>
                    This email will be removed from your newsletter list.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteSubscriberConfirm(false)}
                disabled={isDeletingSubscriber}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <p style={{ margin: '0 0 20px', fontSize: '13.5px', color: '#334155', lineHeight: 1.5 }}>
              Are you sure you want to permanently remove{' '}
              <strong style={{ color: '#0F172A' }}>{selectedSubscriberToDelete.email}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                disabled={isDeletingSubscriber}
                style={{
                  padding: '9px 16px',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  cursor: isDeletingSubscriber ? 'not-allowed' : 'pointer',
                  opacity: isDeletingSubscriber ? 0.6 : 1,
                }}
                onClick={() => setShowDeleteSubscriberConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingSubscriber}
                style={{
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  cursor: isDeletingSubscriber ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                  opacity: isDeletingSubscriber ? 0.7 : 1,
                }}
                onClick={handleConfirmDeleteSubscriber}
              >
                {isDeletingSubscriber ? 'Removing...' : 'Yes, Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Remove Confirmation Modal for Team Members */}
      {showRemoveMemberModal && selectedMemberToRemove && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
          onClick={() => {
            if (!isRemovingMember) setShowRemoveMemberModal(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '430px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E2E8F0',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#FEE2E2',
                    color: '#DC2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#0F172A' }}>
                    {selectedMemberToRemove.status === 'pending' ? 'Cancel Invitation' : 'Remove Team Member'}
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: '13px', color: '#64748B' }}>
                    This action will revoke portal access.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowRemoveMemberModal(false)}
                disabled={isRemovingMember}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '18px',
              }}
            >
              <div style={{ fontSize: '13px', color: '#0F172A', fontWeight: 600 }}>
                {selectedMemberToRemove.name}
              </div>
              <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                {selectedMemberToRemove.email}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px' }}>
                Role / Designation: <strong style={{ color: '#475569' }}>{selectedMemberToRemove.role === 'admin' ? 'Primary Admin' : (selectedMemberToRemove.designation || 'Team Member')}</strong>
              </div>
            </div>

            <p style={{ margin: '0 0 20px', fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
              Are you sure you want to {selectedMemberToRemove.status === 'pending' ? 'cancel the invitation for' : 'remove'}{' '}
              <strong>{selectedMemberToRemove.name}</strong>?
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                disabled={isRemovingMember}
                style={{
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  cursor: isRemovingMember ? 'not-allowed' : 'pointer',
                  opacity: isRemovingMember ? 0.6 : 1,
                }}
                onClick={() => setShowRemoveMemberModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isRemovingMember}
                style={{
                  padding: '9px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  cursor: isRemovingMember ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                  opacity: isRemovingMember ? 0.7 : 1,
                }}
                onClick={handleConfirmRemoveMember}
              >
                {isRemovingMember ? 'Removing...' : selectedMemberToRemove.status === 'pending' ? 'Yes, Cancel Invite' : 'Yes, Remove Member'}
              </button>
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
              style={{ ...ui.selectInput, marginBottom: 14 }}
              value={selectedBlog.placement}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, placement: e.target.value })}
            >
              <option value="featured">★ Main Featured Story</option>
              <option value="trending">🔥 Trending Story</option>
              <option value="grid">📰 Regular Grid Article</option>
            </select>

            <label style={ui.label}>Article Title *</label>
            <input
              style={ui.fieldInput}
              placeholder="Enter article title..."
              value={selectedBlog.title || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
            />

            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11.5px', color: '#64748B' }}>
              <span>
                📅 Date: <strong style={{ color: '#0F172A' }}>{selectedBlog.date || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</strong> <span style={{ color: '#16A34A', fontWeight: 600 }}>(Auto)</span>
              </span>
              <span>&bull;</span>
              <span>
                ⚡ Read Time: <span style={{ color: '#16A34A', fontWeight: 600 }}>Auto-Calculated</span>
              </span>
            </div>

            <div style={{ marginTop: 14, padding: '12px 14px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <label style={{ ...ui.label, marginTop: 0, marginBottom: 8 }}>Cover Image</label>
              {selectedBlog.image && (
                <div style={{ marginBottom: 10 }}>
                  <img
                    src={selectedBlog.image}
                    alt="Preview"
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #CBD5E1', display: 'block' }}
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

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBlogImageUpload}
                  style={{ fontSize: '12.5px', color: '#475569' }}
                />
              </div>
            </div>

            <label style={ui.label}>Short Summary</label>
            <textarea
              style={{ ...ui.fieldInput, minHeight: '65px', lineHeight: 1.45, fontFamily: 'inherit' }}
              placeholder="Brief 1-2 sentence overview..."
              value={selectedBlog.excerpt || ''}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, excerpt: e.target.value })}
            />

            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label style={{ ...ui.label, margin: 0 }}>Full Article Content</label>
                <span style={{ fontSize: '11px', color: '#64748B' }}>HTML Supported</span>
              </div>
              <textarea
                style={{
                  ...ui.fieldInput,
                  minHeight: '220px',
                  lineHeight: 1.55,
                  fontFamily: 'inherit',
                  borderRadius: '6px',
                  marginTop: 0,
                }}
                placeholder="Write article content or paste HTML here..."
                value={selectedBlog.fullContent || ''}
                onChange={(e) => setSelectedBlog({ ...selectedBlog, fullContent: e.target.value })}
              />
            </div>

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
        <div style={ui.overlay} onClick={() => { setSelected(null); setShowDeleteConfirm(false); }}>
          <div style={ui.modal} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#0F172A', fontWeight: 700 }}>
                {selected.lead_category === 'project' ? 'Project Buyer Lead Details' : 'Client Lead Details'}
              </h3>
              <button
                type="button"
                onClick={() => { setSelected(null); setShowDeleteConfirm(false); }}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

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
                <select
                  style={ui.selectInput}
                  value={selected.inventory_type || ''}
                  onChange={(e) => setSelected({ ...selected, inventory_type: e.target.value })}
                >
                  <option value="">Select Property Type</option>
                  {(() => {
                    const list = [...CLIENT_PROPERTY_TYPES];
                    if (selected.inventory_type && !list.includes(selected.inventory_type)) {
                      list.unshift(selected.inventory_type);
                    }
                    return list.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ));
                  })()}
                </select>
              </>
            )}

            <label style={ui.label}>Phone Number</label>
            <input style={ui.fieldInput} value={selected.phone || ''}
              onChange={(e) => setSelected({ ...selected, phone: e.target.value })} />

            <label style={ui.label}>City / Country</label>
            <input style={ui.fieldInput} value={selected.city || ''}
              onChange={(e) => setSelected({ ...selected, city: e.target.value })} />

            {selected.created_at && (
              <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748B' }}>
                📅 Submitted on: {new Date(selected.created_at).toLocaleString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button style={ui.btnGreen} onClick={saveLead}>Save Changes</button>
              <button style={ui.btnDanger} onClick={deleteLead}>Delete Lead</button>
              <button
                style={{ ...ui.btnGhost, marginLeft: 'auto' }}
                onClick={() => {
                  setSelected(null);
                  setShowDeleteConfirm(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {showDeleteConfirm && selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
          onClick={() => {
            if (!isDeletingLead) setShowDeleteConfirm(false);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              width: '430px',
              maxWidth: '92vw',
              borderRadius: '12px',
              padding: '24px 26px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
              border: '1px solid #F1F5F9',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0,
                  }}
                >
                  ⚠️
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A', fontWeight: 700 }}>
                    Delete Lead?
                  </h3>
                  <p style={{ margin: '8px 0 0', fontSize: '13.5px', color: '#64748B', lineHeight: 1.5 }}>
                    Are you sure you want to permanently delete the lead for{' '}
                    <strong style={{ color: '#0F172A' }}>{selected.full_name}</strong>
                    {selected.company_name ? ` (${selected.company_name})` : ''}?
                  </p>
                  <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#EF4444', fontWeight: 600 }}>
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeletingLead}
                style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
              <button
                type="button"
                disabled={isDeletingLead}
                style={{
                  padding: '9px 16px',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  borderRadius: '6px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  color: '#475569',
                  cursor: isDeletingLead ? 'not-allowed' : 'pointer',
                  opacity: isDeletingLead ? 0.6 : 1,
                }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingLead}
                style={{
                  padding: '9px 18px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: '#DC2626',
                  color: '#FFFFFF',
                  cursor: isDeletingLead ? 'not-allowed' : 'pointer',
                  boxShadow: '0 1px 3px rgba(220, 38, 38, 0.3)',
                  opacity: isDeletingLead ? 0.7 : 1,
                }}
                onClick={handleConfirmDeleteLead}
              >
                {isDeletingLead ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clean & Simple Export Modal */}
      {showExportModal && (
        <div style={ui.overlay} onClick={() => setShowExportModal(false)}>
          <div style={{ ...ui.modal, width: '400px', maxWidth: '95vw', padding: '22px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 17, color: '#0F172A', fontWeight: 700 }}>
                {exportCategory === 'project'
                  ? 'Export Project Leads'
                  : exportCategory === 'application'
                  ? 'Export Job Applications'
                  : exportCategory === 'newsletter'
                  ? 'Export Subscribers'
                  : 'Export Client Leads'}
              </h3>
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '18px',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Simple Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Option 1: New Only */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: exportScope === 'new' ? '1.5px solid #14A750' : '1px solid #E2E8F0',
                  background: exportScope === 'new' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="exportScope"
                    checked={exportScope === 'new'}
                    onChange={() => setExportScope('new')}
                    style={{ accentColor: '#14A750', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>
                    New Only
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: newLeadsSinceLastExport.length > 0 ? '#DCFCE7' : '#F1F5F9',
                    color: newLeadsSinceLastExport.length > 0 ? '#15803D' : '#64748B',
                  }}
                >
                  {newLeadsSinceLastExport.length} new
                </span>
              </label>

              {/* Option 2: Date Range */}
              <label
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: exportScope === 'range' ? '1.5px solid #14A750' : '1px solid #E2E8F0',
                  background: exportScope === 'range' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="radio"
                      name="exportScope"
                      checked={exportScope === 'range'}
                      onChange={() => setExportScope('range')}
                      style={{ accentColor: '#14A750', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>
                      Date Range
                    </span>
                  </div>
                  {exportScope === 'range' && (
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: '#DCFCE7',
                        color: '#15803D',
                      }}
                    >
                      {leadsInRange.length} selected
                    </span>
                  )}
                </div>

                {exportScope === 'range' && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      paddingTop: '8px',
                      borderTop: '1px solid #E2E8F0',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>From</span>
                      <input
                        type="date"
                        style={{ ...ui.fieldInput, margin: 0, padding: '5px 8px', fontSize: '12px' }}
                        value={exportFromDate}
                        onChange={(e) => setExportFromDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginBottom: '2px' }}>To</span>
                      <input
                        type="date"
                        style={{ ...ui.fieldInput, margin: 0, padding: '5px 8px', fontSize: '12px' }}
                        value={exportToDate}
                        onChange={(e) => setExportToDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Option 3: All Records */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: exportScope === 'all' ? '1.5px solid #14A750' : '1px solid #E2E8F0',
                  background: exportScope === 'all' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="radio"
                    name="exportScope"
                    checked={exportScope === 'all'}
                    onChange={() => setExportScope('all')}
                    style={{ accentColor: '#14A750', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0F172A' }}>
                    All Records
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: '#F1F5F9',
                    color: '#475569',
                  }}
                >
                  {activeExportPool.length} total
                </span>
              </label>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: 10, marginTop: 18, alignItems: 'center' }}>
              <button
                type="button"
                style={{
                  ...ui.btnGreen,
                  flex: 1,
                  padding: '9px 16px',
                  fontSize: '13px',
                  fontWeight: 700,
                  opacity: readyToExportCount === 0 ? 0.6 : 1,
                  cursor: readyToExportCount === 0 ? 'not-allowed' : 'pointer',
                }}
                disabled={readyToExportCount === 0}
                onClick={triggerExport}
              >
                Download CSV ({readyToExportCount})
              </button>
              <button
                type="button"
                style={{ ...ui.btnGhost, padding: '9px 16px', fontSize: '13px' }}
                onClick={() => setShowExportModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editingMember && (
        <div style={ui.overlay} onClick={() => { setEditingMember(null); setEditMemberNewPassword(''); setShowSavedPassword(false); }}>
          <div style={{ ...ui.modal, width: '460px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 17, color: '#0F172A', fontWeight: 700 }}>
                  Team Member Details & Access
                </h3>
                <p style={{ margin: '3px 0 0 0', fontSize: 12.5, color: '#64748B' }}>
                  {editingMember.name || 'Team Member'} &bull; <span style={{ color: '#0F172A', fontWeight: 600 }}>{editingMember.email}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setEditingMember(null); setEditMemberNewPassword(''); setShowSavedPassword(false); }}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8' }}
              >
                ✕
              </button>
            </div>

            {/* Saved Password Vault Section */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Current Saved Password:
                </span>
                <span style={{ fontSize: '11px', color: '#16A34A', background: '#DCFCE7', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                  Admin Vault
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', padding: '7px 10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
                <div style={{ flex: 1, fontFamily: showSavedPassword ? 'monospace' : 'inherit', fontSize: '13.5px', fontWeight: 700, color: showSavedPassword ? '#0F172A' : '#94A3B8', letterSpacing: showSavedPassword ? '0.05em' : '0.2em' }}>
                  {showSavedPassword
                    ? (editingMember.initial_password || editingMember.password || 'Not Set')
                    : '••••••••••••'}
                </div>
                <button
                  type="button"
                  onClick={() => setShowSavedPassword(!showSavedPassword)}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    borderRadius: '5px',
                    padding: '4px 8px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#334155',
                  }}
                >
                  {showSavedPassword ? '🙈 Hide' : '👁️ Show'}
                </button>
                <button
                  type="button"
                  onClick={() => copyToClipboard(editingMember.initial_password || editingMember.password || '', `vault-${editingMember.id}`)}
                  style={{
                    background: copiedKey === `vault-${editingMember.id}` ? '#DCFCE7' : '#F0FDF4',
                    border: copiedKey === `vault-${editingMember.id}` ? '1px solid #86EFAC' : '1px solid #BBF7D0',
                    borderRadius: '5px',
                    padding: '4px 8px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#15803D',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {copiedKey === `vault-${editingMember.id}` ? 'Copied ✓' : '📋 Copy'}
                </button>
              </div>
            </div>

            {/* Member Role / Designation */}
            {editingMember.email?.toLowerCase() !== 'khurram@propkads.com' && (
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#334155', display: 'block', marginBottom: 4 }}>
                  Role / Designation
                </label>
                <input
                  style={{ ...ui.input, width: '100%' }}
                  placeholder="e.g. Sales Executive, Email Marketer"
                  value={editingMember.designation || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                />
              </div>
            )}

            {/* Reset / Set New Password Section */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>
                  Set New Password (Optional)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
                    let pass = '';
                    for (let i = 0; i < 10; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length));
                    setEditMemberNewPassword(pass);
                  }}
                  style={{
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    color: '#15803D',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '4px',
                    padding: '2px 8px',
                    cursor: 'pointer',
                  }}
                >
                  ⚡ Suggest New
                </button>
              </div>
              <input
                style={{ ...ui.input, width: '100%' }}
                type="text"
                placeholder="Leave blank to keep existing password"
                value={editMemberNewPassword}
                onChange={(e) => setEditMemberNewPassword(e.target.value)}
              />
            </div>

            {/* Assigned Sections */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#334155' }}>Assigned Section Access</span>
                <button
                  type="button"
                  onClick={() => toggleEditingPerm('all')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#14A750',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {editingMember.permissions?.includes('all') || editingMember.permissions?.length === AVAILABLE_PERMISSIONS.length
                    ? 'Deselect All'
                    : 'Select All / Full Access'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '6px' }}>
                {AVAILABLE_PERMISSIONS.map((perm) => {
                  const isChecked = editingMember.permissions?.includes('all') || editingMember.permissions?.includes(perm.key);
                  return (
                    <label
                      key={perm.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: 12.5,
                        padding: '7px 10px',
                        borderRadius: '6px',
                        background: isChecked ? '#F0FDF4' : '#F8FAFC',
                        border: isChecked ? '1px solid #86EFAC' : '1px solid #E2E8F0',
                        cursor: 'pointer',
                        color: isChecked ? '#15803D' : '#475569',
                        fontWeight: isChecked ? 600 : 500,
                        userSelect: 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(isChecked)}
                        onChange={() => toggleEditingPerm(perm.key)}
                        style={{ accentColor: '#16A34A', width: 15, height: 15, cursor: 'pointer' }}
                      />
                      <span>{perm.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <button
                style={{ ...ui.btnGreen, flex: 1.2, padding: '9px 16px', justifyContent: 'center' }}
                onClick={savePermissions}
                disabled={updatingPerms}
              >
                {updatingPerms ? 'Saving Changes...' : 'Save Changes'}
              </button>
              <button
                type="button"
                style={{
                  ...ui.btnGhost,
                  padding: '9px 14px',
                  color: '#16A34A',
                  borderColor: '#86EFAC',
                  background: '#F0FDF4',
                  fontWeight: 600,
                  fontSize: '12.5px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onClick={() => shareMemberOnWhatsApp({
                  ...editingMember,
                  password: editMemberNewPassword.trim() || editingMember.initial_password || editingMember.password,
                })}
              >
                <span>💬</span> WhatsApp
              </button>
              <button
                style={{ ...ui.btnGhost, padding: '9px 16px' }}
                onClick={() => { setEditingMember(null); setEditMemberNewPassword(''); setShowSavedPassword(false); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showShareModal && createdMemberData && (
        <div style={ui.overlay} onClick={() => { setShowShareModal(false); setCreatedMemberData(null); }}>
          <div style={{ ...ui.modal, width: '500px', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => { setShowShareModal(false); setCreatedMemberData(null); }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#94A3B8',
                padding: '0 4px',
                lineHeight: 1,
              }}
            >
              ✕
            </button>
            <div style={{ textAlign: 'center', marginBottom: '18px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  margin: '0 auto 10px',
                }}
              >
                ✓
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: '18px', color: '#0F172A', fontWeight: 700 }}>
                🎉 Team Member Account Active!
              </h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                Account for <strong>{createdMemberData.name}</strong> is created and ready for login.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
                Member Login Credentials:
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Portal Login URL:</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>https://propkads.com/admin</div>
                  </div>
                  <button
                    type="button"
                    style={{
                      ...ui.btnGhost,
                      padding: '5px 12px',
                      fontSize: '11.5px',
                      background: copiedKey === 'share-url' ? '#DCFCE7' : '#FFFFFF',
                      borderColor: copiedKey === 'share-url' ? '#86EFAC' : '#CBD5E1',
                      color: copiedKey === 'share-url' ? '#15803D' : '#334155',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                    }}
                    onClick={() => copyToClipboard('https://propkads.com/admin', 'share-url')}
                  >
                    {copiedKey === 'share-url' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Email:</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{createdMemberData.email}</div>
                  </div>
                  <button
                    type="button"
                    style={{
                      ...ui.btnGhost,
                      padding: '5px 12px',
                      fontSize: '11.5px',
                      background: copiedKey === 'share-email' ? '#DCFCE7' : '#FFFFFF',
                      borderColor: copiedKey === 'share-email' ? '#86EFAC' : '#CBD5E1',
                      color: copiedKey === 'share-email' ? '#15803D' : '#334155',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                    }}
                    onClick={() => copyToClipboard(createdMemberData.email, 'share-email')}
                  >
                    {copiedKey === 'share-email' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Role / Designation:</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                      {createdMemberData.designation || 'Team Member'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Password:</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#16A34A', fontFamily: 'monospace' }}>
                      {createdMemberData.password || createdMemberData.initial_password}
                    </div>
                  </div>
                  <button
                    type="button"
                    style={{
                      ...ui.btnGhost,
                      padding: '5px 12px',
                      fontSize: '11.5px',
                      background: copiedKey === 'share-password' ? '#DCFCE7' : '#FFFFFF',
                      borderColor: copiedKey === 'share-password' ? '#86EFAC' : '#CBD5E1',
                      color: copiedKey === 'share-password' ? '#15803D' : '#334155',
                      fontWeight: 600,
                      transition: 'all 0.15s ease',
                    }}
                    onClick={() => copyToClipboard(createdMemberData.password || createdMemberData.initial_password, 'share-password')}
                  >
                    {copiedKey === 'share-password' ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '11.5px', color: '#94A3B8', margin: '10px 0 0 0' }}>
                💡 Saved in your dashboard vault. You can view or reset this password anytime from the Team table.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={() => shareMemberOnWhatsApp(createdMemberData)}
                style={{
                  ...ui.btnGreen,
                  flex: 1.2,
                  justifyContent: 'center',
                  padding: '11px 16px',
                  fontSize: '13px',
                }}
              >
                💬 Send on WhatsApp
              </button>
              <button
                type="button"
                onClick={() => copyCredentialsText(createdMemberData, `creds-${createdMemberData.email}`)}
                style={{
                  ...ui.btnGhost,
                  flex: 1.1,
                  justifyContent: 'center',
                  padding: '11px 16px',
                  fontSize: '13px',
                  background: copiedKey === `creds-${createdMemberData.email}` ? '#DCFCE7' : '#FFFFFF',
                  borderColor: copiedKey === `creds-${createdMemberData.email}` ? '#86EFAC' : '#CBD5E1',
                  color: copiedKey === `creds-${createdMemberData.email}` ? '#15803D' : '#334155',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {copiedKey === `creds-${createdMemberData.email}` ? '✓ Copied to Clipboard!' : '📋 Copy All Details'}
              </button>
              <button
                type="button"
                style={{ ...ui.btnGhost, padding: '11px 18px', fontSize: '13px' }}
                onClick={() => { setShowShareModal(false); setCreatedMemberData(null); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddMemberModal && (
        <div style={ui.overlay} onClick={() => setShowAddMemberModal(false)}>
          <div style={{ ...ui.modal, width: '460px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 17, color: '#0F172A', fontWeight: 700 }}>
                Add New Team Member
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMemberModal(false)}
                style={{ background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#94A3B8', padding: '0 4px', lineHeight: 1 }}
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
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>
                  Role / Designation *
                </label>
                <input
                  style={{ ...ui.input, width: '100%' }}
                  placeholder="e.g. Sales Executive, Email Marketer"
                  required
                  value={newUser.designation}
                  onChange={(e) => setNewUser({ ...newUser, designation: e.target.value })}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>
                    Password *
                  </label>
                  <button
                    type="button"
                    onClick={generateStrongPassword}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#15803D',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    ⚡ Auto-generate
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    style={{ ...ui.input, width: '100%', paddingRight: '40px' }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    required
                    minLength={6}
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#475569' }}>
                    Access Permissions
                  </label>
                  <button
                    type="button"
                    onClick={() => toggleNewUserPerm('all')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#14A750',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {newUser.permissions?.includes('all') || newUser.permissions?.length === AVAILABLE_PERMISSIONS.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '6px' }}>
                  {AVAILABLE_PERMISSIONS.map((perm) => {
                    const isChecked = newUser.permissions?.includes('all') || newUser.permissions?.includes(perm.key);
                    return (
                      <label
                        key={perm.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '7px 10px',
                          borderRadius: '6px',
                          background: isChecked ? '#F0FDF4' : '#F8FAFC',
                          border: isChecked ? '1px solid #86EFAC' : '1px solid #E2E8F0',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: isChecked ? '#15803D' : '#475569',
                          fontWeight: isChecked ? 600 : 500,
                          userSelect: 'none',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(isChecked)}
                          onChange={() => toggleNewUserPerm(perm.key)}
                          style={{ accentColor: '#16A34A', width: 15, height: 15, cursor: 'pointer' }}
                        />
                        <span>{perm.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {teamError && <p style={{ color: '#B3261E', fontSize: 12.5, margin: 0 }}>{teamError}</p>}

              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button
                  style={{ ...ui.btnGreen, flex: 1, padding: '10px', borderRadius: '6px', justifyContent: 'center' }}
                  type="submit"
                >
                  Add Member
                </button>
                <button
                  type="button"
                  style={{ ...ui.btnGhost, padding: '10px 18px', borderRadius: '6px' }}
                  onClick={() => setShowAddMemberModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 99999,
            background: toast.type === 'error' ? '#EF4444' : '#10B981',
            color: '#FFFFFF',
            padding: '10px 22px',
            borderRadius: '8px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)',
            fontSize: '13.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <span>{toast.type === 'error' ? '⚠️' : '✓'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
