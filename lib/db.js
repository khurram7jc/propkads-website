import mysql from 'mysql2/promise';

let pool = null;
let schemaInitialized = false;
export let lastDbError = null;

function getPool() {
  if (pool) return pool;

  const dbHost = process.env.DB_HOST || '127.0.0.1';
  const dbPort = Number(process.env.DB_PORT || 3306);
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;

  if (!dbUser || !dbName) {
    lastDbError = 'Missing DB_USER or DB_NAME at runtime';
    console.error('MySQL configuration missing DB_USER or DB_NAME at runtime');
    return null;
  }

  pool = mysql.createPool({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  return pool;
}

async function ensureMySqlSchema(activePool) {
  if (schemaInitialized || !activePool) return;
  try {
    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'team',
        permissions TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    try {
      await activePool.execute(`ALTER TABLE users ADD COLUMN permissions TEXT`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE users ADD COLUMN status VARCHAR(50) NOT NULL DEFAULT 'active'`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE users ADD COLUMN verification_token VARCHAR(255)`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE users ADD COLUMN verification_expires DATETIME`);
    } catch {}

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        company_name VARCHAR(255),
        phone VARCHAR(100) NOT NULL,
        city VARCHAR(150),
        inventory_type VARCHAR(150),
        lead_category VARCHAR(50) NOT NULL DEFAULT 'client',
        project_name VARCHAR(255),
        unit_interest VARCHAR(255),
        status VARCHAR(80) NOT NULL DEFAULT 'New',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    try {
      await activePool.execute(`ALTER TABLE leads ADD COLUMN lead_category VARCHAR(50) NOT NULL DEFAULT 'client'`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE leads ADD COLUMN project_name VARCHAR(255)`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE leads ADD COLUMN unit_interest VARCHAR(255)`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE leads ADD COLUMN next_followup_date TEXT`);
    } catch {}
    try {
      await activePool.execute(`ALTER TABLE leads ADD COLUMN next_action_type VARCHAR(50) DEFAULT 'Call'`);
    } catch {}

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS lead_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lead_id INT NOT NULL,
        author_name VARCHAR(255),
        note TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS site_content (
        \`key\` VARCHAR(191) PRIMARY KEY,
        \`value\` TEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS job_applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        position VARCHAR(255),
        portfolio_link TEXT,
        message TEXT,
        resume_name VARCHAR(255),
        resume_size INT,
        resume_type VARCHAR(150),
        resume_data LONGTEXT,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    await activePool.execute(`
      CREATE TABLE IF NOT EXISTS blogs (
        id VARCHAR(191) PRIMARY KEY,
        title TEXT NOT NULL,
        \`date\` VARCHAR(100),
        read_time VARCHAR(100),
        image LONGTEXT,
        excerpt TEXT,
        full_content LONGTEXT,
        takeaways JSON,
        is_featured TINYINT(1) DEFAULT 0,
        is_trending TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    schemaInitialized = true;
  } catch (err) {
    console.warn('MySQL schema init warning:', err.message);
  }
}

function normalizeSqlForMySql(rawQuery) {
  let q = rawQuery.trim();

  // Skip DDL statements already handled by ensureMySqlSchema
  if (/^alter\s+table\s+leads\s+add\s+column/i.test(q)) {
    return null;
  }
  if (/^create\s+table\s+if\s+not\s+exists\s+(job_applications|blogs)/i.test(q)) {
    return null;
  }

  // Postgres ILIKE -> MySQL LIKE (utf8mb4 is case-insensitive by default)
  q = q.replace(/\bilike\b/gi, 'LIKE');

  // Postgres ::int cast -> remove
  q = q.replace(/::int\b/gi, '');

  // Escape reserved word `key` in site_content queries
  if (/\bsite_content\b/i.test(q)) {
    q = q.replace(/\bselect\s+key\s*,\s*value\b/gi, 'SELECT `key`, `value`');
    q = q.replace(/\bwhere\s+key\s*=/gi, 'WHERE `key` =');
    q = q.replace(/\border\s+by\s+key\b/gi, 'ORDER BY `key`');
    q = q.replace(
      /insert\s+into\s+site_content\s*\(\s*key\s*,\s*value\s*,\s*updated_at\s*\)\s*values\s*\(\s*\?\s*,\s*\?\s*,\s*now\(\)\s*\)\s*on\s+conflict\s*\(\s*key\s*\)\s*do\s+update\s+set\s+value\s*=\s*excluded\.value\s*,\s*updated_at\s*=\s*now\(\)/gi,
      'INSERT INTO site_content (`key`, `value`, updated_at) VALUES (?, ?, NOW()) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`), updated_at = NOW()'
    );
  }

  // Newsletter ON CONFLICT DO NOTHING -> INSERT IGNORE
  if (/\bnewsletter_subscribers\b/i.test(q) && /on\s+conflict/i.test(q)) {
    q = q
      .replace(/insert\s+into/i, 'INSERT IGNORE INTO')
      .replace(/on\s+conflict\s*\([^)]+\)\s*do\s+nothing/gi, '');
  }

  // Blogs ON CONFLICT (id) DO NOTHING -> INSERT IGNORE
  if (/\bblogs\b/i.test(q) && /on\s+conflict\s*\(\s*id\s*\)\s*do\s+nothing/i.test(q)) {
    q = q
      .replace(/insert\s+into/i, 'INSERT IGNORE INTO')
      .replace(/on\s+conflict\s*\(\s*id\s*\)\s*do\s+nothing/gi, '');
  }

  // Blogs ON CONFLICT (id) DO UPDATE -> ON DUPLICATE KEY UPDATE
  if (/\bblogs\b/i.test(q) && /on\s+conflict\s*\(\s*id\s*\)\s*do\s+update/i.test(q)) {
    q = q.replace(
      /on\s+conflict\s*\(\s*id\s*\)\s*do\s+update\s+set[\s\S]*$/i,
      `ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        date = VALUES(date),
        read_time = VALUES(read_time),
        image = VALUES(image),
        excerpt = VALUES(excerpt),
        full_content = VALUES(full_content),
        takeaways = VALUES(takeaways),
        is_featured = VALUES(is_featured),
        is_trending = VALUES(is_trending),
        updated_at = NOW()`
    );
  }

  return q;
}

export async function sql(strings, ...values) {
  const activePool = getPool();
  if (!activePool) return [];

  await ensureMySqlSchema(activePool);

  let rawQuery = '';
  for (let i = 0; i < strings.length; i++) {
    rawQuery += strings[i];
    if (i < values.length) {
      rawQuery += '?';
    }
  }

  const finalQuery = normalizeSqlForMySql(rawQuery);
  if (!finalQuery) return [];

  try {
    const [rows] = await activePool.execute(finalQuery, values);
    lastDbError = null;
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    lastDbError = err.message;
    console.error('MySQL query error:', err.message);
    return [];
  }
}
