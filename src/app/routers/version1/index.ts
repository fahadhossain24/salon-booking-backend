import express from 'express';
import userRouter from '../../modules/userModule/user.routes';
import adminRouter from '../../modules/adminModule/admin.routes';
import userAuthRouter from '../../modules/authModule/userAuthModule/auth.routes';
import outletRouter from '../../modules/outletModule/outlet.routes';
import adminAuthRouter from '../../modules/authModule/adminAuthModule/auth.routes';
import serviceCategoryRouter from '../../modules/serviceCategoryModule/serviceCategory.routes';
import serviceRouter from '../../modules/serviceModule/service.routes';
import sliderRouter from '../../modules/sliderModule/slider.routes';
import aboutUsRouter from '../../modules/aboutUsModule/abountUs.routes';
import privacyPolicyRouter from '../../modules/privacyPolicyModule/privacyPolicy.routes';
import termsConditionRouter from '../../modules/termsConditionModule/termsCondition.routes';

const routers = express.Router();

routers.use('/user', userRouter)
routers.use('/admin', adminRouter)
routers.use('/auth', userAuthRouter)
routers.use('/auth/admin', adminAuthRouter)
routers.use('/outlet', outletRouter)
routers.use('/service-category', serviceCategoryRouter)
routers.use('/service', serviceRouter)
routers.use('/slider', sliderRouter)
routers.use('/about-us', aboutUsRouter)
routers.use('/privacy-policy', privacyPolicyRouter)
routers.use('/terms-condition', termsConditionRouter)

export default routers;
