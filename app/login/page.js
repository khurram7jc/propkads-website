'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aap apna secret password yahan change kar sakte hain (e.g. PropkadsAdmin@2026)
    if (password === 'Propkads2026') {
      localStorage.setItem('adminToken', 'authenticated');
      router.push('/admin');
    } else {
      setError('Invalid Admin Password');
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
      <form onSubmit={handleLogin} style={{ background: '#ffffff', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#0f172a', marginTop: 0, textAlign: 'center' }}>Propkads Admin</h2>
        <p style={{ color: '#64748b', fontSize: '0.9rem', textAlign: 'center', marginBottom: '20px' }}>Enter password to access leads</p>
        
        <input 
          type="password" 
          placeholder="Admin Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '15px', boxSizing: 'border-box' }}
          required
        />
        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: '0 0 15px' }}>{error}</p>}
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </main>
  );
}
