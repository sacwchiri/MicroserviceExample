import express from 'express';
import routes from './routes.mjs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// ---------------------------------------------- EXPRESS CONFIGURATION ----------------------------------------------- //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// -------------------------------------------------------------------------------------------------------------------- //

// ----------------------------------------------------- ROUTING ------------------------------------------------------ //

app.use('/api/', routes);

// -------------------------------------------------------------------------------------------------------------------- //

// -------------------------------------------------- ERROR HANDLING -------------------------------------------------- //

app.use((req, res) => {
    res.status(404).json({ message: 'Error, path not found' });
});

app.use((err, req, res) => {
    res.status(err.status || 500)
        .json({ message:'error', detail: err.message });
});

// -------------------------------------------------------------------------------------------------------------------- //

export default app;
