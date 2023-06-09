import * as pg from 'pg';
const Pool = pg.Pool;

export default new Pool (    {
    max: 20,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:5432,
    database:process.env.DB_PATH,
    idleTimeoutMillis: 30000
});