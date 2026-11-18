// Mock Team Members for Propkads local development & testing

export const INITIAL_MOCK_USERS = [
  {
    id: 1,
    name: 'Khurram Mushtaq',
    email: 'khurram@propkads.com',
    role: 'admin',
    designation: 'Primary Admin',
    permissions: ['all'],
    status: 'active',
    initial_password: 'Admin@Propkads2026',
    created_at: '2026-01-10T10:00:00.000Z',
    verifyLink: null,
  },
  {
    id: 2,
    name: 'Bilal Ahmed',
    email: 'bilal@propkads.com',
    role: 'team',
    designation: 'Operations Director',
    permissions: ['all'],
    status: 'active',
    initial_password: 'Bilal@Propkads2026',
    created_at: '2026-02-15T11:30:00.000Z',
    verifyLink: null,
  },
  {
    id: 3,
    name: 'Tariq Mehmood',
    email: 'tariq.sales@propkads.com',
    role: 'team',
    designation: 'Sales Executive',
    permissions: ['leads', 'project_leads'],
    status: 'active',
    initial_password: 'Tariq@Sales2026',
    created_at: '2026-03-20T14:15:00.000Z',
    verifyLink: null,
  },
  {
    id: 4,
    name: 'Ayesha Siddiqui',
    email: 'ayesha.marketing@propkads.com',
    role: 'team',
    designation: 'Email Marketer',
    permissions: ['blogs', 'newsletter'],
    status: 'active',
    initial_password: 'Ayesha@Marketing2026',
    created_at: '2026-05-12T09:45:00.000Z',
    verifyLink: null,
  },
  {
    id: 5,
    name: 'Hamza Farooq',
    email: 'hamza.hr@propkads.com',
    role: 'team',
    designation: 'HR Specialist',
    permissions: ['applications'],
    status: 'active',
    initial_password: 'Hamza@Hr2026',
    created_at: '2026-11-10T16:20:00.000Z',
    verifyLink: null,
  },
];

export let liveLocalDevUsers = [...INITIAL_MOCK_USERS];

export function resetLocalDevUsers() {
  liveLocalDevUsers = [...INITIAL_MOCK_USERS];
}

export function addLocalDevUser(user) {
  const newId = liveLocalDevUsers.length > 0 ? Math.max(...liveLocalDevUsers.map((u) => u.id)) + 1 : 1;
  const created = {
    id: newId,
    name: user.name,
    email: user.email.toLowerCase().trim(),
    role: user.role || 'team',
    designation: user.designation?.trim() || 'Team Member',
    permissions: Array.isArray(user.permissions) ? user.permissions : ['all'],
    status: 'active',
    initial_password: user.password || user.initial_password || 'Propkads@2026',
    created_at: new Date().toISOString(),
    verifyLink: null,
  };
  liveLocalDevUsers.push(created);
  return created;
}

export function updateLocalDevUser(id, updates) {
  const numericId = Number(id);
  const idx = liveLocalDevUsers.findIndex((u) => u.id === numericId);
  if (idx !== -1) {
    liveLocalDevUsers[idx] = {
      ...liveLocalDevUsers[idx],
      ...updates,
      ...(updates.password ? { initial_password: updates.password } : {}),
    };
    return liveLocalDevUsers[idx];
  }
  return null;
}

export function deleteLocalDevUser(id) {
  const numericId = Number(id);
  const beforeLen = liveLocalDevUsers.length;
  liveLocalDevUsers = liveLocalDevUsers.filter((u) => u.id !== numericId);
  return liveLocalDevUsers.length < beforeLen;
}
