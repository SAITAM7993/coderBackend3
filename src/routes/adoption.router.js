import { Router } from 'express';
import { AdoptionsController } from '../controllers/adoptions.controller.js';

const adoptionsController = new AdoptionsController();
const router = Router();

router.get('/', adoptionsController.getAllAdoptions);
router.post('/:uid/:pid', adoptionsController.createAdoption);
router.get('/:aid', adoptionsController.getAdoption);
router.delete('/:aid', adoptionsController.deleteAdoption);

export default router;
