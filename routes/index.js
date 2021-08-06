const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events/index');
const usersController = require('../controllers/users/index');
const authController = require('../controllers/auth/index');

module.exports = () => {
    router.get('/', eventsController.showEvents);
    router.get('/featured', eventsController.showEventsFeatured);
    router.get('/event/:id', eventsController.showEventDetailbyId);
    router.get('/shared/:id', eventsController.sharedEvents)
    router.post('/events', eventsController.addEvents);

    router.post('/login', usersController.userLogin);
    router.post('/register', usersController.userRegister);

    router.get('/events', authController.userVerification, authController.showAuthEvents)
    return router;
}

