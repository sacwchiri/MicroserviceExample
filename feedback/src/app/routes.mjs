import express from 'express';
import data from '../models/dataModels.mjs';

const router = express.Router();

router.route('/v1/feedback')
    .all((req, res, next) => {
        // by this point we should be able to tell if the account has the permissions required for operation
        // all users should be able to create a feedback but maybe not all read them
        // all calls should have a valid sessionId in the url path
        // the header has the Uni-userId
        // req.query
        // get -> fetch X amount of feedback from user or users
        // post -> create new one, fail if it exists
        // put -> update
        // delete -> remove
        next();
    })
    .get((req, res, next) => {
        // determine the structure of the fetch
        const { count, sortby, user } = req.query;
        res.status(200).json({message: 'success'})
    })
    .post((req, res, next) => {});


export default router;
