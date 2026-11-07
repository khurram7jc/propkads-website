'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = ['New', 'Contacted', 'Site Visit', 'Booked', 'Closed'];

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
  content: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
};

const ui = {
  layout: { display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, system-ui, sans-serif' },
  sidebar: (collapsed) => ({
    width: collapsed ? '68px' : '240px',
    background: '#0F172A',
    color: '#E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
    transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 40,
    borderRight: '1px solid #1E293B',
    userSelect: 'none',
    flexShrink: 0,
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
    background: '#FFFFFF',
    borderBottom: '1px solid #E2E8F0',
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    position: 'sticky',
    top: 0,
    zIndex: 30,
  },
  body: { padding: '28px 32px', flex: 1, overflowY: 'auto' },
  statRow: { display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' },
  statCard: { background: '#fff', border: '1px solid #E7E8EA', padding: '18px 22px', minWidth: 140 },
  statNum: { fontSize: 26, fontWeight: 700 },
  statLbl: { fontSize: 12, color: '#70757D', marginTop: 4 },
  toolbar: { display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' },
  input: { padding: '9px 12px', border: '1px solid #E7E8EA', fontSize: 13.5, minWidth: 220 },
  select: { padding: '9px 12px', border: '1px solid #E7E8EA', fontSize: 13.5 },
  table: { width: '100%', borderCollapse: 'collapse', background: '#fff', minWidth: 800 },
  th: { textAlign: 'left', padding: 10, fontSize: 12, color: '#70757D', borderBottom: '2px solid #E7E8EA', textTransform: 'uppercase' },
  td: { padding: 10, fontSize: 13.5, borderBottom: '1px solid #E7E8EA' },
  statusPill: (s) => ({
    fontSize: 11.5, fontWeight: 700, padding: '4px 10px', display: 'inline-block',
    background: s === 'Closed' ? '#E9F7EE' : s === 'Booked' ? '#E9F7EE' : s === 'New' ? '#F1F2F3' : '#FFF6E5',
    color: s === 'Closed' || s === 'Booked' ? '#14A750' : s === 'New' ? '#3F434A' : '#946200',
  }),
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

  // Client Leads state (Developers / Builders from Home & Contact Us)
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Project Leads state (Buyers / Investors per Project, e.g. Karachi Enclave)
  const [projectLeads, setProjectLeads] = useState([]);
  const [selectedProject, setSelectedProject] = useState('Karachi Enclave');
  const [projSearch, setProjSearch] = useState('');
  const [projUnitFilter, setProjUnitFilter] = useState('');
  const [projStatusFilter, setProjStatusFilter] = useState('');

  // Content state
  const [content, setContent] = useState([]);

  // Team state
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'team' });
  const [teamError, setTeamError] = useState('');

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
        if (d.success) setMe(d.user);
        else router.push('/admin');
      });
  }, []);

  useEffect(() => {
    if (!me) return;
    if (tab === 'leads') loadLeads();
    if (tab === 'project_leads') loadProjectLeads();
    if (tab === 'content') loadContent();
    if (tab === 'team' && me.role === 'admin') loadUsers();
    if (tab === 'newsletter') loadSubscribers();
    if (tab === 'applications') loadApplications();
    if (tab === 'blogs') loadBlogs();
  }, [tab, me]);

  useEffect(() => {
    if (!me) return;
    loadLeads();
    loadProjectLeads();
  }, [me]);

  const loadLeads = async () => {
    const params = new URLSearchParams();
    params.set('category', 'client');
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    const res = await fetch(`/api/admin/leads?${params.toString()}`);
    const d = await res.json();
    if (d.success) setLeads(d.leads);
  };

  const loadProjectLeads = async () => {
    const params = new URLSearchParams();
    params.set('category', 'project');
    const res = await fetch(`/api/admin/leads?${params.toString()}`);
    const d = await res.json();
    if (d.success) setProjectLeads(d.leads);
  };

  const loadContent = async () => {
    const res = await fetch('/api/admin/content');
    const d = await res.json();
    if (d.success) setContent(d.content);
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

  const openLead = async (lead) => {
    setSelected({ ...lead });
    const res = await fetch(`/api/admin/leads/notes?leadId=${lead.id}`);
    const d = await res.json();
    if (d.success) setNotes(d.notes);
  };

  const saveLead = async () => {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selected),
    });
    setSelected(null);
    loadLeads();
    loadProjectLeads();
  };

  const deleteLead = async () => {
    if (!confirm(`Delete the lead for "${selected.full_name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/leads?id=${selected.id}`, { method: 'DELETE' });
    setSelected(null);
    loadLeads();
    loadProjectLeads();
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    await fetch('/api/admin/leads/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId: selected.id, note: newNote }),
    });
    setNewNote('');
    const res = await fetch(`/api/admin/leads/notes?leadId=${selected.id}`);
    const d = await res.json();
    if (d.success) setNotes(d.notes);
  };

  const updateContentField = async (key, value) => {
    await fetch('/api/admin/content', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
  };

  const addTeamMember = async (e) => {
    e.preventDefault();
    setTeamError('');
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const d = await res.json();
    if (d.success) {
      setNewUser({ name: '', email: '', password: '', role: 'team' });
      loadUsers();
    } else {
      setTeamError(d.error || 'Could not add team member.');
    }
  };

  const removeTeamMember = async (id) => {
    if (!confirm('Remove this team member?')) return;
    await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
    loadUsers();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (!me) return null;

  const total = leads.length;
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const newThisWeek = leads.filter((l) => new Date(l.created_at).getTime() > weekAgo).length;
  const booked = leads.filter((l) => l.status === 'Booked').length;
  const closed = leads.filter((l) => l.status === 'Closed').length;

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
  const projNewThisWeek = scopedProjectLeads.filter((l) => new Date(l.created_at).getTime() > weekAgo).length;
  const projBooked = scopedProjectLeads.filter((l) => l.status === 'Booked').length;
  const projClosed = scopedProjectLeads.filter((l) => l.status === 'Closed').length;

  const navTabs = [
    { key: 'leads', label: 'Client Leads', icon: Icons.leads, badge: leads.length },
    { key: 'project_leads', label: 'Project Leads', icon: Icons.projectLeads, badge: projectLeads.length },
    { key: 'applications', label: 'Job Applications', icon: Icons.applications, badge: applications.length },
    { key: 'blogs', label: 'News & Blogs', icon: Icons.blogs, badge: blogs.length },
    { key: 'content', label: 'Site Content', icon: Icons.content },
    { key: 'newsletter', label: 'Newsletter', icon: Icons.newsletter, badge: subscribers.length },
    ...(me.role === 'admin' ? [{ key: 'team', label: 'Team Members', icon: Icons.team, badge: users.length }] : []),
  ];

  const currentTabObj = navTabs.find((t) => t.key === tab) || navTabs[0];

  return (
    <div style={ui.layout}>
      {/* WordPress-Style Left Sidebar */}
      <aside style={ui.sidebar(sidebarCollapsed)}>
        {/* Brand Header */}
        <div style={ui.sidebarHeader(sidebarCollapsed)}>
          {!sidebarCollapsed ? (
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

        {/* Collapse Toggle Arrow (Directly Below Logo) */}
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

        {/* Sidebar Navigation */}
        <nav style={ui.sidebarNav} aria-label="Admin Navigation">
          {navTabs.map((item) => {
            const isActive = tab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                style={ui.sidebarItem(isActive, sidebarCollapsed)}
                onClick={() => setTab(item.key)}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? '#FFFFFF' : '#94A3B8' }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <>
                    <span>{item.label}</span>
                    {typeof item.badge === 'number' && item.badge > 0 && (
                      <span style={ui.sidebarBadge}>{item.badge}</span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Profile */}
        <div style={ui.sidebarFooter}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', gap: '10px', padding: '6px 4px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#14A750', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>
              {(me.name || 'A')[0].toUpperCase()}
            </div>
            {!sidebarCollapsed && (
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {me.name === 'Khurram' ? 'Khurram Mushtaq' : me.name}
                </div>
                <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'capitalize' }}>
                  {me.role} Role
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Right Content Area */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navbar */}
        <header style={ui.topBar}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', color: '#64748B' }}>
              Dashboard / <strong style={{ color: '#0F172A', fontWeight: '700' }}>{currentTabObj.label}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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
                padding: '6px 12px',
                background: '#F1F5F9',
                borderRadius: '6px',
                fontWeight: '600',
              }}
            >
              <span>View Site</span>
              {Icons.external}
            </a>

            <button
              type="button"
              onClick={logout}
              style={{
                background: 'transparent',
                color: '#B3261E',
                border: '1px solid #FCA5A5',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {Icons.logout}
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main style={ui.body}>
        {tab === 'leads' && (
          <>
            <div style={ui.statRow}>
              <div style={ui.statCard}><div style={ui.statNum}>{total}</div><div style={ui.statLbl}>Total Client Leads</div></div>
              <div style={ui.statCard}><div style={ui.statNum}>{newThisWeek}</div><div style={ui.statLbl}>New This Week</div></div>
              <div style={ui.statCard}><div style={ui.statNum}>{booked}</div><div style={ui.statLbl}>Booked</div></div>
              <div style={ui.statCard}><div style={ui.statNum}>{closed}</div><div style={ui.statLbl}>Closed</div></div>
            </div>

            <div style={ui.toolbar}>
              <input
                style={ui.input}
                placeholder="Search name, phone, city, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadLeads()}
              />
              <select style={ui.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All Statuses</option>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button style={ui.btnGhost} onClick={loadLeads}>Apply</button>
              <a style={{ ...ui.btnGhost, marginLeft: 'auto', textDecoration: 'none' }} href="/api/admin/leads/export?category=client">Export CSV</a>
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
                    <th style={ui.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => openLead(l)}>
                      <td style={{ ...ui.td, fontWeight: 600, color: '#0F172A' }}>{l.full_name}</td>
                      <td style={ui.td}>{l.company_name || '—'}</td>
                      <td style={ui.td}>{l.phone}</td>
                      <td style={ui.td}>{l.city || '—'}</td>
                      <td style={ui.td}>{l.inventory_type || '—'}</td>
                      <td style={ui.td}><span style={ui.statusPill(l.status)}>{l.status}</span></td>
                      <td style={ui.td}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={7} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8' }}>No client leads found.</td></tr>
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
                <div style={ui.statLbl}>{selectedProject ? `${selectedProject} Leads` : 'Total Project Leads'}</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projNewThisWeek}</div>
                <div style={ui.statLbl}>New This Week</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projBooked}</div>
                <div style={ui.statLbl}>Booked Units</div>
              </div>
              <div style={ui.statCard}>
                <div style={ui.statNum}>{projClosed}</div>
                <div style={ui.statLbl}>Closed Deals</div>
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
                {STATUSES.map((s) => (
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

        {tab === 'content' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 700 }}>
            {content.map((item) => (
              <div key={item.key}>
                <label style={ui.label}>{item.key}</label>
                <textarea
                  defaultValue={item.value}
                  onBlur={(e) => updateContentField(item.key, e.target.value)}
                  style={{ ...ui.fieldInput, minHeight: 60, fontFamily: 'inherit', marginTop: 0 }}
                />
              </div>
            ))}
            <p style={{ fontSize: 12.5, color: '#94a3b8' }}>Click outside a field to save it automatically.</p>
          </div>
        )}

        {tab === 'newsletter' && (
          <div>
            <div style={ui.toolbar}>
              <span style={{ fontSize: 13.5, color: '#70757D' }}>{subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}</span>
              <a style={{ ...ui.btnGhost, marginLeft: 'auto' }} href="/api/admin/newsletter/export">Export CSV</a>
            </div>
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
        )}

        {tab === 'team' && me.role === 'admin' && (
          <div>
            <table style={{ ...ui.table, maxWidth: 700, marginBottom: 32 }}>
              <thead>
                <tr>
                  <th style={ui.th}>Name</th>
                  <th style={ui.th}>Email</th>
                  <th style={ui.th}>Role</th>
                  <th style={ui.th}></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={ui.td}>{u.name}</td>
                    <td style={ui.td}>{u.email}</td>
                    <td style={ui.td}>{u.role}</td>
                    <td style={ui.td}>
                      {u.id !== undefined && (
                        <button style={ui.btnDanger} onClick={() => removeTeamMember(u.id)}>Remove</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ fontSize: 15, marginBottom: 14 }}>Add Team Member</h3>
            <form onSubmit={addTeamMember} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 340 }}>
              <input style={ui.input} placeholder="Name" required value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
              <input style={ui.input} type="email" placeholder="Email" required value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              <input style={ui.input} type="password" placeholder="Temporary Password" required value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
              <select style={ui.select} value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="team">Team</option>
                <option value="admin">Admin</option>
              </select>
              {teamError && <p style={{ color: '#B3261E', fontSize: 13 }}>{teamError}</p>}
              <button style={ui.btnGreen} type="submit">Add Member</button>
            </form>
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
              style={ui.fieldInput}
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
                <select style={ui.fieldInput} value={selected.inventory_type || ''}
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
            <select style={ui.fieldInput} value={selected.status}
              onChange={(e) => setSelected({ ...selected, status: e.target.value })}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>

            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a style={{ ...ui.btnGhost, textAlign: 'center', flex: 1 }} href={`tel:${(selected.phone || '').replace(/\s/g, '')}`}>Call</a>
              <a style={{ ...ui.btnGhost, textAlign: 'center', flex: 1 }}
                href={`https://wa.me/${(selected.phone || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>

            <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #E7E8EA' }} />

            <label style={ui.label}>Follow-up Notes</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 160, overflowY: 'auto', marginBottom: 10 }}>
              {notes.map((n) => (
                <div key={n.id} style={{ fontSize: 13, background: '#F7F8F9', padding: 10 }}>
                  <div style={{ color: '#70757D', fontSize: 11, marginBottom: 4 }}>
                    {n.author_name || 'Team'} · {new Date(n.created_at).toLocaleString()}
                  </div>
                  {n.note}
                </div>
              ))}
              {notes.length === 0 && <p style={{ fontSize: 12.5, color: '#94a3b8' }}>No notes yet.</p>}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input style={{ ...ui.fieldInput, flex: 1 }} placeholder="Add a follow-up note..."
                value={newNote} onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addNote()} />
              <button style={ui.btnGhost} onClick={addNote}>Add</button>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
              <button style={ui.btnGreen} onClick={saveLead}>Save Changes</button>
              <button style={ui.btnDanger} onClick={deleteLead}>Delete Lead</button>
              <button style={{ ...ui.btnGhost, marginLeft: 'auto' }} onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
