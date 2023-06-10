import * as express from 'express'
import TestController from './TestController';

const router = express.Router();
const controller = new TestController();

router.get('/', controller.get);
router.post('/',controller.post);
router.get("/id",controller.get_by_id)

export default router;