import pool from "./index.js";

export const createTablesAndIndexes = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS sessions (
            id SERIAL PRIMARY KEY,
            host_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            code VARCHAR(12) NOT NULL UNIQUE,
            title VARCHAR(255),
            created_at TIMESTAMPTZ DEFAULT now()
        );
     `);

    await client.query(`
        CREATE TABLE IF NOT EXISTS polls (
            id SERIAL PRIMARY KEY,
            session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
            host_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            title TEXT NOT NULL,
            question TEXT NOT NULL,
            type VARCHAR(20) NOT NULL DEFAULT 'single', -- 'single' | 'multiple' | 'open'
            status VARCHAR(20) NOT NULL DEFAULT 'draft', -- 'draft' | 'published' | 'closed'
            created_at TIMESTAMPTZ DEFAULT now()
        );
     `); 
            
    await client.query(`
        CREATE TABLE IF NOT EXISTS poll_options (
            id SERIAL PRIMARY KEY,
            poll_id INTEGER NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
            label TEXT NOT NULL,
            position INTEGER NOT NULL DEFAULT 0
        );
     `);

         await client.query(`
                CREATE TABLE  IF NOT EXISTS votes (
                id SERIAL PRIMARY KEY,
                poll_id INTEGER NOT NULL,
                option_id INTEGER NOT NULL,
                participant_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
     `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_sessions_code ON sessions(code);
    `); 
            
    await client.query(`
        CREATE TABLE IF NOT EXISTS participants (
            id SERIAL PRIMARY KEY,
            session_id INT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150),
            phone VARCHAR(50),
            joined_at TIMESTAMPTZ DEFAULT now()
        );  
    `); 


    await client.query('COMMIT');
        console.log('Tables and indexes created successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating tables and indexes:', error.message);
    } finally {
        client.release();
    }
    };






    