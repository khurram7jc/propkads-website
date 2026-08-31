'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid email or password.');
      }
    } catch {
      setError('Could not connect. Please try again.');
    }
    setLoading(false);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F8F9',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: '#fff',
          padding: '44px',
          width: '360px',
          border: '1px solid #E7E8EA',
        }}
      >
        <img src="/logo.png" alt="Propkads" style={{ height: 26, marginBottom: 28 }} />
        <h2 style={{ margin: '0 0 6px', fontSize: 19, color: '#1A1B1B' }}>Admin Sign In</h2>
        <p style={{ margin: '0 0 24px', fontSize: 13.5, color: '#70757D' }}>Team access to leads &amp; content.</p>

        <label style={{ fontSize: 12, fontWeight: 600, color: '#3F434A', display: 'block', marginBottom: 6 }}>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '11px 12px', marginBottom: 16, border: '1px solid #E7E8EA',
            fontSize: 14, boxSizing: 'border-box',
          }}
        />

        <label style={{ fontSize: 12, fontWeight: 600, color: '#3F434A', display: 'block', marginBottom: 6 }}>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%', padding: '11px 12px', marginBottom: 18, border: '1px solid #E7E8EA',
            fontSize: 14, boxSizing: 'border-box',
          }}
        />

        {error && <p style={{ color: '#B3261E', fontSize: 13, marginBottom: 14 }}>{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '13px', background: '#14A750', color: '#fff', border: 'none',
            fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </main>
  );
}
