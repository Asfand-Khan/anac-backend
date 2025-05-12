import { Router } from 'express';
import { createUnit, deleteUnit, getAllUnits, getSingleUnit, updateUnit } from '../controllers/unitControllers';

const router = Router();

router.get('/', getAllUnits);
router.get('/:id', getSingleUnit);
router.post('/', createUnit);
router.put('/:id', updateUnit);
router.delete('/:id', deleteUnit);

export default router;