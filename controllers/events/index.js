const validateEventInputs = require('../../middleware/validations/events');

const mongoose = require('mongoose');
const Events = mongoose.model('Events')

exports.showEvents = async (req, res, next) => {
    try {
        const events = await Events.find().sort({ eventDate: -1 }).lean();
        if (!events) return next();
        //console.log('Ingresaste al Index')
        //Show all Events
        res.send(events);
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.showEventDetailbyId = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json('No ha seleccionado un evento');
        }
        //show event by id
        const event = await Events.findOne({ _id: id }).lean();
        //console.log(event)
        if (!event) {
            return res.status(404).json('No Hay eventos Disponibles');
        }
        res.send(event)
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.showEventsFeatured = async (req, res, next) => {
    //show a list of events featured sorted by date desc
    const eventsFeatured = await Events.find({ featured: 'SI' }).sort({ eventDate: -1 }).lean();
    if (!eventsFeatured) return res.status(404).json('No Hay eventos Disponibles');
    res.send(eventsFeatured);
}

exports.addEvents = async (req, res, next) => {
    //a method who can add an events into de DB
    const { errors, isValid } = validateEventInputs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    try {

        const event = new Events(req.body);
        //guardar en la DB
        const newEvent = await event.save();
        //redireccionar
        res.send(newEvent)
    } catch (error) {
        res.status(404).json(error)
    }
}

exports.sharedEvents = async (req, res, next) => {
    //Como un visitante del sitio haciendo click en el botón compartir de un evento debo poder compartir el mismo en twitter.
    //El mensaje de twitter deberá ser el siguiente: "Iré al NOMBRE DEL EVENTO @ FECHA DEL EVENTO LINK DEL EVENTO".
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json('No ha seleccionado un evento');
        }
        let { title, eventDate, url } = await Events.findOne({ _id: id }).lean();
        if (!title || !eventDate || !url) {
            return res.status(404).json('No Hay Evento Disponible');
        }
        let sharedEvent = { msg: `Iré al ${title} @ ${eventDate} ${url}` }
        res.send(sharedEvent)
    } catch (error) {
        res.status(404).json(error)
    }
}