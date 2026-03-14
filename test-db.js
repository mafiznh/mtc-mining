import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
      port: 4000,
      user: 'HfY4SVUk29AoDhs.root',
      password: 'pvn5zeWiR84e0hGY',
      database: 'test',
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
      }
    });

    console.log('Successfully connected to TiDB using mysql2!');
    await connection.end();
  } catch (error) {
    console.error('Failed to connect with mysql2:', error.message);
  }
}

testConnection();
