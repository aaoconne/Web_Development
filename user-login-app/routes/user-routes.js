/* create user routes that manages the apps endpoints (http methods) and attaches controllers (functions) */
var express = require('express');
var router = express.Router();
const controller = require('../controllers/user-controllers');
const {checkAuthenticated, checkNotAuthenticated} = require('../middlewares/auth');    // import checkAuthenticated middleware function into user-routes 


router.get('/', checkAuthenticated, controller.getIndex);
router.get('/login', checkNotAuthenticated, controller.getLogin); // get request for login path and assign controllers 
router.get('/register', checkNotAuthenticated, controller.getRegister); // get request for register path and assign controllers 
router.post('/login', checkNotAuthenticated, controller.postLogin); // route for login request & path; assign controllers
router.post('/register', checkNotAuthenticated, controller.postRegister); // route for register request & path; assign controllers 
router.post('/logout', checkAuthenticated, controller.postLogout);

module.exports = router;