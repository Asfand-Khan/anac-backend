import { Router } from 'express';
import carRoutes from './carRoutes';
import afterMarketAccessoriesRoutes from './afterMarketAccessoriesRoutes';
import companyRoutes from './companyRoutes';
import modelRoutes from './modelRoutes';
import standardFeatureRoutes from './standardFeaturesRoutes';
import installedOptionsRoutes from './installedOptionsRoutes';
import popularFeatureRoutes from './popularFeaturesRoutes';
import userRoutes from './userRoutes';
import menuRoutes from './menuRoutes';
import customerRoutes from './customerRoutes';
import machineRoutes from './machineRoutes';
import partRoutes from './partRoutes';
import unitRoutes from './unitRoutes';

const router = Router();

// Mount specific resource routes
// router.use('/users', userRoutes);
// router.use('/menus', menuRoutes);
// router.use('/cars', carRoutes);
// router.use('/aftermarket-accessories', afterMarketAccessoriesRoutes);
// router.use('/companies', companyRoutes);
// router.use('/models', modelRoutes);
// router.use('/standard-features', standardFeatureRoutes);
// router.use('/installed-options', installedOptionsRoutes);
// router.use('/popular-features', popularFeatureRoutes);

router.use('/customers', customerRoutes);
router.use('/machines', machineRoutes);
router.use('/units', unitRoutes);
router.use('/parts', partRoutes);

export default router;
