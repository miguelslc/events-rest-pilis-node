const validateLoginInput = require('../../middleware/validations/login');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('Users')

exports.userLogin = async (req, res, next) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'Usuario no encontrado';
                return res.status(400).json(errors);
            }
            //El usuario existe, verificamos credenciales
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const payload = {
                        id: user.id,
                        email: user.email,
                    }
                    jwt.sign(payload, process.env.SECRET, {
                        expiresIn: 3600
                    }, (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`,
                            user: {
                                id: user._id,
                                email: user.email,
                                token
                            },
                        });
                    });
                } else {
                    errors.password = 'Email / Password Incorrecto';
                    return res.status(400).json(errors);
                }
            });
        });
};

exports.userRegister = async (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({
                    email: 'Email Already Exists'
                });
            } else {
                const newUser = new User({
                    email,
                    password,
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // Store hash in your password DB.
                        newUser.save()
                            .then(
                                user => {
                                    res.json(user)
                                });
                    });
                });
            }
        })
}

