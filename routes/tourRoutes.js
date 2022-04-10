const express=require('express');
const tourController=require("../controllers/tourController");
const tourRoutes=express.Router();

// authController.protect,
tourRoutes.route('/tours')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTours);
tourRoutes.route('/tour/:id')
    .get(tourController.getTour);
tourRoutes.route('/getTourstats').get(tourController.getToursStats);

module.exports=tourRoutes;