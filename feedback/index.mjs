import mongoose from 'mongoose';
import app from './src/app/';
import dbConfig from './src/configs/index.mjs';

function ConnectDatabase(url, config, reconInterval) {
    return mongoose.connect(url, config)
    .then(() => {
        console.log('Successfully connected to database');
    })
    .catch((error) => {
        console.log('Failed to connect to database, will attempt again');
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Attempting reconnection for database.');
                return resolve(ConnectDatabase(url, config, reconInterval));
            }, reconInterval);
        });
    })
}

const connectionConfig = {};

const db = ConnectDatabase(dbConfig.url, connectionConfig, 1000);

app.listen(3000, () => { console.log('App is listening on port 3000'); });
