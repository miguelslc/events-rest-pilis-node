const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    expiration: Date
})

//Metodo para hashing passworrd
userSchema.pre('save', async function (next) {
    //si el password está hash no hacemos nada
    if (!this.isModified('password')) return next();

    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

//Envia alerta cuando el email esta siendo registrado
userSchema.post('save', async function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next('Ese Correro Ya está registrado');
    } else {
        next(error);
    }
});

module.exports = mongoose.model('Users', userSchema);