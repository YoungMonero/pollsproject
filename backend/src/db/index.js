import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;


// import dotenv from "dotenv";
// import { Pool } from "pg";



// dotenv.config();


// export const pool = new Pool({
//   user: process.env.DB_USER ,
//   host: process.env.DB_HOST ,
//   database: process.env.DB_NAME ,
//   password: process.env.DB_PASSWORD ,
//   port: parseInt(process.env.DB_PORT)



export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}


