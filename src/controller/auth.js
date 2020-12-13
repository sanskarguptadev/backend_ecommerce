const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    User.findOne({email: req.body.email})
    .exec((error, user) => {
        if(user) return res.status(400).json({
            message: 'User already registered'
        });

        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        const _user = new User({firstName, lastName, email, password, username: Math.random().toString()});
        _user.save((error, data) => {
            if(error){
                return res.status(400).json({
                    message: 'Something went wrong'
                });
            }

            if(data){
                return res.status(201).json({
                    user: 'User Created Successfully...!!'
                })
            }
        })
    })
}

exports.sigin = (req, res) => {
    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error });
        if(user){
            if(user.authenticate(req.body.password)){
                const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn: '56h'});
                const {firstName, lastName, email, role, fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        firstName, lastName, email, role, fullName
                    }
                })
            } else {
                return res.status(400).json({
                    message: 'Invalid Password'
                })
            }
        } else {
            return res.status(400).json({message: 'Something went wrong.'})
        }
    })
}