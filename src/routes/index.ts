import { Router } from 'express';
import customerRoutes from './customerRoutes';
import machineRoutes from './machineRoutes';
import partRoutes from './partRoutes';
import unitRoutes from './unitRoutes';
import sampleRoutes from './sampleRoutes';

const router = Router();

router.use('/customers', customerRoutes);
router.use('/machines', machineRoutes);
router.use('/units', unitRoutes);
router.use('/parts', partRoutes);
router.use('/samples', sampleRoutes);

export default router;
