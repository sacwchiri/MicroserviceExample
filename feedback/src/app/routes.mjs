import express from 'express';
import FeedbackModel from '../models/dataModels.mjs';

const router = express.Router();

router.route('/v1/feedback')
   /* .all((req, res, next) => {
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
    })*/
    .get(async (req, res, next) => {
        // determine the structure of the fetch
        const { count, sortby, minStar, maxStar } = req.query;
        const userId = req.get('Ubi-UserId');
        
        const query = {};
        if(userId) {
            query['userId'] = userId;
        }

        if(minStar && maxStar && minStar > maxStar) {
            const err = new Error();
            err.message = "Wrong format";
            err.status = 400;
            next(err);
        }

        if(minStar) {
            if(minStar < 1 || minStar > 4) {
                const err = new Error();
                err.message = "Wrong format";
                err.status = 400;
                next(err);
            }

            query['feedback'] = { $gte: minStar };
        }

        if(maxStar) {
            if(maxStar < 1 || maxStar > 5) {
                const err = new Error();
                err.message = "Wrong format";
                err.status = 400;
                next(err);
            }

            query['feedback'] = Object.assign({}, query['feedback'], { $lte: maxStar });
        }

        try {
            const results = await FeedbackModel
                .find(query)
                .sort(sortby)
                .limit(Number.parseInt(count));

            res.json(results);
        } catch (error) {
            next(error);
        }
    })
    .post(async (req, res, next) => {
        const { sessionId } = req.query;
        const userId = req.get('Ubi-UserId');
        const feedback = req.body;

        // TODO: first make sure the user exists
        // TODO: validate session is active
        if(!userId || !sessionId) {
            const err = new Error();
            err.message = "Wrong format";
            err.status = 400;
            next(err);
        }

        const feedbackSchema = new FeedbackModel({
            sessionId,
            userId,
            feedback: feedback.value,
        })
        
        // post to database collection
        console.log('+ Attempting to store schema feedback');
        try {
            const result = await feedbackSchema.save();
            console.log('+ Feedback stored on database');
            res.json(result);
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    });

export default router;
