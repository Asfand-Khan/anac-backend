import { Router } from 'express';
import carRoutes from './carRoutes';
import afterMarketAccessoriesRoutes from './afterMarketAccessoriesRoutes';
import companyRoutes from './companyRoutes';
import modelRoutes from './modelRoutes';
import standardFeatureRoutes from './standardFeaturesRoutes';
import installedOptionsRoutes from './installedOptionsRoutes';
import popularFeatureRoutes from './popularFeaturesRoutes';
import userRoutes from './userRoutes';

const router = Router();

// Mount specific resource routes
router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/aftermarket-accessories', afterMarketAccessoriesRoutes);
router.use('/companies', companyRoutes);
router.use('/models', modelRoutes);
router.use('/standard-features', standardFeatureRoutes);
router.use('/installed-options', installedOptionsRoutes);
router.use('/popular-features', popularFeatureRoutes);

export default router;
