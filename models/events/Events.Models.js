const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const slug = require('slug');
const shortId = require('shortid');

const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'El nombre del Evento es Obligatorio',
        trim: true,
    },
    description: {
        type: String,
        required: 'Una descripcion del Evento es Obligatoria',
        trim: true,
    },
    eventDate: {
        type: Date,
        trim: true,
        required: 'La fecha del evento es obligatoria',
        default: Date.now,
        min: '1900-01-01',
        max: '2099-12-31'
    },
    place: {
        type: String,
        required: 'Un localidad del evento es necesaria',
        trim: true
    },
    featured: {
        type: String,
        required: 'Es necesario aclarar si el evento es destacado',
        trim: true
    },
    imageEvent: {
        type: String,
        required: 'Una imagen es requerida',
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: 'El usuario es Obligatorio'
    },
    url: {
        type: String,
        lowercase: true,
    },
});

eventsSchema.pre('save', function (next) {
    const url = slug(this.title);
    this.url = `${url}-${shortId.generate()}`;
    next();
});

//Creamos Indice
eventsSchema.index({ title: 'text' });

module.exports = mongoose.model('Events', eventsSchema);