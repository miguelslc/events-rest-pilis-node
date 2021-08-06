LINK HEROKU

https://murmuring-woodland-64875.herokuapp.com/

router.get('/', eventsController.showEvents);
router.get('/featured', eventsController.showEventsFeatured);
router.get('/event/:id', eventsController.showEventDetailbyId);
router.get('/shared/:id', eventsController.sharedEvents)
router.post('/events', eventsController.addEvents);

    router.post('/login', usersController.userLogin);
    router.post('/register', usersController.userRegister);

    router.get('/events', authController.userVerification, authController.showAuthEvents)

API endpoints

GET /

Retorna todos los eventos.

GET /featured

Retorna todos los eventos destacados

GET /event/:id

Devuelve el detalles del evento con la id correspondiente.

GET /shared/:id

Devuelve el estado para compartir en una red social con su correspondiente id

POST /events/

Agrega un evento

POST /login

Inicia sesion

GET /events

Muestra una lista de eventos, pero solo son accedidos mediante token generado por el login
