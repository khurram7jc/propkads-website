'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = ['New', 'Contacted', 'Site Visit', 'Booked', 'Closed'];

const ui = {
  page: { fontFamily: 'Inter, system-ui, sans-serif', minHeight: '100vh', background: '#F7F8F9', color: '#1A1B1B' },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12,
    padding: '16px 32px', background: '#000000', color: '#fff',
  },
  tabBtn: (active) => ({
    background: active ? '#14A750' : 'transparent', color: '#fff', border: '1px solid #14A750',
    padding: '8px 16px', fontSize: 13, fontWeight: 600, marginRight: 10,
  }),
  logoutBtn: { background: 'transparent', color: '#F3A3A3', border: '1px solid #F3A3A3', padding: '8px 16px', fontSize: 13 },
  body: { padding: '28px 32px' },
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

  // Leads state
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Content state
  const [content, setContent] = useState([]);

  // Team state
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'team' });
  const [teamError, setTeamError] = useState('');

  // Newsletter state
  const [subscribers, setSubscribers] = useState([]);

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
    if (tab === 'content') loadContent();
    if (tab === 'team' && me.role === 'admin') loadUsers();
    if (tab === 'newsletter') loadSubscribers();
  }, [tab, me]);

  const loadLeads = async () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);
    const res = await fetch(`/api/admin/leads?${params.toString()}`);
    const d = await res.json();
    if (d.success) setLeads(d.leads);
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
  };

  const deleteLead = async () => {
    if (!confirm(`Delete the lead for "${selected.full_name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/leads?id=${selected.id}`, { method: 'DELETE' });
    setSelected(null);
    loadLeads();
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

  return (
    <div style={ui.page}>
      <header style={ui.header}>
        <strong>
          Prop<span style={{ color: '#3ED17A' }}>K</span>ads Admin — {me.name} ({me.role})
        </strong>
        <div>
          <button style={ui.tabBtn(tab === 'leads')} onClick={() => setTab('leads')}>Leads</button>
          <button style={ui.tabBtn(tab === 'content')} onClick={() => setTab('content')}>Content</button>
          <button style={ui.tabBtn(tab === 'newsletter')} onClick={() => setTab('newsletter')}>Newsletter</button>
          {me.role === 'admin' && <button style={ui.tabBtn(tab === 'team')} onClick={() => setTab('team')}>Team</button>}
          <button style={ui.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </header>

      <div style={ui.body}>
        {tab === 'leads' && (
          <>
            <div style={ui.statRow}>
              <div style={ui.statCard}><div style={ui.statNum}>{total}</div><div style={ui.statLbl}>Total Leads</div></div>
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
              <a style={{ ...ui.btnGhost, marginLeft: 'auto' }} href="/api/admin/leads/export">Export CSV</a>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={ui.table}>
                <thead>
                  <tr>
                    <th style={ui.th}>Name</th>
                    <th style={ui.th}>Company</th>
                    <th style={ui.th}>Phone</th>
                    <th style={ui.th}>City</th>
                    <th style={ui.th}>Type</th>
                    <th style={ui.th}>Status</th>
                    <th style={ui.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} style={{ cursor: 'pointer' }} onClick={() => openLead(l)}>
                      <td style={ui.td}>{l.full_name}</td>
                      <td style={ui.td}>{l.company_name || '—'}</td>
                      <td style={ui.td}>{l.phone}</td>
                      <td style={ui.td}>{l.city || '—'}</td>
                      <td style={ui.td}>{l.inventory_type || '—'}</td>
                      <td style={ui.td}><span style={ui.statusPill(l.status)}>{l.status}</span></td>
                      <td style={ui.td}>{new Date(l.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {leads.length === 0 && (
                    <tr><td colSpan={7} style={{ ...ui.td, textAlign: 'center', color: '#94a3b8' }}>No leads found.</td></tr>
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
      </div>

      {selected && (
        <div style={ui.overlay} onClick={() => setSelected(null)}>
          <div style={ui.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Lead Details</h3>

            <label style={ui.label}>Full Name</label>
            <input style={ui.fieldInput} value={selected.full_name || ''}
              onChange={(e) => setSelected({ ...selected, full_name: e.target.value })} />

            <label style={ui.label}>Company / Project</label>
            <input style={ui.fieldInput} value={selected.company_name || ''}
              onChange={(e) => setSelected({ ...selected, company_name: e.target.value })} />

            <label style={ui.label}>Phone</label>
            <input style={ui.fieldInput} value={selected.phone || ''}
              onChange={(e) => setSelected({ ...selected, phone: e.target.value })} />

            <label style={ui.label}>City</label>
            <input style={ui.fieldInput} value={selected.city || ''}
              onChange={(e) => setSelected({ ...selected, city: e.target.value })} />

            <label style={ui.label}>Inventory Type</label>
            <select style={ui.fieldInput} value={selected.inventory_type || ''}
              onChange={(e) => setSelected({ ...selected, inventory_type: e.target.value })}>
              <option>Apartments</option>
              <option>Plots</option>
              <option>Commercial</option>
            </select>

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
