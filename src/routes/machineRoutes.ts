import { Router } from 'express';
import { createMachine, deleteMachine, getAllMachines, getSingleMachine, updateMachine } from '../controllers/machineController';

const router = Router();

router.get('/', getAllMachines);
router.get('/:id', getSingleMachine);
router.post('/', createMachine);
router.put('/:id', updateMachine);
router.delete('/:id', deleteMachine);

export default router;