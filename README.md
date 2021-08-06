###LINK HEROKU

https://murmuring-woodland-64875.herokuapp.com/

###API endpoints

`GET /`

Retorna todos los eventos.

---

`GET /featured`

Retorna todos los eventos destacados

---

`GET /event/:id`

Devuelve el detalles del evento con la id correspondiente.

---

`GET /shared/:id`

Devuelve el estado para compartir en una red social con su correspondiente id

---

`POST /events/`

Agrega un evento

---

`POST /login`

Inicia sesion

---

`GET /events`

Muestra una lista de eventos, pero solo son accedidos mediante token generado por el login
