'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/admin/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLeads(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  const filteredLeads = leads.filter(lead => 
    lead.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone?.includes(searchTerm) ||
    lead.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '30px 5%' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#ffffff', padding: '20px 30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '1.8rem' }}>Leads Dashboard</h1>
          <p style={{ margin: '5px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Total Enquiries Received: <strong>{leads.length}</strong></p>
        </div>
        <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by name, phone, city, or company..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff' }}
        />
      </div>

      {/* Leads Table */}
      <div style={{ background: '#ffffff', borderRadius: '10px', overflowX: 'auto', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
        {loading ? (
          <p style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Loading enquiries...</p>
        ) : filteredLeads.length === 0 ? (
          <p style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>No enquiries found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#ffffff' }}>
                <th style={{ padding: '14px 20px' }}>Date</th>
                <th style={{ padding: '14px 20px' }}>Full Name</th>
                <th style={{ padding: '14px 20px' }}>Company / Project</th>
                <th style={{ padding: '14px 20px' }}>Phone / WhatsApp</th>
                <th style={{ padding: '14px 20px' }}>City</th>
                <th style={{ padding: '14px 20px' }}>Inventory Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, idx) => (
                <tr key={lead.id || idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.85rem' }}>
                    {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={{ padding: '14px 20px', fontWeight: '600', color: '#0f172a' }}>{lead.full_name}</td>
                  <td style={{ padding: '14px 20px', color: '#475569' }}>{lead.company_name || '-'}</td>
                  <td style={{ padding: '14px 20px', color: '#10b981', fontWeight: 'bold' }}>
                    <a href={`https://wa.me/${lead.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: '#10b981', textDecoration: 'none' }}>
                      {lead.phone}
                    </a>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#475569' }}>{lead.city || '-'}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ background: '#dcfce7', color: '#047857', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {lead.inventory_type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
