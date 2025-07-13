import { Router } from 'express';
import { createPart, deletePart, getAllParts, getSinglePart, partReport, updatePart } from '../controllers/partController';

const router = Router();

router.get('/', getAllParts);
router.get('/:id', getSinglePart);
router.post('/', createPart);
router.put('/:id', updatePart);
router.delete('/:id',deletePart);
router.post('/report', partReport);

export default router;