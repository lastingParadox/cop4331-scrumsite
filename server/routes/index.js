import { Router } from 'express';
import authentication from './authentication.js';
const router = Router();

/* GET home page. */
router.get('/', (req, res) => { //Line 9
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
});

router.use('/authentication', authentication)

export default router;
