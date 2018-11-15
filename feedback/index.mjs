import mongoose from 'mongoose';
import app from './src/app/';
import dbConfig from './src/configs/index.mjs';

function ConnectDatabase(url, config, reconInterval) {
    const createdConnection = mongoose.createConnection(url, config);

    createdConnection.on('error', (error) => {
        if(error.message) {
            console.log('Failed to connect to database, will attempt again');
            setTimeout(() => {
                console.log('Attempting reconnection for database.')
                createdConnection.openUri(url, config)
            }, reconInterval)
        }
    });

    createdConnection.once('open', () => {
        console.log('Successfully connected to database'); 
    });
}

const connectionConfig = { 
    reconnectTries: 30, 
    reconnectInterval: 500 
};

const db = ConnectDatabase(dbConfig.url, connectionConfig, 1000);

app.listen(3000, () => { console.log('App is listening on port 3000'); })
