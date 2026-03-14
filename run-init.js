import fs from 'fs';
import mysql from 'mysql2/promise';

async function executeSql() {
  try {
    const rawSql = fs.readFileSync('init.sql', 'ucs2'); // utf16le / ucs2
    // If the SQL string contains the update message, replace it
    const sql = rawSql.replace(/┌[\s\S]*?└[^\n]*\n/g, '').trim();

    const connection = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: 'HfY4SVUk29AoDhs.root',
      password: 'pvn5zeWiR84e0hGY',
      database: 'test',
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      },
      multipleStatements: true
    });

    console.log('Executing generated SQL...');
    await connection.query(sql);
    
    console.log('Database initialized successfully!');
    await connection.end();
  } catch (error) {
    console.error('Failed to execute SQL:', error);
  }
}

executeSql();
