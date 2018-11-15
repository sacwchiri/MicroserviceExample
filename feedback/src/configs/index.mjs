const dbConnection = {
    connection: process.env.DB_CONN_TYPE || 'mongodb',
    url: process.env.DB_URL || 'mongodb', 
    port: process.env.DB_PROT || '27017', 
    db: process.env.DB_TABLE || 'technicalTest'
}

export default {
    dbConnection,
    url: `${dbConnection.connection}://${dbConnection.url}:${dbConnection.port}/${dbConnection.db}`,
}
