import { Router } from 'express';
import { createPart, deletePart, getAllParts, getSinglePart, updatePart } from '../controllers/partController';

const router = Router();

router.get('/', getAllParts);
router.get('/:id', getSinglePart);
router.post('/', createPart);
router.put('/:id', updatePart);
router.delete('/:id', deletePart);

export default router;