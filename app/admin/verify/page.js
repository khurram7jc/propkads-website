'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('No verification token provided in link.');
      setLoading(false);
      return;
    }

    fetch(`/api/auth/verify?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setError(data.error || 'Invalid or expired verification link.');
        }
      })
      .catch((err) => setError('Network error checking verification link.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleActivate = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to activate account.');
        setSubmitting(false);
        return;
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);
    } catch (err) {
      setError('Network error during activation: ' + err.message);
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '440px', padding: '32px 28px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src="/logo-black.png" alt="Propkads" style={{ height: '36px', width: 'auto', display: 'inline-block', marginBottom: '10px' }} />
          <h2 style={{ margin: '0 0 6px', fontSize: '20px', fontWeight: '700', color: '#0F172A' }}>Team Portal Activation</h2>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#64748B' }}>Verify your email & set your password</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748B', fontSize: '14px' }}>
            Verifying invitation link...
          </div>
        ) : error && !user ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ padding: '14px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '8px', color: '#991B1B', fontSize: '13.5px', marginBottom: '20px' }}>
              {error}
            </div>
            <a href="/admin" style={{ display: 'inline-block', padding: '10px 20px', background: '#0F172A', color: '#FFFFFF', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              Go to Login
            </a>
          </div>
        ) : success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', margin: '0 auto 16px' }}>
              ✓
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0F172A' }}>Account Activated!</h3>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748B' }}>Redirecting to your dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleActivate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '13px' }}>
              <div style={{ color: '#64748B', marginBottom: '2px' }}>Invited Member:</div>
              <div style={{ fontWeight: '600', color: '#0F172A' }}>{user?.name}</div>
              <div style={{ color: '#0284C7', fontSize: '12.5px' }}>{user?.email}</div>
            </div>

            {error && (
              <div style={{ padding: '10px 12px', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '6px', color: '#991B1B', fontSize: '12.5px' }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Create Password *
              </label>
              <input
                type="password"
                required
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>
                Confirm Password *
              </label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: '10px',
                padding: '12px',
                background: submitting ? '#86EFAC' : '#14A750',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: submitting ? 'not-allowed' : 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {submitting ? 'Activating Account...' : 'Activate & Enter Dashboard'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0F172A' }} />}>
      <VerifyContent />
    </Suspense>
  );
}
