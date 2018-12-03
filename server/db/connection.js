import { Pool } from 'pg';
import 'dotenv/config';

// include an OR statement if you switch between a local dev db and 
// a remote heroku environment
//'postgresql://postgres:password@localhost:localpostgresport/yourlocaldbname'

let connect;

if (process.env.NODE_ENV === 'test:dev') {
  connect = {
    connectionString: process.env.TESTDB_URL
  };
} else {
  connect = {
    connectionString: process.env.DATABASE_URL || process.env.LOCALDB_URL,
    // SSL connections are required to connect Heroku Postgres
    ssl: true,
  };
}

const pool = new Pool(connect);

export default pool;