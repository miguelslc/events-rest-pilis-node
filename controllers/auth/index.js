const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Events = mongoose.model('Events');

//revisar si el usuario está autenticado
exports.userVerification = (req, res, next) => {
    const authorization = req.get('Authorization');

    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, process.env.SECRET);
    } catch (e) {
        console.log(e);
    }

    if (!token || !decodedToken.id) {
        return res.status(400).json({ error: 'missing or invalid token' })
    }
    const { id: userId } = decodedToken
    req.userId = userId;
    next();
}

exports.showAuthEvents = async (req, res, next) => {
    //consultar el usuario autenticado
    try {
        let perPage = 5;
        let page = req.params.page || 1;
        const { userId } = req
        const events = await Events.find({ author: userId })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .lean();
        if (!events) {
            return res.status(404).json('No Hay eventos Disponibles');
        }
        res.send(events)
    }
    catch (error) {
        res.status(404).json(error);
    }
}