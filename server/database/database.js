import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createPool({
    connectionLimit:50,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})

async function connectToDatabase() {
    try {
        const connection = await db.getConnection();
        console.log('Connected to MySQL!');
        connection.release();
    } catch (err) {
        console.error('Error connecting to MySQL:', err);
    }
}
connectToDatabase();


db.on('error', (err) => {
    console.error('MySQL pool error:', err);
});

export default db;

